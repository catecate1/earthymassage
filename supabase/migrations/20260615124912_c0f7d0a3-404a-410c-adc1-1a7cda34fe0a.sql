CREATE TABLE public.chat_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  user_message TEXT NOT NULL,
  ai_reply TEXT,
  owner_online BOOLEAN NOT NULL DEFAULT false
);

GRANT SELECT, DELETE ON public.chat_logs TO authenticated;
GRANT ALL ON public.chat_logs TO service_role;

ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view chat logs"
ON public.chat_logs FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete chat logs"
ON public.chat_logs FOR DELETE
TO authenticated
USING (true);

CREATE INDEX idx_chat_logs_created_at ON public.chat_logs (created_at DESC);
CREATE INDEX idx_chat_logs_ip ON public.chat_logs (ip_address);