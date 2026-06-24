-- Deal 27: Men's quick-dry double-layer running shorts (AliExpress)
-- Run in Supabase SQL Editor (paste this entire file, not the path).
-- Safe to re-run (updates deal 27 if it already exists).

WITH deal AS (
  SELECT
    'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005005068926217.html%3Fpdp_ext_f%3D%257B%2522sku_id%2522%253A%252212000031514524935%2522%257D%26sourceType%3D1%26spm%3Da2g0o.wish-manage-home.0.0' AS affiliate_url
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
  '44444444-4444-4444-4444-444444444527',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111105',
  '22222222-2222-2222-2222-222222222204',
  'Чоловічі бігові шорти — швидке висихання, подвійний шар | чорні',
  $$Чоловічі спортивні шорти з технологією швидкого висихання та подвійним шаром — для бігу, фітнесу, тренувань у залі та бодібілдингу.

Особливості:

• Подвійний шар — зовнішні шорти + внутрішня компресійна підкладка
• Тканина швидкого висихання — комфорт під час інтенсивних тренувань
• Вільний крій зовнішнього шару — не обмежує рух
• Підходять для бігу, залу, кросфіту та повсякденного спорту
• Класичний чорний колір
• Зручні для тренувань і активного відпочинку

💰 Вигідна ціна на AliExpress
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  189.45,
  428.90,
  'https://www.aliexpress.com/item/1005005068926217.html',
  d.affiliate_url,
  'https://vyhodadeal.com/deals/mens-quick-dry-double-layer-shorts-black.jpg',
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
