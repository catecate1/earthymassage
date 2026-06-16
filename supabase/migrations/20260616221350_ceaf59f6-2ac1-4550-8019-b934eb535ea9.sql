ALTER TABLE public.owner_status
ADD COLUMN IF NOT EXISTS is_online boolean NOT NULL DEFAULT false;

UPDATE public.owner_status
SET is_online = false,
    last_seen = now() - interval '5 minutes'
WHERE id = true;