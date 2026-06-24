
-- Roles infrastructure
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('owner');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Seed owner role for existing admin accounts
INSERT INTO public.user_roles (user_id, role) VALUES
  ('074d3034-763b-420d-b77a-ec0189cc72b7', 'owner'),
  ('2b6a465a-1bb9-48e4-9511-e634571687d2', 'owner')
ON CONFLICT (user_id, role) DO NOTHING;

-- chat_logs: restrict to owners
DROP POLICY IF EXISTS "Authenticated users can view chat logs" ON public.chat_logs;
DROP POLICY IF EXISTS "Signed-in owners can delete chat logs" ON public.chat_logs;
DROP POLICY IF EXISTS "Signed-in owners can update owner replies" ON public.chat_logs;

CREATE POLICY "Owners can view chat logs" ON public.chat_logs
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'owner'));
CREATE POLICY "Owners can update chat logs" ON public.chat_logs
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'owner')) WITH CHECK (public.has_role(auth.uid(), 'owner'));
CREATE POLICY "Owners can delete chat logs" ON public.chat_logs
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'owner'));

-- visitor_sessions: restrict to owners
DROP POLICY IF EXISTS "Authenticated users can view visitor sessions" ON public.visitor_sessions;
CREATE POLICY "Owners can view visitor sessions" ON public.visitor_sessions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'owner'));

-- visitor_tags: restrict to owners
DROP POLICY IF EXISTS "Authenticated owners can view visitor tags" ON public.visitor_tags;
DROP POLICY IF EXISTS "Authenticated owners can insert visitor tags" ON public.visitor_tags;
DROP POLICY IF EXISTS "Authenticated owners can update visitor tags" ON public.visitor_tags;
DROP POLICY IF EXISTS "Authenticated owners can delete visitor tags" ON public.visitor_tags;

CREATE POLICY "Owners can view visitor tags" ON public.visitor_tags
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'owner'));
CREATE POLICY "Owners can insert visitor tags" ON public.visitor_tags
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'owner'));
CREATE POLICY "Owners can update visitor tags" ON public.visitor_tags
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'owner')) WITH CHECK (public.has_role(auth.uid(), 'owner'));
CREATE POLICY "Owners can delete visitor tags" ON public.visitor_tags
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'owner'));
