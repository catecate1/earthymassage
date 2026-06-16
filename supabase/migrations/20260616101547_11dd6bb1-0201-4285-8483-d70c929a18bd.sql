GRANT ALL ON public.chat_logs TO service_role;
GRANT ALL ON public.owner_status TO service_role;
GRANT SELECT, DELETE ON public.chat_logs TO authenticated;
GRANT SELECT, UPDATE ON public.owner_status TO authenticated;
GRANT SELECT ON public.owner_status TO anon;