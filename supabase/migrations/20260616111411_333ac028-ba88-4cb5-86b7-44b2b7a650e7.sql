ALTER TABLE public.chat_logs
  ADD COLUMN IF NOT EXISTS owner_reply text,
  ADD COLUMN IF NOT EXISTS owner_replied_at timestamp with time zone;

GRANT SELECT, DELETE, UPDATE ON public.chat_logs TO authenticated;
GRANT ALL ON public.chat_logs TO service_role;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'chat_logs'
      AND policyname = 'Authenticated users can update owner replies'
  ) THEN
    CREATE POLICY "Authenticated users can update owner replies"
    ON public.chat_logs
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);
  END IF;
END $$;