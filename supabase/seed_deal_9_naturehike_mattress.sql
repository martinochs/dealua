-- Deal 9: Naturehike camping mattress
-- Run in Supabase SQL Editor (paste this entire file, not the path).
-- Safe to re-run (ON CONFLICT DO NOTHING).

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
) VALUES (
  '44444444-4444-4444-4444-444444444509',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111108',
  '22222222-2222-2222-2222-222222222204',
  'Naturehike — надувний кемпінговий матрац R-Value 4.6, ультралегкий',
  $$Naturehike — сучасний надувний кемпінговий матрац для походів, кемпінгу та відпочинку на природі. З високим показником теплоізоляції R-Value 4.6 для комфортного сну навіть у прохолодну погоду.

Особливості:

• R-Value 4.6 — хороша теплоізоляція
• Ультралегка конструкція для походів
• Складна конструкція — зручно брати з собою
• Підходить для кемпінгу, пікніків і пляжу
• М'яка поверхня для комфортного сну
• Компактне зберігання в поході

💰 Вигідна ціна на AliExpress
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  2797.01,
  6906.15,
  'https://www.aliexpress.com/item/1005007500152556.html',
  'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005007500152556.html%3FproductId%3D1005007500152556%26selectedSkuId%3D12000041039284580%26channel%3DdetailPageDealCombineFloor%26combineBizType%3DplatformFreeShipping%26intent_extra_sku_from%3Dfrom_add_to_shopcart%26type%3Dmergeorder%26pdp_npi%3D4%2540dis%2521UAH%25216906.15%25212797.01%2521%2521%2521947.06%2521383.56%2521%254021039eb717818102729964205e0ec2%252112000041039284580%2521fus%2521UA%25216069536835%2521X%26trackParams%3D%257B%2522businessScenario%2522%253A%2522choiceV2%2522%252C%2522activityType%2522%253A%2522CHOICE_FREE_SHIPPING%2522%257D%26spm%3Da2g0o.detail.fusionpage.0',
  'https://vyhodadeal.com/deals/naturehike-camping-mattress.png',
  'approved',
  0,
  0,
  now()
)
ON CONFLICT (id) DO NOTHING;
