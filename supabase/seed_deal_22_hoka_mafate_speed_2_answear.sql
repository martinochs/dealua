-- Deal 22: HOKA Mafate Speed 2 — black trail running shoes (Answear)
-- Run in Supabase SQL Editor (paste this entire file, not the path).
-- Safe to re-run (updates deal 22 if it already exists).

INSERT INTO public.merchants (id, name, slug, logo_url, affiliate_base_url)
VALUES (
  '22222222-2222-2222-2222-222222222206',
  'Answear',
  'answear',
  null,
  'https://answear.ua'
)
ON CONFLICT (slug) DO NOTHING;

WITH deal AS (
  SELECT
    'https://hxbok.com/g/h29o15jdr6d66b47c306a76d99edd2/?ulp=https%3A%2F%2Fanswear.ua%2Fp%2Fbigovi-krosivky-hoka-mafate-speed-2-kolir-chornyj-1126851-1538050' AS affiliate_url
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
  '44444444-4444-4444-4444-444444444522',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111105',
  '22222222-2222-2222-2222-222222222206',
  'HOKA Mafate Speed 2 — чорні трейлові кросівки',
  $$Трейлові кросівки HOKA Mafate Speed 2 у чорному кольорі — знижка на Answear з додатковим промокодом SALE (−5%).

Особливості:

• Промокод SALE: 5 199 ₴ → 4 939 ₴
• Підошва Vibram Megagrip — надійне зчеплення на різному покритті
• Амортизація CMEVA та геометрія Meta-Rocker
• Легка безшовна верхня частина SpeedFrame
• Drop 4 mm — для технічних трейлів і довгих дистанцій
• Доступні розміри: 43⅓, 44, 46
• Економія 3 760 ₴ від 8 699 ₴

💰 Знижка 43% на Answear (з кодом SALE)
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  4939,
  8699,
  'https://answear.ua/p/bigovi-krosivky-hoka-mafate-speed-2-kolir-chornyj-1126851-1538050',
  d.affiliate_url,
  'https://vyhodadeal.com/deals/hoka-mafate-speed-2-answear.jpg',
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
