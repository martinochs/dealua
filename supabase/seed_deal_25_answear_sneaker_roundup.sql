-- Deal 25: Answear sneaker roundup — main offer + more offers in description (MyDealz-style)
-- Run in Supabase SQL Editor (paste this entire file, not the path).
-- Safe to re-run (updates deal 25 if it already exists).
--
-- More offers block format in description:
--   🔥 Ще пропозиції:
--   • Product name — price → https://affiliate-link

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
    'https://hxbok.com/g/h29o15jdr6d66b47c306a76d99edd2/?ulp=https%3A%2F%2Fanswear.ua%2Fp%2Fbigovi-krosivky-hoka-mafate-speed-2-kolir-zelenyj-1126851-1303762' AS affiliate_url
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
  '44444444-4444-4444-4444-444444444525',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111105',
  '22222222-2222-2222-2222-222222222206',
  'Answear SALE — HOKA Mafate Speed 2 зелений + ще кросівки',
  $$Підбірка знижок на кросівки в Answear — додаткові −5% з промокодом SALE на вже знижені ціни.

Головна пропозиція — HOKA Mafate Speed 2 у зеленому кольорі (розміри 42⅔–46⅔).

Особливості:

• Промокод SALE: 5 399 ₴ → 5 129 ₴
• Підошва Vibram Megagrip — надійне зчеплення
• Амортизація CMEVA та Meta-Rocker
• Економія 2 570 ₴ від 7 699 ₴

💰 Знижка 33% на Answear (з кодом SALE)
👉 Натисніть «Забрати зараз» для головної пропозиції

🔥 Ще пропозиції:

• HOKA Mafate Speed 2 чорний/синій — 4 939 ₴ → https://hxbok.com/g/h29o15jdr6d66b47c306a76d99edd2/?ulp=https%3A%2F%2Fanswear.ua%2Fp%2Fbigovi-krosivky-hoka-mafate-speed-2-kolir-chornyj-1126851-1538050
• Жіночі adidas Rapidmove Pro Trainer білий — 4 749 ₴ → https://hxbok.com/g/h29o15jdr6d66b47c306a76d99edd2/?ulp=https%3A%2F%2Fanswear.ua%2Fp%2Fkrosivky-dlya-trenuvan-adidas-performance-rapidmove-pro-trainer-kolir-bilyj-jp8783-1686300$$,
  5129,
  7699,
  'https://answear.ua/p/bigovi-krosivky-hoka-mafate-speed-2-kolir-zelenyj-1126851-1303762',
  d.affiliate_url,
  'https://vyhodadeal.com/deals/hoka-mafate-speed-2-answear-green.png',
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
