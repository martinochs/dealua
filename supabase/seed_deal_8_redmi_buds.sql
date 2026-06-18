-- Deal 8: Xiaomi Redmi Buds 4 Lite
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
  '44444444-4444-4444-4444-444444444508',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111101',
  '22222222-2222-2222-2222-222222222204',
  'Xiaomi Redmi Buds 4 Lite — бездротові навушники TWS, Bluetooth 5.3',
  $$Xiaomi Redmi Buds 4 Lite — компактні бездротові навушники TWS з Bluetooth 5.3 для щоденного використання, спорту та подорожей.

Особливості:

• Bluetooth 5.3 — стабільне з'єднання
• Захист IP54 від бризок і поту
• До 20 годин прослуховування з кейсом
• Легкі та зручні для тривалого носіння
• Чіткий звук для музики, дзвінків і подкастів
• Компактний зарядний кейс

💰 Вигідна ціна на AliExpress
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  424.33,
  902.77,
  'https://www.aliexpress.com/item/1005012370663632.html',
  'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005012370663632.html%3Fspm%3Da2g0o.home.pcJustForYou.34.4e826278ddurJr%26gps-id%3DpcJustForYou%26scm%3D1007.13562.416251.0%26scm_id%3D1007.13562.416251.0%26scm-url%3D1007.13562.416251.0%26pvid%3D75b06cdc-27c6-48a2-8b0a-68e893c10af8%26_t%3Dgps-id%253ApcJustForYou%252Cscm-url%253A1007.13562.416251.0%252Cpvid%253A75b06cdc-27c6-48a2-8b0a-68e893c10af8%252Ctpp_buckets%253A668%25232846%25238108%25231977%26pdp_ext_f%3D%257B%2522order%2522%253A%25226039%2522%252C%2522eval%2522%253A%25221%2522%252C%2522orig_sl_item_id%2522%253A%25221005012370663632%2522%252C%2522orig_item_id%2522%253A%25221005009836438015%2522%252C%2522sceneId%2522%253A%25223562%2522%252C%2522fromPage%2522%253A%2522recommend%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%2521902.77%2521424.33%2521%2521%2521123.80%252158.19%2521%254021039eb717818101126047103e0ec2%252112000058284023201%2521rec%2521UA%25216069536835%2521XZ%25211%25210%2521n_tag%253A-29919%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%26utparam-url%3Dscene%253ApcJustForYou%257Cquery_from%253A%257Cx_object_id%253A1005012370663632%257C_p_origin_prod%253A1005009836438015',
  'https://vyhodadeal.com/deals/redmi-buds-4-lite.png',
  'approved',
  0,
  0,
  now()
)
ON CONFLICT (id) DO NOTHING;
