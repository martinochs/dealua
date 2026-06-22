-- Deal 24: adidas Performance Rapidmove Pro Trainer — women's training shoes (Answear)
-- Run in Supabase SQL Editor (paste this entire file, not the path).
-- Safe to re-run (updates deal 24 if it already exists).

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
    'https://hxbok.com/g/h29o15jdr6d66b47c306a76d99edd2/?ulp=https%3A%2F%2Fanswear.ua%2Fp%2Fkrosivky-dlya-trenuvan-adidas-performance-rapidmove-pro-trainer-kolir-bilyj-jp8783-1686300' AS affiliate_url
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
  '44444444-4444-4444-4444-444444444524',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111105',
  '22222222-2222-2222-2222-222222222206',
  'Жіночі кросівки adidas Rapidmove Pro Trainer | білий',
  $$Жіночі кросівки для тренувань adidas Performance Rapidmove Pro Trainer у білому кольорі — знижка на Answear з додатковим промокодом SALE (−5%).

Особливості:

• Промокод SALE: 4 999 ₴ → 4 749 ₴
• Технологія Climacool — вентиляція та відведення вологи
• Підошва Lightstrike Pro + Lightstrike — амортизація та віддача енергії
• Зовнішня підошва Continental — надійне зчеплення на сухій і мокрій поверхні
• Підходять для тренувань, функціонального фітнесу та залу
• Економія 2 250 ₴ від 6 999 ₴

💰 Знижка 32% на Answear (з кодом SALE)
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  4749,
  6999,
  'https://answear.ua/p/krosivky-dlya-trenuvan-adidas-performance-rapidmove-pro-trainer-kolir-bilyj-jp8783-1686300',
  d.affiliate_url,
  'https://vyhodadeal.com/deals/adidas-rapidmove-pro-trainer-womens-white.jpg',
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
