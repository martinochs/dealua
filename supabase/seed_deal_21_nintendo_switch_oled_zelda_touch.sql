-- Deal 21: Nintendo Switch OLED — Zelda Tears of the Kingdom Edition (TOUCH)
-- Run in Supabase SQL Editor (paste this entire file, not the path).
-- Safe to re-run (updates deal 21 if it already exists).

WITH deal AS (
  SELECT
    'https://wbbsv.com/g/ynys1f2mjpd66b47c3060e81904d8b/?ulp=https%3A%2F%2Ftouch.com.ua%2Fua%2Fitem%2Fnintendo-switch-oled-model-the-legend-of-zelda-tears-of-the-kingdom-edition-portativnaya-igrovaya-pr%2F' AS affiliate_url
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
  '44444444-4444-4444-4444-444444444521',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111101',
  '22222222-2222-2222-2222-222222222205',
  'Nintendo Switch OLED — The Legend of Zelda: Tears of the Kingdom Edition',
  $$Портативна ігрова консоль Nintendo Switch OLED у спеціальному дизайні The Legend of Zelda: Tears of the Kingdom — вигідна ціна в TOUCH.

Особливості:

• OLED-екран 7" — яскраві кольори та контраст
• Лімітоване оформлення Zelda: Tears of the Kingdom
• Портативний та домашній режим гри
• Joy-Con контролери в комплекті
• Док-станція та кабель HDMI в комплекті
• Економія 1 740 ₴

💰 Знижка 1 740 ₴ на TOUCH
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  18059,
  19799,
  'https://touch.com.ua/ua/item/nintendo-switch-oled-model-the-legend-of-zelda-tears-of-the-kingdom-edition-portativnaya-igrovaya-pr/',
  d.affiliate_url,
  'https://vyhodadeal.com/deals/nintendo-switch-oled-zelda-tears-touch.png',
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
