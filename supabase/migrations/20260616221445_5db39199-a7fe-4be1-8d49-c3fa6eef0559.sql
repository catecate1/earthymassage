ALTER TABLE public.owner_status
ADD COLUMN IF NOT EXISTS offline_until timestamp with time zone;

UPDATE public.owner_status
SET offline_until = now() + interval '12 hours',
    is_online = false,
    last_seen = now() - interval '5 minutes'
WHERE id = true;