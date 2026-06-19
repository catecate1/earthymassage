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
  owner_reply: string | null;
  owner_replied_at: string | null;
  owner_online: boolean;
};

type VisitorSession = {
  id: string;
  visitor_token: string;
  ip_address: string | null;
  user_agent: string | null;
  current_page: string | null;
  pages: Array<{ path: string; at: string }> | null;
  first_seen: string;
  last_seen: string;
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
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [savingReplyId, setSavingReplyId] = useState<string | null>(null);
  const [onlineStatus, setOnlineStatus] = useState<"checking" | "online" | "error">("checking");
  const [heartbeatError, setHeartbeatError] = useState("");
  const [showOnline, setShowOnline] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const v = window.localStorage.getItem("owner_show_online");
    return v === null ? true : v === "true";
  });

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
    setReplyDrafts((drafts) => {
      const next = { ...drafts };
      (data ?? []).forEach((log) => {
        if (next[log.id] === undefined) next[log.id] = log.owner_reply ?? "";
      });
      return next;
    });
  }, []);

  useEffect(() => {
    if (!session) return;
    loadLogs();
    const channel = supabase
      .channel("admin-chat-logs")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chat_logs" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const row = payload.new as ChatLog;
            setLogs((current) =>
              current.some((l) => l.id === row.id) ? current : [row, ...current],
            );
            setReplyDrafts((drafts) =>
              drafts[row.id] === undefined
                ? { ...drafts, [row.id]: row.owner_reply ?? "" }
                : drafts,
            );
          } else if (payload.eventType === "UPDATE") {
            const row = payload.new as ChatLog;
            setLogs((current) => current.map((l) => (l.id === row.id ? row : l)));
          } else if (payload.eventType === "DELETE") {
            const row = payload.old as { id?: string };
            if (row?.id) setLogs((current) => current.filter((l) => l.id !== row.id));
          }
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [session, loadLogs]);

  useEffect(() => {
    if (!session) {
      setOnlineStatus("checking");
      setHeartbeatError("");
      return;
    }
    let cancelled = false;
    const pushOffline = async () => {
      await supabase
        .from("owner_status")
        .update({
          is_online: false,
          last_seen: new Date(Date.now() - 5 * 60_000).toISOString(),
          offline_until: new Date(Date.now() + 12 * 60 * 60_000).toISOString(),
        })
        .eq("id", true);
    };
    if (!showOnline) {
      pushOffline();
      const t1 = setTimeout(pushOffline, 500);
      const t2 = setTimeout(pushOffline, 1500);
      const offInterval = setInterval(pushOffline, 10_000);
      setOnlineStatus("checking");
      setHeartbeatError("");
      return () => {
        cancelled = true;
        clearTimeout(t1);
        clearTimeout(t2);
        clearInterval(offInterval);
      };
    }
    const beat = async () => {
      if (cancelled) return;
      const { data, error } = await supabase
        .from("owner_status")
        .update({ is_online: true, last_seen: new Date().toISOString() })
        .eq("id", true)
        .select("last_seen,is_online")
        .maybeSingle();
      if (cancelled) return;
      if (error || !data?.last_seen) {
        setOnlineStatus("error");
        setHeartbeatError(error?.message ?? "The online status row was not found.");
        return;
      }
      if (!data.is_online) {
        setOnlineStatus("checking");
        setHeartbeatError("");
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
  }, [session, showOnline]);

  const toggleShowOnline = async (next: boolean) => {
    setShowOnline(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("owner_show_online", String(next));
    }
    if (next) {
      await supabase
        .from("owner_status")
        .update({ is_online: true, last_seen: new Date().toISOString(), offline_until: null })
        .eq("id", true);
      setOnlineStatus("online");
    } else {
      await supabase
        .from("owner_status")
        .update({
          is_online: false,
          last_seen: new Date(Date.now() - 5 * 60_000).toISOString(),
          offline_until: new Date(Date.now() + 12 * 60 * 60_000).toISOString(),
        })
        .eq("id", true);
      setOnlineStatus("checking");
    }
    toast({
      title: next ? "Showing as online" : "Showing as offline",
      description: next
        ? "Visitors will see that Deb is available to chat."
        : "Visitors will see the AI assistant instead.",
    });
  };



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
      .update({
        is_online: false,
        last_seen: new Date(Date.now() - 5 * 60_000).toISOString(),
        offline_until: new Date(Date.now() + 12 * 60 * 60_000).toISOString(),
      })
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

  const saveReply = async (log: ChatLog) => {
    const reply = (replyDrafts[log.id] ?? "").trim();
    if (!reply) {
      toast({ title: "Reply is empty", description: "Type a reply before sending it." });
      return;
    }
    setSavingReplyId(log.id);
    const repliedAt = new Date().toISOString();
    const { error } = await supabase
      .from("chat_logs")
      .update({ owner_reply: reply, owner_replied_at: repliedAt })
      .eq("id", log.id);
    setSavingReplyId(null);
    if (error) {
      toast({ title: "Reply failed", description: error.message, variant: "destructive" });
      return;
    }
    setLogs((current) =>
      current.map((item) =>
        item.id === log.id ? { ...item, owner_reply: reply, owner_replied_at: repliedAt } : item,
      ),
    );
    toast({ title: "Reply sent", description: "It will appear in that visitor's chat window if they are still there." });
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
            {!showOnline ? (
              <p className="font-body text-sm text-muted-foreground">
                You are signed in but showing as <span className="font-semibold text-muted-foreground">offline</span>. Visitors will chat with the AI.
              </p>
            ) : onlineStatus === "online" ? (
              <p className="font-body text-sm text-muted-foreground">
                You are showing as <span className="font-semibold text-green-600">online</span> in the chat widget.
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
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant={showOnline ? "default" : "outline"}
              onClick={() => toggleShowOnline(true)}
            >
              Show online
            </Button>
            <Button
              type="button"
              variant={!showOnline ? "default" : "outline"}
              onClick={() => toggleShowOnline(false)}
            >
              Show offline
            </Button>
            <Button onClick={signOut} variant="secondary">Sign out</Button>
          </div>
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
                  <div className="mt-3 space-y-2">
                    <label className="block text-xs font-body font-semibold text-foreground" htmlFor={`reply-${l.id}`}>
                      Deb's reply
                    </label>
                    <textarea
                      id={`reply-${l.id}`}
                      value={replyDrafts[l.id] ?? l.owner_reply ?? ""}
                      onChange={(e) => setReplyDrafts((drafts) => ({ ...drafts, [l.id]: e.target.value }))}
                      className="min-h-20 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-body text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Type your reply to this visitor…"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-body text-muted-foreground">
                        {l.owner_replied_at
                          ? `Last sent ${new Date(l.owner_replied_at).toLocaleString()}`
                          : "Not replied yet"}
                      </p>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => saveReply(l)}
                        disabled={savingReplyId === l.id || !(replyDrafts[l.id] ?? l.owner_reply ?? "").trim()}
                      >
                        {savingReplyId === l.id ? "Sending…" : l.owner_reply ? "Update reply" : "Send reply"}
                      </Button>
                    </div>
                  </div>
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
