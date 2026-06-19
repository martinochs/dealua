-- Deal 10: Pirate barrel kids game
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
  '44444444-4444-4444-4444-444444444510',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111107',
  '22222222-2222-2222-2222-222222222204',
  'Гра «Піратська бочка» — весела настільна гра для дітей',
  $$Весела гра «Піратська бочка» — класична настільна гра, де потрібно обережно вставляти мечі, не «пробудивши» пірата. Ідеальний подарунок для дітей та сімейного дозвілля.

Особливості:

• Весела гра для дітей і всієї родини
• Розвиває уважність і координацію
• Компактна — зручно брати у гості
• Чудовий подарунок на свято
• Яскравий дизайн у піратському стилі
• Підходить для дітей від 3 років

💰 Знижка 71% на AliExpress
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  140.39,
  484.50,
  'https://www.aliexpress.com/item/1005005948757725.html',
  'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005005948757725.html%3Fspm%3Da2g0o.cart.0.0.7e7a795dTyrK7L%26mp%3D1%26sourceType%3D570%26pdp_npi%3D6%2540dis%2521UAH%2521UAH%2B484.50%2521UAH%2B140.39%2521%2521UAH%2B140.39%2521%2521%2521%2540210389a017818616813356137e1117%252112000034982815781%2521ct%2521UA%25216069536835%2521%25211%25210%2521%26pdp_ext_f%3D%257B%2522cart2PdpParams%2522%253A%257B%2522sourceType%2522%253A%2522570%2522%252C%2522cartSource%2522%253A%2522main%2522%257D%257D',
  'https://vyhodadeal.com/deals/pirate-barrel-toy.png',
  'approved',
  0,
  0,
  now()
)
ON CONFLICT (id) DO NOTHING;
