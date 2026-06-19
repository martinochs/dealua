-- Deal 11: Inertia gear car kids toy
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
  '44444444-4444-4444-4444-444444444511',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111107',
  '22222222-2222-2222-2222-222222222204',
  'Іграшкова інерційна машинка з шестернями — подарунок для дітей',
  $$Яскрава іграшкова інерційна машинка з механізмом шестерень — весела іграшка для хлопчиків і дівчаток. Потягни назад — і машинка їде вперед.

Особливості:

• Інерційний механізм — їде без батарейок
• Прозорий корпус із видимими шестернями
• Яскравий мультяшний дизайн
• Розвиває моторику та цікавість до механіки
• Чудовий подарунок на день народження
• Підходить для дітей від 3 років

💰 Знижка 75% на AliExpress
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  148.59,
  613.87,
  'https://www.aliexpress.com/item/1005007758475767.html',
  'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005007758475767.html%3Fspm%3Da2g0o.cart.0.0.7e7a795dTyrK7L%26mp%3D1%26sourceType%3D570%26pdp_npi%3D6%2540dis%2521UAH%2521UAH%2B613.87%2521UAH%2B148.59%2521%2521UAH%2B148.59%2521%2521%2521%2540210389a017818616813356137e1117%252112000042110401595%2521ct%2521UA%25216069536835%2521%25211%25210%2521%26pdp_ext_f%3D%257B%2522cart2PdpParams%2522%253A%257B%2522sourceType%2522%253A%2522570%2522%252C%2522cartSource%2522%253A%2522main%2522%257D%257D',
  'https://vyhodadeal.com/deals/kids-gear-car-toy.png',
  'approved',
  0,
  0,
  now()
)
ON CONFLICT (id) DO NOTHING;
