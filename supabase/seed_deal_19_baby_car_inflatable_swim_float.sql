-- Deal 19: Baby inflatable swim float — car design
-- Run in Supabase SQL Editor (paste this entire file, not the path).
-- Only your Admitad / rzekl link is needed — AliExpress URL is derived automatically.
-- Safe to re-run (updates deal 19 if it already exists).

WITH deal AS (
  SELECT
    'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005007619948310.html%3Fpdp_ext_f%3D%257B%2522sku_id%2522%253A%252212000041529798277%2522%257D%26sourceType%3D1%26spm%3Da2g0o.wish-manage-home.0.0' AS affiliate_url
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
  '44444444-4444-4444-4444-444444444519',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111107',
  '22222222-2222-2222-2222-222222222204',
  'Дитячий надувний плавзасіб у вигляді машинки — для басейну та пляжу',
  $$Милий надувний плавзасіб у формі машинки — для малюків та дітей на басейн, пляж і літній відпочинок.

Особливості:

• Дизайн у вигляді автомобіля — дітям сподобається
• Зручні ручки для безпечного утримання
• Підходить для басейну, моря та пляжу
• Легко надувається — зручно брати з собою
• Залишилося лише 10 штук

💰 Знижка 57% на AliExpress
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  237.75,
  551.40,
  'https://www.aliexpress.com/item/' || (regexp_match(d.affiliate_url, 'item%2F([0-9]+)'))[1] || '.html',
  d.affiliate_url,
  'https://vyhodadeal.com/deals/baby-car-inflatable-swim-float.png',
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
