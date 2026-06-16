ALTER TABLE public.chat_logs
  ADD COLUMN IF NOT EXISTS visitor_token text;

CREATE INDEX IF NOT EXISTS idx_chat_logs_visitor_token
ON public.chat_logs (visitor_token);