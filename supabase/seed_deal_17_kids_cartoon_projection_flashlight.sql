-- Deal 17: Kids cartoon projection flashlight (10 cards, 80 patterns)
-- Run in Supabase SQL Editor (paste this entire file, not the path).
-- Only your Admitad / rzekl link is needed — AliExpress URL is derived automatically.
-- Safe to re-run (updates deal 17 if it already exists).

WITH deal AS (
  SELECT
    'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005012276991058.html%3Fpdp_ext_f%3D%257B%2522sku_id%2522%253A%252212000057967448712%2522%257D%26sourceType%3D1%26spm%3Da2g0o.wish-manage-home.0.0' AS affiliate_url
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
  '44444444-4444-4444-4444-444444444517',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111107',
  '22222222-2222-2222-2222-222222222204',
  'Дитячий проектор-ліхтарик з мультфільмами — 10 карток, 80 зображень',
  $$Креативний дитячий проектор-ліхтарик — іграшка для вечірніх казок і розваг перед сном. Набір із 10 карток та 80 мультяшних зображень.

Особливості:

• 10 проекційних карток — 80 різних зображень
• Мультяшні малюнки для вечірніх історій
• Компактний формат — зручно брати з собою
• Підходить для дітей від 3 років
• Залишилося лише 10 штук

💰 Знижка 56% на AliExpress
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  191.73,
  431.89,
  'https://www.aliexpress.com/item/' || (regexp_match(d.affiliate_url, 'item%2F([0-9]+)'))[1] || '.html',
  d.affiliate_url,
  'https://vyhodadeal.com/deals/kids-cartoon-projection-flashlight.png',
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
