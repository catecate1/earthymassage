import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

type ChatLog = {
  id: string;
  created_at: string;
  ip_address: string | null;
  user_agent: string | null;
  user_message: string;
  ai_reply: string | null;
  owner_online: boolean;
};

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [session, setSession] = useState<unknown>(null);
  const [logs, setLogs] = useState<ChatLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [onlineStatus, setOnlineStatus] = useState<"checking" | "online" | "error">("checking");
  const [heartbeatError, setHeartbeatError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const loadLogs = useCallback(async () => {
    setLogsLoading(true);
    const { data, error } = await supabase
      .from("chat_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    setLogsLoading(false);
    if (error) {
      toast({ title: "Couldn't load logs", description: error.message, variant: "destructive" });
      return;
    }
    setLogs((data ?? []) as ChatLog[]);
  }, []);

  useEffect(() => {
    if (session) loadLogs();
  }, [session, loadLogs]);

  useEffect(() => {
    if (!session) {
      setOnlineStatus("checking");
      setHeartbeatError("");
      return;
    }
    let cancelled = false;
    const beat = async () => {
      if (cancelled) return;
      const { data, error } = await supabase
        .from("owner_status")
        .update({ last_seen: new Date().toISOString() })
        .eq("id", true)
        .select("last_seen")
        .maybeSingle();
      if (cancelled) return;
      if (error || !data?.last_seen) {
        setOnlineStatus("error");
        setHeartbeatError(error?.message ?? "The online status row was not found.");
        return;
      }
      setOnlineStatus("online");
      setHeartbeatError("");
    };
    beat();
    const interval = setInterval(beat, 20000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [session]);


  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    setLoading(false);
    if (error) {
      toast({ title: `${mode === "signin" ? "Sign in" : "Sign up"} failed`, description: error.message, variant: "destructive" });
    } else if (mode === "signup") {
      toast({ title: "Account created", description: "You can now sign in." });
      setMode("signin");
    } else {
      toast({ title: "Signed in", description: "You're now marked online." });
    }
  };

  const signOut = async () => {
    await supabase
      .from("owner_status")
      .update({ last_seen: new Date(Date.now() - 5 * 60_000).toISOString() })
      .eq("id", true);
    await supabase.auth.signOut();
    toast({ title: "Signed out", description: "You're now offline." });
  };

  const deleteOne = async (id: string) => {
    const { error } = await supabase.from("chat_logs").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    setLogs((l) => l.filter((x) => x.id !== id));
  };

  const deleteAll = async () => {
    if (!confirm("Delete ALL chat logs? This cannot be undone.")) return;
    const { error } = await supabase.from("chat_logs").delete().not("id", "is", null);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    setLogs([]);
    toast({ title: "All logs deleted" });
  };

  const filtered = logs.filter((l) => {
    if (!filter.trim()) return true;
    const f = filter.toLowerCase();
    return (
      (l.ip_address ?? "").toLowerCase().includes(f) ||
      l.user_message.toLowerCase().includes(f) ||
      (l.ai_reply ?? "").toLowerCase().includes(f)
    );
  });

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-md">
          <h1 className="font-heading text-2xl text-foreground mb-1">Owner Sign In</h1>
          <p className="font-body text-sm text-muted-foreground mb-6">
            Sign in to mark yourself online in the chat widget and view chat logs.
          </p>
          <form onSubmit={submit} className="space-y-3">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete={mode === "signin" ? "current-password" : "new-password"} minLength={6} />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
            <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="w-full text-xs font-body text-muted-foreground hover:text-foreground">
              {mode === "signin" ? "First time? Create owner account" : "Already have an account? Sign in"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div>
            <h1 className="font-heading text-2xl text-foreground">Owner Dashboard</h1>
            {onlineStatus === "online" ? (
              <p className="font-body text-sm text-muted-foreground">
                You are signed in and showing as <span className="font-semibold text-green-600">online</span> in the chat widget.
              </p>
            ) : onlineStatus === "error" ? (
              <p className="font-body text-sm text-destructive">
                Online status is not updating: {heartbeatError}
              </p>
            ) : (
              <p className="font-body text-sm text-muted-foreground">
                Checking your online status…
              </p>
            )}
          </div>
          <Button onClick={signOut} variant="secondary">Sign out (go offline)</Button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="font-heading text-xl text-foreground">Chat logs</h2>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Filter by IP or text…"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-56"
              />
              <Button variant="outline" onClick={loadLogs} disabled={logsLoading}>
                {logsLoading ? "Loading…" : "Refresh"}
              </Button>
              <Button variant="destructive" onClick={deleteAll} disabled={logs.length === 0}>
                Delete all
              </Button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="font-body text-sm text-muted-foreground py-8 text-center">
              {logs.length === 0 ? "No chat logs yet." : "No logs match that filter."}
            </p>
          ) : (
            <ul className="space-y-3">
              {filtered.map((l) => (
                <li key={l.id} className="rounded-xl border border-border bg-background p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-body text-muted-foreground mb-2">
                    <span>
                      {new Date(l.created_at).toLocaleString()} · IP {l.ip_address ?? "unknown"} ·{" "}
                      {l.owner_online ? "Deb online" : "AI replied"}
                    </span>
                    <button
                      onClick={() => deleteOne(l.id)}
                      className="text-destructive hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-sm font-body"><span className="font-semibold">Visitor:</span> {l.user_message}</p>
                  {l.ai_reply && (
                    <p className="text-sm font-body mt-1 text-muted-foreground"><span className="font-semibold text-foreground">Reply:</span> {l.ai_reply}</p>
                  )}
                  {l.user_agent && (
                    <p className="text-[10px] font-body text-muted-foreground/70 mt-1 truncate" title={l.user_agent}>
                      {l.user_agent}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
