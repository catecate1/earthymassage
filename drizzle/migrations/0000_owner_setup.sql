CREATE OR REPLACE FUNCTION public.assign_first_owner()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'owner') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'owner');
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS on_auth_user_created_owner ON auth.users;
CREATE TRIGGER on_auth_user_created_owner AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.assign_first_owner();

DROP POLICY IF EXISTS "Signed-in owners can update online status" ON public.owner_status;
CREATE POLICY "Owners can update online status" ON public.owner_status FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'owner')) WITH CHECK (public.has_role(auth.uid(), 'owner'));
INSERT INTO public.owner_status (id) VALUES (true) ON CONFLICT DO NOTHING;
GRANT SELECT ON public.owner_status TO anon, authenticated;
GRANT UPDATE ON public.owner_status TO authenticated;
GRANT SELECT, UPDATE, DELETE ON public.chat_logs TO authenticated;
GRANT SELECT ON public.visitor_sessions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.visitor_tags TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.chat_logs, public.visitor_sessions, public.visitor_tags, public.owner_status, public.user_roles TO service_role;