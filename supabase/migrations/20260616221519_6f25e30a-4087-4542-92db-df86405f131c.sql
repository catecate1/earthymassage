CREATE OR REPLACE FUNCTION public.keep_owner_offline_when_locked()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.offline_until IS NOT NULL
     AND NEW.offline_until > now()
     AND NEW.is_online = true THEN
    NEW.is_online := false;
    NEW.last_seen := now() - interval '5 minutes';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS keep_owner_offline_when_locked_trigger ON public.owner_status;

CREATE TRIGGER keep_owner_offline_when_locked_trigger
BEFORE UPDATE ON public.owner_status
FOR EACH ROW
EXECUTE FUNCTION public.keep_owner_offline_when_locked();