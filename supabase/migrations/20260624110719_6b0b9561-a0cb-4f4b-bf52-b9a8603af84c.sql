
CREATE TABLE public.visitor_tags (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_token text NOT NULL UNIQUE,
  name text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.visitor_tags TO authenticated;
GRANT ALL ON public.visitor_tags TO service_role;

ALTER TABLE public.visitor_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated owners can view visitor tags"
  ON public.visitor_tags FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated owners can insert visitor tags"
  ON public.visitor_tags FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated owners can update visitor tags"
  ON public.visitor_tags FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated owners can delete visitor tags"
  ON public.visitor_tags FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_visitor_tags_updated_at
  BEFORE UPDATE ON public.visitor_tags
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
