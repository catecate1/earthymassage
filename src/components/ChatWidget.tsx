import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type ChatMsg = { role: "user" | "assistant"; content: string };

type OwnerReply = {
  id: string;
  owner_reply: string | null;
  owner_replied_at: string | null;
};

const visitorTokenKey = "earthy_chat_visitor_token";
const seenRepliesKey = "earthy_chat_seen_owner_replies";
const chatActiveKey = "earthy_chat_active";

const getStoredVisitorToken = () => {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem(visitorTokenKey);
  if (existing) return existing;
  const token = window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(visitorTokenKey, token);
  return token;
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [debOnline, setDebOnline] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [visitorToken] = useState(getStoredVisitorToken);
  const [chatActive, setChatActive] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem(chatActiveKey) === "true",
  );
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm Earthy Massage's friendly AI helper. Ask me about services, booking, or policies — and I'll do my best to help.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const seenOwnerRepliesRef = useRef<Set<string>>(
    new Set(
      typeof window === "undefined"
        ? []
        : (() => {
            try {
              return JSON.parse(window.localStorage.getItem(seenRepliesKey) ?? "[]");
            } catch {
              return [];
            }
          })(),
    ),
  );

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) setOwnerSignedIn(Boolean(data.session));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setOwnerSignedIn(Boolean(session));
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!ownerSignedIn) return;
    let cancelled = false;
    const beat = async () => {
      const { data, error } = await supabase
        .from("owner_status")
        .update({ last_seen: new Date().toISOString() })
        .eq("id", true)
        .select("last_seen")
        .maybeSingle();
      if (!cancelled && !error && data?.last_seen) setDebOnline(true);
    };
    beat();
    const interval = setInterval(beat, 20000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [ownerSignedIn]);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      const { data } = await supabase
        .from("owner_status")
        .select("last_seen")
        .eq("id", true)
        .maybeSingle();
      if (cancelled) return;
      if (data?.last_seen) {
        const ageMs = Date.now() - new Date(data.last_seen).getTime();
        setDebOnline(ageMs < 60_000);
      } else {
        setDebOnline(false);
      }
    };
    check();
    const interval = setInterval(check, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  useEffect(() => {
    if (!visitorToken || !chatActive) return;

    let cancelled = false;
    const checkReplies = async () => {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { action: "owner-replies", visitorToken },
      });
      if (cancelled || error) return;

      const replies = ((data as { replies?: OwnerReply[] })?.replies ?? []).filter((reply) => {
        const replyKey = `${reply.id}:${reply.owner_replied_at ?? ""}`;
        return reply.owner_reply && !seenOwnerRepliesRef.current.has(replyKey);
      });
      if (replies.length === 0) return;

      replies.forEach((reply) => {
        seenOwnerRepliesRef.current.add(`${reply.id}:${reply.owner_replied_at ?? ""}`);
      });
      window.localStorage.setItem(
        seenRepliesKey,
        JSON.stringify(Array.from(seenOwnerRepliesRef.current)),
      );
      setMessages((current) => [
        ...current,
        ...replies.map((reply) => ({
          role: "assistant" as const,
          content: `Deb replied: ${reply.owner_reply}`,
        })),
      ]);
      setOpen(true);
    };

    checkReplies();
    const interval = setInterval(checkReplies, 8000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [chatActive, visitorToken]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setChatActive(true);
    window.localStorage.setItem(chatActiveKey, "true");
    setInput("");
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: {
          messages: next.map((m) => ({ role: m.role, content: m.content })),
          ownerOnline: debOnline,
          visitorToken,
        },
      });
      if (error) throw error;
      const reply = (data as { reply?: string })?.reply ?? "Sorry — something went wrong.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm having trouble responding right now. For quick help, please call Deb at 413-327-8496.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="font-body text-sm hidden sm:inline">
          {open ? "Close" : "Chat with us"}
        </span>
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-border bg-secondary/40 px-4 py-3">
            <div>
              <h3 className="font-heading text-base text-foreground">Earthy Massage</h3>
              <div className="mt-1 flex items-center gap-2 text-xs font-body text-muted-foreground">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    debOnline ? "bg-green-500" : "bg-muted-foreground/40"
                  }`}
                  aria-hidden="true"
                />
                {debOnline ? (
                  <span>Deb is online and can reply here.</span>
                ) : (
                  <span>Deb is away — our AI helper is here.</span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm font-body leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-secondary px-3 py-2 text-sm font-body text-muted-foreground">
                  Thinking…
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex flex-col gap-1 border-t border-border bg-background px-3 py-2"
          >
            <p className="text-[10px] font-body text-muted-foreground text-center">
              Chats are logged for quality and safety.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 rounded-full border border-input bg-background px-3 py-2 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40"
                disabled={loading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading || !input.trim()}
                className="rounded-full"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

      )}
    </>
  );
};

export default ChatWidget;
