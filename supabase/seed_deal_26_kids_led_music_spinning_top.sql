-- Deal 26: Kids LED music spinning top (AliExpress)
-- Run in Supabase SQL Editor (paste this entire file, not the path).
-- Safe to re-run (updates deal 26 if it already exists).

WITH deal AS (
  SELECT
    'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005005641392776.html%3Fpdp_ext_f%3D%257B%2522sku_id%2522%253A%252212000033860791952%2522%257D%26sourceType%3D1%26spm%3Da2g0o.wish-manage-home.0.0%26dp%3Dcdf2629b209138ffc60e6df93987fa21%26af%3D2541698%26cv%3D47843%26afref%3D%26mall_affr%3Dpr3%26utm_source%3Dadmitad%26utm_medium%3Dcpa%26utm_campaign%3D2541698%26utm_content%3D47843%26dp%3Dcdf2629b209138ffc60e6df93987fa21%26af%3D2541698%26cv%3D47843%26afref%3D%26mall_affr%3Dpr3%26utm_source%3Dadmitad%26utm_medium%3Dcpa%26utm_campaign%3D2541698%26utm_content%3D47843%26aff_fcid%3D1558ce5304254106afe2fe7e75ec1f88-1782328783179-06315-_ePNSNV%26aff_fsk%3D_ePNSNV%26aff_platform%3Dportals-tool%26sk%3D_ePNSNV%26aff_trace_key%3D1558ce5304254106afe2fe7e75ec1f88-1782328783179-06315-_ePNSNV%26terminal_id%3D24059a455d5a4e34859882c89e70522a%26afSmartRedirect%3Dy' AS affiliate_url
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
  '44444444-4444-4444-4444-444444444526',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111107',
  '22222222-2222-2222-2222-222222222204',
  'Дитячий LED-дзигуш з музикою та світлом — іграшка-подарунок',
  $$Класичний магічний дзигуш з LED-підсвіткою та музикою — яскрава іграшка для дітей, ідеальна як подарунок хлопчикам на день народження чи свято.

Особливості:

• Натискаєш зверху — дзигуш крутиться
• Світиться та грає музику під час обертання
• Легкий і компактний — зручно брати з собою
• Міцний корпус з ABS — безпечний для дітей
• Приваблює увагу яскравим LED-ефектом
• Чудовий подарунок для дітей від 3 років

💰 Вигідна ціна на AliExpress
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  175.29,
  412.80,
  'https://www.aliexpress.com/item/1005005641392776.html',
  d.affiliate_url,
  'https://vyhodadeal.com/deals/kids-led-music-spinning-top.jpg',
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
