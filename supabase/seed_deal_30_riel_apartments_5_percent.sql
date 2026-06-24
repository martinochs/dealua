-- Deal 30: RIEL — 5% apartment discount + installment from 30% down payment
-- Run in Supabase SQL Editor (paste this entire file, not the path).
-- Safe to re-run (updates deal 30 if it already exists).
--
-- Example pricing on card: 2 000 000 ₴ → 1 900 000 ₴ after 5% (see description).

INSERT INTO public.merchants (id, name, slug, logo_url, affiliate_base_url)
VALUES (
  '22222222-2222-2222-2222-222222222208',
  'RIEL',
  'riel',
  null,
  'https://riel.ua'
)
ON CONFLICT (slug) DO NOTHING;

WITH deal AS (
  SELECT
    'https://uuwgc.com/g/0g9p90quvgd66b47c3068fe15b50b6/?ulp=https%3A%2F%2Friel.ua%2F' AS affiliate_url
)
INSERT INTO public.deals (
  id,
  user_id,
  category_id,
  merchant_id,
  title,
  description,
  price_uah,
  original_price_uah,
  external_url,
  affiliate_url,
  image_url,
  status,
  hot_count,
  cold_count,
  created_at
)
SELECT
  '44444444-4444-4444-4444-444444444530',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111104',
  '22222222-2222-2222-2222-222222222208',
  '🏢 Знижка 5% на квартири від RIEL + розтермінування від 30% першого внеску',
  $$Компанія RIEL оновила умови придбання нерухомості у Львові та Києві.

✅ Перший внесок від 30%
✅ Знижка 5% на вартість квартири
✅ Розтермінування від забудовника
✅ Новобудови у Львові та Києві

Наприклад, при вартості квартири 2 000 000 ₴ знижка 5% становить 100 000 ₴.

Деталі та умови акції уточнюйте на сайті забудовника.

👉 Натисніть «Забрати зараз», щоб перейти на сайт RIEL.$$,
  1900000,
  2000000,
  'https://riel.ua/',
  d.affiliate_url,
  'https://vyhodadeal.com/deals/riel-apartments-5-percent.webp',
  'approved',
  0,
  0,
  now()
FROM deal d
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price_uah = EXCLUDED.price_uah,
  original_price_uah = EXCLUDED.original_price_uah,
  external_url = EXCLUDED.external_url,
  affiliate_url = EXCLUDED.affiliate_url,
  image_url = EXCLUDED.image_url,
  status = EXCLUDED.status,
  created_at = EXCLUDED.created_at;
