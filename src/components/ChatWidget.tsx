import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X, Send } from "lucide-react";
import { callVisitor } from "@/lib/visitor";

type Msg = { id: string; user_message: string; owner_reply: string | null };

const ChatWidget = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [online, setOnline] = useState(false);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (!isAdmin) callVisitor({ action: "track", page: location.pathname });
  }, [location.pathname, isAdmin]);

  const poll = async () => {
    const { data } = await callVisitor({ action: "poll" });
    if (data) {
      setMsgs(data.messages);
      setOnline(data.online);
    }
  };

  useEffect(() => {
    if (!open) return;
    poll();
    const id = setInterval(poll, 8000);
    return () => clearInterval(id);
  }, [open]);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    await callVisitor({ action: "send", message: text });
    setText("");
    setSending(false);
    poll();
  };

  if (isAdmin) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {open && (
        <div className="mb-3 w-80 max-w-[calc(100vw-2.5rem)] bg-card border border-border rounded-xl shadow-card flex flex-col overflow-hidden">
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-display text-lg leading-tight">Chat with Deb</p>
              <p className="font-body text-xs opacity-90">{online ? "I'm here now" : "I'll reply when I'm back"}</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat"><X className="w-5 h-5" /></button>
          </div>
          <div className="h-72 overflow-y-auto p-3 space-y-2 bg-background">
            {msgs.length === 0 && (
              <p className="font-body text-sm text-muted-foreground text-center mt-8">
                Leave a question here. For bookings, please call 413-327-8496.
              </p>
            )}
            {msgs.map((m) => (
              <div key={m.id} className="space-y-2">
                <div className="ml-auto max-w-[85%] bg-primary/15 rounded-lg px-3 py-2 font-body text-sm text-foreground">{m.user_message}</div>
                {m.owner_reply && (
                  <div className="max-w-[85%] bg-muted rounded-lg px-3 py-2 font-body text-sm text-foreground">
                    <span className="font-semibold">Deb: </span>{m.owner_reply}
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={send} className="flex border-t border-border">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={2000}
              placeholder="Type a message…"
              className="flex-1 px-3 py-2 font-body text-sm bg-card text-foreground outline-none"
            />
            <button disabled={sending} className="px-3 text-primary disabled:opacity-50" aria-label="Send"><Send className="w-4 h-4" /></button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="ml-auto flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-3 shadow-card font-body text-sm"
      >
        <MessageCircle className="w-5 h-5" /> Chat
      </button>
    </div>
  );
};

export default ChatWidget;
