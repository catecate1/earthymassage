import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Chat = { id: string; created_at: string; visitor_token: string | null; ip_address: string | null; user_message: string; owner_reply: string | null };
type Visit = { id: string; visitor_token: string; ip_address: string | null; user_agent: string | null; current_page: string | null; pages: unknown; first_seen: string; last_seen: string };
type Tag = { visitor_token: string; name: string | null; notes: string | null };

const fmt = (d: string) => new Date(d).toLocaleString();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [msg, setMsg] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
      setMsg(error ? error.message : "Check your email to confirm, then sign in.");
    }
  };
  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-24 space-y-3 bg-card p-6 rounded-lg border border-border">
      <h1 className="font-display text-2xl text-foreground">{mode === "in" ? "Owner sign in" : "Create owner account"}</h1>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
      <Button type="submit" className="w-full">{mode === "in" ? "Sign in" : "Create account"}</Button>
      {msg && <p className="font-body text-sm text-muted-foreground">{msg}</p>}
      <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="font-body text-xs text-primary">
        {mode === "in" ? "First time? Create the owner account" : "Back to sign in"}
      </button>
    </form>
  );
};

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [tab, setTab] = useState<"chats" | "visitors">("chats");
  const [chats, setChats] = useState<Chat[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [tags, setTags] = useState<Record<string, Tag>>({});
  const [online, setOnline] = useState(false);
  const [replies, setReplies] = useState<Record<string, string>>({});

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    return () => data.subscription.unsubscribe();
  }, []);

  const load = async () => {
    const [c, v, t, s] = await Promise.all([
      supabase.from("chat_logs").select("*").order("created_at", { ascending: false }).limit(200),
      supabase.from("visitor_sessions").select("*").order("last_seen", { ascending: false }).limit(200),
      supabase.from("visitor_tags").select("visitor_token,name,notes"),
      supabase.from("owner_status").select("is_online").eq("id", true).maybeSingle(),
    ]);
    setChats((c.data as Chat[]) ?? []);
    setVisits((v.data as Visit[]) ?? []);
    setTags(Object.fromEntries(((t.data as Tag[]) ?? []).map((x) => [x.visitor_token, x])));
    setOnline(!!s.data?.is_online);
  };

  useEffect(() => {
    if (!session) return;
    supabase.rpc("has_role", { _user_id: session.user.id, _role: "owner" }).then(({ data }) => {
      setIsOwner(!!data);
      if (data) load();
    });
  }, [session]);

  useEffect(() => {
    if (!isOwner) return;
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, [isOwner]);

  const setStatus = async (v: boolean) => {
    await supabase.from("owner_status").update({ is_online: v, last_seen: new Date().toISOString() }).eq("id", true);
    setOnline(v);
  };

  const signOut = async () => {
    await setStatus(false);
    await supabase.auth.signOut();
  };

  const reply = async (id: string) => {
    const text = replies[id]?.trim();
    if (!text) return;
    await supabase.from("chat_logs").update({ owner_reply: text, owner_replied_at: new Date().toISOString() }).eq("id", id);
    setReplies({ ...replies, [id]: "" });
    load();
  };

  const saveTag = async (token: string, name: string, notes: string) => {
    await supabase.from("visitor_tags").upsert({ visitor_token: token, name, notes }, { onConflict: "visitor_token" });
    load();
  };

  if (!ready) return null;
  if (!session) return <div className="min-h-screen bg-background p-4"><Login /></div>;
  if (!isOwner)
    return (
      <div className="min-h-screen bg-background p-8 text-center font-body text-muted-foreground">
        This account doesn't have owner access. <Button variant="link" onClick={signOut}>Sign out</Button>
      </div>
    );

  const tagFor = (t: string | null) => (t ? tags[t]?.name : null);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <h1 className="font-display text-3xl text-foreground mr-auto">Owner Desk</h1>
          <Button variant={online ? "default" : "outline"} onClick={() => setStatus(!online)}>
            {online ? "I'm online" : "I'm offline"}
          </Button>
          <Button variant="outline" onClick={load}>Refresh</Button>
          <Button variant="outline" onClick={signOut}>Log out</Button>
        </div>
        <div className="flex gap-2 mb-4">
          <Button variant={tab === "chats" ? "default" : "outline"} onClick={() => setTab("chats")}>Chats ({chats.length})</Button>
          <Button variant={tab === "visitors" ? "default" : "outline"} onClick={() => setTab("visitors")}>Visitors ({visits.length})</Button>
        </div>

        {tab === "chats" && (
          <div className="space-y-3">
            {chats.length === 0 && <p className="font-body text-muted-foreground">No chats yet.</p>}
            {chats.map((c) => (
              <div key={c.id} className="bg-card border border-border rounded-lg p-4">
                <p className="font-body text-xs text-muted-foreground mb-1">
                  {fmt(c.created_at)} · IP {c.ip_address ?? "unknown"}{tagFor(c.visitor_token) && <> · <strong>{tagFor(c.visitor_token)}</strong></>}
                </p>
                <p className="font-body text-foreground mb-2">{c.user_message}</p>
                {c.owner_reply ? (
                  <p className="font-body text-sm text-primary">You: {c.owner_reply}</p>
                ) : (
                  <div className="flex gap-2">
                    <Input value={replies[c.id] ?? ""} onChange={(e) => setReplies({ ...replies, [c.id]: e.target.value })} placeholder="Reply…" />
                    <Button onClick={() => reply(c.id)}>Send</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "visitors" && (
          <div className="space-y-3">
            {visits.length === 0 && <p className="font-body text-muted-foreground">No visitors recorded yet.</p>}
            {visits.map((v) => <VisitorRow key={v.id} v={v} tag={tags[v.visitor_token]} onSave={saveTag} />)}
          </div>
        )}
      </div>
    </div>
  );
};

const VisitorRow = ({ v, tag, onSave }: { v: Visit; tag?: Tag; onSave: (t: string, n: string, notes: string) => void }) => {
  const [name, setName] = useState(tag?.name ?? "");
  const [notes, setNotes] = useState(tag?.notes ?? "");
  useEffect(() => { setName(tag?.name ?? ""); setNotes(tag?.notes ?? ""); }, [tag?.name, tag?.notes]);
  const pages = Array.isArray(v.pages) ? (v.pages as { page: string }[]) : [];
  return (
    <div className="bg-card border border-border rounded-lg p-4 grid md:grid-cols-2 gap-4">
      <div className="font-body text-sm text-muted-foreground space-y-1">
        <p className="text-foreground font-semibold">IP {v.ip_address ?? "unknown"}</p>
        <p>First seen {fmt(v.first_seen)}</p>
        <p>Last seen {fmt(v.last_seen)} on {v.current_page}</p>
        <p>{pages.length} page views: {[...new Set(pages.map((p) => p.page))].join(", ")}</p>
        <p className="text-xs break-all">{v.user_agent}</p>
      </div>
      <div className="space-y-2">
        <Input placeholder="Name / tag" value={name} onChange={(e) => setName(e.target.value)} />
        <Textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
        <Button size="sm" onClick={() => onSave(v.visitor_token, name, notes)}>Save tag</Button>
      </div>
    </div>
  );
};

export default Admin;
