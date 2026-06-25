-- Deal 33: Sony PlayStation 5 Slim 1TB + Marvel's Spider-Man 2 Bundle (TOUCH)
-- Run in Supabase SQL Editor (paste this entire file, not the path).
-- Safe to re-run (updates deal 33 if it already exists).

INSERT INTO public.merchants (id, name, slug, logo_url, affiliate_base_url)
VALUES (
  '22222222-2222-2222-2222-222222222205',
  'TOUCH',
  'touch',
  null,
  'https://touch.com.ua'
)
ON CONFLICT (slug) DO NOTHING;

WITH deal AS (
  SELECT
    'https://wbbsv.com/g/ynys1f2mjpd66b47c3060e81904d8b/?ulp=https%3A%2F%2Ftouch.com.ua%2Fua%2Fitem%2Fsony-playstation-5-slim-1tb-marvel-s-spider-man-2-bundle-igrovaya-pristavka-vaucher%2F' AS affiliate_url
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
  '44444444-4444-4444-4444-444444444533',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111101',
  '22222222-2222-2222-2222-222222222205',
  'Sony PlayStation 5 Slim 1TB + Marvel''s Spider-Man 2 Bundle',
  $$Ігрова консоль Sony PlayStation 5 Slim з накопичувачем 1 ТБ у комплекті з грою Marvel's Spider-Man 2 — акція в TOUCH.

Особливості:

• PlayStation 5 Slim Blu-ray Edition — компактний корпус, SSD 1 ТБ
• У комплекті ваучер Marvel's Spider-Man 2
• Підтримка 4K, HDR та до 120 FPS
• DualSense з тактильним зворотним зв'язком та адаптивними тригерами
• Швидкий SSD — миттєве завантаження ігор
• Зворотна сумісність з іграми PS4
• Економія 2 750 ₴

💰 Знижка 2 750 ₴ на TOUCH
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  28649,
  31399,
  'https://touch.com.ua/ua/item/sony-playstation-5-slim-1tb-marvel-s-spider-man-2-bundle-igrovaya-pristavka-vaucher/',
  d.affiliate_url,
  'https://vyhodadeal.com/deals/ps5-slim-cod-bundle-touch.png',
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
