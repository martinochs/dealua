-- Deal 13: Women's halter satin mini dress
-- Run in Supabase SQL Editor (paste this entire file, not the path).
-- Only your Admitad / rzekl link is needed — AliExpress URL is derived automatically.
-- Safe to re-run (updates deal 13 if it already exists).

WITH deal AS (
  SELECT
    'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005009015429440.html%3Fspm%3Da2g0o.productlist.main.2.45c96sJn6sJnuC%26algo_pvid%3Dd69eebfe-fd79-43b0-8125-8e763fc2da7e%26algo_exp_id%3Dd69eebfe-fd79-43b0-8125-8e763fc2da7e-1%26pdp_ext_f%3D%257B%2522order%2522%253A%2522478%2522%252C%2522spu_best_type%2522%253A%2522price%2522%252C%2522eval%2522%253A%25221%2522%252C%2522fromPage%2522%253A%2522search%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%25211373.00%2521686.50%2521%2521%2521188.48%252194.24%2521%25402103894417818892598344746e996c%252112000056817438568%2521sea%2521UA%25216069536835%2521X%25211%25210%2521n_tag%253A-29919%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%26curPageLogUid%3DOON6X52E5cjw%26utparam-url%3Dscene%253Asearch%257Cquery_from%253A%257Cx_object_id%253A1005009015429440%257C_p_origin_prod%253A' AS affiliate_url
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
  '44444444-4444-4444-4444-444444444513',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111102',
  '22222222-2222-2222-2222-222222222204',
  'Жіноча літня міні-сукня на шийці — атласна, з відкритою спиною',
  $$Стильна літня міні-сукня на шийці з атласної тканини — елегантний варіант для вечірок, прогулянок і святкових подій. Відкрита спина та однотонний дизайн.

Особливості:

• Атласна тканина з елегантним блиском
• Модель на шийці (halter)
• Відкрита спина
• Міні-довжина — стильний літній силует
• Підходить для вечірок і повсякденного образу
• Однотонний універсальний дизайн

💰 Знижка 50% на AliExpress
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  686.50,
  1373.00,
  'https://www.aliexpress.com/item/' || (regexp_match(d.affiliate_url, 'item%2F([0-9]+)'))[1] || '.html',
  d.affiliate_url,
  'https://vyhodadeal.com/deals/womens-halter-mini-dress.png',
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
