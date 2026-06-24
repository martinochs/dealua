-- Deal 29: Florium bulb & tuber roundup — main offer + more offers in description (MyDealz-style)
-- Run in Supabase SQL Editor (paste this entire file, not the path).
-- Safe to re-run (updates deal 29 if it already exists).

INSERT INTO public.merchants (id, name, slug, logo_url, affiliate_base_url)
VALUES (
  '22222222-2222-2222-2222-222222222207',
  'Florium',
  'florium',
  null,
  'https://florium.ua'
)
ON CONFLICT (slug) DO NOTHING;

WITH deal AS (
  SELECT
    'https://dbnua.com/g/pevph8c9odd66b47c306f91bc6a472/?ulp=https%3A%2F%2Fflorium.ua%2Fua%2Ftov-zhorzhini-miks%2F' AS affiliate_url
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
  '44444444-4444-4444-4444-444444444529',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111104',
  '22222222-2222-2222-2222-222222222207',
  'Florium — Жоржини Мікс + ще цибулини | мін. 300 ₴ · доставка 119 ₴ · безкоштовно від 2 000 ₴',
  $$Підбірка цибулин і бульб від Florium.ua — головна пропозиція: Жоржини Мікс (бульби).

Умови Florium:

• Мінімальне замовлення: 300 ₴
• Доставка: 119 ₴
• Безкоштовна доставка від 2 000 ₴

Головна пропозиція — Жоржини Мікс для яскравих клумб і саду.

Особливості:

• Яскравий мікс жоржин — ефектна клумба в сезон
• Якісні бульби від перевіреного продавця
• Ціна 109,99 ₴ (було 549,95 ₴)
• Підходить для висадки в саду та на балконі

💰 Знижка 80% на Florium
👉 Натисніть «Забрати зараз» для головної пропозиції

🔥 Ще пропозиції:

• Фрезія Double Orange (цибулини) — 58 ₴ → https://dbnua.com/g/pevph8c9odd66b47c306f91bc6a472/?ulp=https%3A%2F%2Fflorium.ua%2Fua%2Ftov-frezija-double-orange%2F
• Бегонія Махрова Мікс (бульби) — 262 ₴ → https://dbnua.com/g/pevph8c9odd66b47c306f91bc6a472/?ulp=https%3A%2F%2Fflorium.ua%2Fua%2Ftov-begonija-mahrova-miks%2F
• Ранункулюс Aviv Mix (бульби) — 127 ₴ → https://dbnua.com/g/pevph8c9odd66b47c306f91bc6a472/?ulp=https%3A%2F%2Fflorium.ua%2Fua%2Ftov-ranunkuljus-ljutik-aviv-mix%2F
• Бегонія Cascade Mix (бульби) — 262 ₴ → https://dbnua.com/g/pevph8c9odd66b47c306f91bc6a472/?ulp=https%3A%2F%2Fflorium.ua%2Fua%2Ftov-begonija-cascade-mix%2F
• Конвалія Hardwick Hall (кореневища) — 112 ₴ → https://dbnua.com/g/pevph8c9odd66b47c306f91bc6a472/?ulp=https%3A%2F%2Fflorium.ua%2Fua%2Ftov-landysh-hardwick-hall%2F$$,
  109.99,
  549.95,
  'https://florium.ua/ua/tov-zhorzhini-miks/',
  d.affiliate_url,
  'https://vyhodadeal.com/deals/florium-zhorzhini-miks.jpg',
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
