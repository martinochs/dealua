-- Deal 28: Smart fitness band — heart rate, blood pressure (AliExpress)
-- Run in Supabase SQL Editor (paste this entire file, not the path).
-- Safe to re-run (updates deal 28 if it already exists).

WITH deal AS (
  SELECT
    'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005009880251667.html%3Fspm%3Da2g0o.productlist.main.33.3d10W0YxW0YxBv%26algo_pvid%3D4b772ee6-d6a4-4bb4-ba8e-c0bd693e13a8%26algo_exp_id%3D4b772ee6-d6a4-4bb4-ba8e-c0bd693e13a8-32%26pdp_ext_f%3D%257B%2522order%2522%253A%252229%2522%252C%2522eval%2522%253A%25221%2522%252C%2522fromPage%2522%253A%2522search%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%2521488.43%2521244.22%2521%2521%252167.28%252133.64%2521%2540211b65de17823295973595510ee12b%252112000050460458946%2521sea%2521UA%25216069536835%2521X%25211%25210%2521n_tag%253A-29919%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%26curPageLogUid%3Dx1vClbe7dJ0W%26utparam-url%3Dscene%253Asearch%257Cquery_from%253A%257Cx_object_id%253A1005009880251667%257C_p_origin_prod%253A%23nav-specification' AS affiliate_url
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
  '44444444-4444-4444-4444-444444444528',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111101',
  '22222222-2222-2222-2222-222222222204',
  'Розумний фітнес-браслет 10 шт. — пульс, тиск, водостійкий',
  $$Розумний спортивний браслет для чоловіків і жінок — моніторинг пульсу та артеріального тиску, водостійкий корпус і багатофункціональний цифровий дисплей.

Особливості:

• Комплект 10 штук — вигідна ціна за набір
• Вимірювання пульсу та артеріального тиску
• Водостійкий — підходить для спорту та дощової погоди
• Багатофункціональний смарт-браслет для фітнесу
• Підходить для чоловіків і жінок
• Зручний для бігу, тренувань і щоденного носіння
• Економія 244 ₴ від 488 ₴

💰 Знижка 50% на AliExpress
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  244.22,
  488.43,
  'https://www.aliexpress.com/item/1005009880251667.html',
  d.affiliate_url,
  'https://vyhodadeal.com/deals/smart-fitness-band-heart-rate-waterproof.jpg',
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
