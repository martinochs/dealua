-- Categories and merchants only — safe to run right after migration (no auth users needed)
-- Run in Supabase SQL Editor after: supabase/migrations/20260101000000_initial_schema.sql

INSERT INTO public.categories (id, slug, name_uk, icon, sort_order) VALUES
  ('11111111-1111-1111-1111-111111111101', 'elektronika', 'Електроніка', '📱', 1),
  ('11111111-1111-1111-1111-111111111102', 'odyag', 'Одяг', '👕', 2),
  ('11111111-1111-1111-1111-111111111103', 'produkty', 'Продукти', '🛒', 3),
  ('11111111-1111-1111-1111-111111111104', 'dim-i-sad', 'Дім і сад', '🏡', 4),
  ('11111111-1111-1111-1111-111111111105', 'sport', 'Спорт', '⚽', 5),
  ('11111111-1111-1111-1111-111111111106', 'krasa', 'Краса', '💄', 6),
  ('11111111-1111-1111-1111-111111111107', 'diti', 'Дитячі товари', '🧸', 7),
  ('11111111-1111-1111-1111-111111111108', 'podorozhi', 'Подорожі', '✈️', 8)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.merchants (id, name, slug, logo_url, affiliate_base_url) VALUES
  ('22222222-2222-2222-2222-222222222201', 'Rozetka', 'rozetka', null, 'https://rozetka.com.ua'),
  ('22222222-2222-2222-2222-222222222202', 'Prom', 'prom', null, 'https://prom.ua'),
  ('22222222-2222-2222-2222-222222222203', 'Comfy', 'comfy', null, 'https://comfy.ua')
ON CONFLICT (slug) DO NOTHING;
