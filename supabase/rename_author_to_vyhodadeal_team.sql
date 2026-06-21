-- Rename deal author display name from martin83 (or legacy usernames) to VyhodaDeal Team.
-- Run in Supabase SQL Editor (safe to re-run).

UPDATE public.profiles
SET username = 'VyhodaDeal Team'
WHERE lower(trim(username)) IN ('martin83', 'dealmaster')
  AND username IS DISTINCT FROM 'VyhodaDeal Team';
