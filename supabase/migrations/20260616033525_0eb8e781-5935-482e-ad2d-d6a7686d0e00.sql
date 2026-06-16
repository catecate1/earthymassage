CREATE TABLE public.owner_status (
  id boolean PRIMARY KEY DEFAULT true,
  last_seen timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT owner_status_singleton CHECK (id = true)
);

INSERT INTO public.owner_status (id, last_seen) VALUES (true, now() - interval '1 day');

GRANT SELECT ON public.owner_status TO anon, authenticated;
GRANT UPDATE ON public.owner_status TO authenticated;
GRANT ALL ON public.owner_status TO service_role;

ALTER TABLE public.owner_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read owner status"
  ON public.owner_status FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can update owner status"
  ON public.owner_status FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);