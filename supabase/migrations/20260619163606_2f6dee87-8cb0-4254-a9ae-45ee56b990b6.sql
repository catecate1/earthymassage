
CREATE TABLE public.visitor_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_token text NOT NULL UNIQUE,
  ip_address text,
  user_agent text,
  current_page text,
  pages jsonb NOT NULL DEFAULT '[]'::jsonb,
  first_seen timestamptz NOT NULL DEFAULT now(),
  last_seen timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.visitor_sessions TO authenticated;
GRANT ALL ON public.visitor_sessions TO service_role;

ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view visitor sessions"
  ON public.visitor_sessions FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX visitor_sessions_last_seen_idx ON public.visitor_sessions (last_seen DESC);
