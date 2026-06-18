-- VyhodaDeal: import live deals (1–7) from mock data into Supabase
--
-- Prerequisites (run first):
--   1. supabase/migrations/20260101000000_initial_schema.sql
--   2. supabase/seed_categories_merchants.sql
--   3. Register at least once on vyhodadeal.com (creates a profile row)
--   4. Optional: UPDATE profiles SET role = 'admin' WHERE username = 'your_username';
--
-- Uses the first admin profile, or the first registered user if no admin yet.
-- Run in Supabase SQL Editor. Safe to re-run (ON CONFLICT DO NOTHING).

-- AliExpress merchant (not in default category seed)
INSERT INTO public.merchants (id, name, slug, logo_url, affiliate_base_url)
VALUES (
  '22222222-2222-2222-2222-222222222204',
  'AliExpress',
  'aliexpress',
  null,
  'https://www.aliexpress.com'
)
ON CONFLICT (slug) DO NOTHING;

-- Category / merchant reference:
--   elektronika  11111111-1111-1111-1111-111111111101
--   odyag        11111111-1111-1111-1111-111111111102
--   sport        11111111-1111-1111-1111-111111111105
--   aliexpress   22222222-2222-2222-2222-222222222204

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
) VALUES
(
  '44444444-4444-4444-4444-444444444501',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111101',
  '22222222-2222-2222-2222-222222222204',
  'Casio — чоловічий спортивний військовий годинник, водозахист 50 м',
  $$Надійний та стильний чоловічий годинник Casio, створений для активного способу життя. Поєднує спортивний дизайн, міцний корпус та практичні функції для щоденного використання.

Особливості:

• Відомий японський бренд Casio
• Спортивний та військовий стиль
• Водозахист до 50 метрів
• Міцний корпус і зручний ремінець
• Чіткий та легко читаний циферблат
• Підходить для повсякденного носіння, спорту та активного відпочинку
• Надійний кварцовий механізм

Годинник стане чудовим вибором для чоловіків, які цінують практичність, комфорт та сучасний дизайн.

Стан: новий.

Зв'яжіться для отримання додаткової інформації або оформлення замовлення.$$,
  2023,
  4398,
  'https://www.aliexpress.com/item/1005009567335272.html',
  'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005009567335272.html%3Fspm%3Da2g0o.productlist.main.43.37d673e2CS69IP%26algo_pvid%3De426c7dc-f501-4f0c-9604-9176f5f9c100%26algo_exp_id%3De426c7dc-f501-4f0c-9604-9176f5f9c100-40%26pdp_ext_f%3D%257B%2522order%2522%253A%2522141%2522%252C%2522eval%2522%253A%25221%2522%252C%2522fromPage%2522%253A%2522search%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%25214398.36%25212023.26%2521%2521%2521602.30%2521277.06%2521%2540211b65de17817021398846625e7b9b%252112000049483099719%2521sea%2521UA%25210%2521ABX%25211%25210%2521n_tag%253A-29910%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%26curPageLogUid%3DUVkSVnX9zf6Z%26utparam-url%3Dscene%253Asearch%257Cquery_from%253A%257Cx_object_id%253A1005009567335272%257C_p_origin_prod%253A',
  'https://vyhodadeal.com/deals/casio-watch.png',
  'approved',
  0,
  0,
  now() - interval '7 hours'
),
(
  '44444444-4444-4444-4444-444444444502',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111101',
  '22222222-2222-2222-2222-222222222204',
  'Casio Sport Military — надійний чоловічий годинник для активного способу життя',
  $$✅ Водозахист до 50 метрів
✅ Спортивний та військовий дизайн
✅ Японська якість Casio
✅ Міцний ремінець і корпус
✅ Підходить для щоденного носіння та спорту
✅ Доступно кілька кольорів і моделей

Стильний та практичний годинник, який чудово підійде для роботи, відпочинку та активного способу життя.

💰 Вигідна ціна на AliExpress
👉 Перейдіть за посиланням та оберіть свій варіант.$$,
  1687.63,
  5921.52,
  'https://www.aliexpress.com/item/4000843744583.html',
  'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F4000843744583.html%3FinvitationCode%3DQklkVC85UElNSmwwTDE5a3RMQVAyT1hmUHgxMG9PWHdzbEIwbTlFRmNvV2VQemFTZUJrNWVWT0s1MU1hdTAyWg%26srcSns%3Dsns_WhatsApp%26spreadType%3DsocialShare%26social_params%3D61545889834%26bizType%3DProductDetail%26spreadCode%3DQklkVC85UElNSmwwTDE5a3RMQVAyT1hmUHgxMG9PWHdzbEIwbTlFRmNvV2VQemFTZUJrNWVWT0s1MU1hdTAyWg%26aff_fcid%3D14da9db0a8714eafb21dce10bca06606-1781704844102-06149-_EweDEz4%26tt%3DMG%26aff_fsk%3D_EweDEz4%26aff_platform%3Ddefault%26sk%3D_EweDEz4%26aff_trace_key%3D14da9db0a8714eafb21dce10bca06606-1781704844102-06149-_EweDEz4%26shareId%3D61545889834%26businessType%3DProductDetail%26platform%3DAE%26terminal_id%3D9958bfced5b34a7a95165046056e6ec1%26afSmartRedirect%3Dy%26gatewayAdapt%3Ddeu2glo',
  'https://vyhodadeal.com/deals/casio-digital-watch.png',
  'approved',
  0,
  0,
  now() - interval '6 hours'
),
(
  '44444444-4444-4444-4444-444444444503',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111101',
  '22222222-2222-2222-2222-222222222204',
  'Casio World Time — чоловічий цифровий годинник зі шкіряним ремінцем',
  $$Стильний цифровий годинник Casio World Time з бронзовим корпусом і коричневим шкіряним ремінцем. Ідеальний вибір для тих, хто цінує функціональність та класичний дизайн.

Особливості:

• Функція World Time — світовий час і карта часових поясів
• Водозахист до 100 метрів (WR100M)
• Батарея на 10 років
• Підсвітка Illuminator
• Будильник, секундомір, таймер
• Міцний корпус зі шкіряним ремінцем
• Японська якість Casio

Підходить для щоденного носіння, подорожей та активного способу життя.

💰 Вигідна ціна на AliExpress
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  2609.59,
  5219.17,
  'https://www.aliexpress.com/item/1005009966164200.html',
  'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005009966164200.html%3FinvitationCode%3DQklkVC85UElNSm1RdEduR0pxVzB0ZVhmUHgxMG9PWHdzbEIwbTlFRmNvV2VQemFTZUJrNWVWT0s1MU1hdTAyWg%26srcSns%3Dsns_Copy%26spreadType%3DsocialShare%26social_params%3D61544444090%26bizType%3DProductDetail%26spreadCode%3DQklkVC85UElNSm1RdEduR0pxVzB0ZVhmUHgxMG9PWHdzbEIwbTlFRmNvV2VQemFTZUJrNWVWT0s1MU1hdTAyWg%26aff_fcid%3D0604f69f2d874cb0ba22a0ab411e3d43-1781705572919-03433-_EHKmguw%26tt%3DMG%26aff_fsk%3D_EHKmguw%26aff_platform%3Ddefault%26sk%3D_EHKmguw%26aff_trace_key%3D0604f69f2d874cb0ba22a0ab411e3d43-1781705572919-03433-_EHKmguw%26shareId%3D61544444090%26businessType%3DProductDetail%26platform%3DAE%26terminal_id%3D9958bfced5b34a7a95165046056e6ec1%26afSmartRedirect%3Dy%26gatewayAdapt%3Ddeu2glo',
  'https://vyhodadeal.com/deals/casio-world-time-watch.png',
  'approved',
  0,
  0,
  now() - interval '5 hours'
),
(
  '44444444-4444-4444-4444-444444444504',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111102',
  '22222222-2222-2222-2222-222222222204',
  'Жіночі спортивні шорти — для бігу, фітнесу та йоги',
  $$Зручні жіночі спортивні шорти з високою талією — ідеальні для бігу, велоспорту, фітнесу та йоги.

Особливості:

• Висока талія для комфортної посадки
• Підходять для тренувань, бігу та повсякденного носіння
• Еластичний матеріал, що не обмежує рух
• Стильний спортивний дизайн
• Підходять для залу, йоги та активного відпочинку

💰 Вигідна ціна на AliExpress
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  169.93,
  346.87,
  'https://www.aliexpress.com/item/1005011627508581.html',
  'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005011627508581.html%3Fspm%3Da2g0n.home.msiteJustForYou.13.30696278wIxoHp%26gps-id%3DmsiteJustForYou%26scm%3D1007.33107.376995.0%26scm_id%3D1007.33107.376995.0%26scm-url%3D1007.33107.376995.0%26pvid%3D34466abf-3be9-4ebd-8033-a1494d67ef32%26_t%3Dgps-id%253AmsiteJustForYou%252Cscm-url%253A1007.33107.376995.0%252Cpvid%253A34466abf-3be9-4ebd-8033-a1494d67ef32%252Ctpp_buckets%253A668%25232846%25238108%25231977%26pdp_ext_f%3D%257B%2522order%2522%253A%2522800%2522%252C%2522eval%2522%253A%25221%2522%252C%2522sceneId%2522%253A%252223107%2522%252C%2522fromPage%2522%253A%2522recommend%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%2521335.92%2521164.60%2521%2521%252146.00%252122.54%2521%25400b88ac1917817198623105570e0de4%252112000056095228286%2521rec%2521UA%25216069536835%2521XZ%25211%25210%2521n_tag%253A-29919%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%26utparam-url%3Dscene%253AmsiteJustForYou%257Cquery_from%253A%257Cx_object_id%253A1005011627508581%257C_p_origin_prod%253A%26curPageLogUid%3DLQUZVImdtQy1',
  'https://vyhodadeal.com/deals/womens-sport-shorts.png',
  'approved',
  0,
  0,
  now() - interval '4 hours'
),
(
  '44444444-4444-4444-4444-444444444505',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111102',
  '22222222-2222-2222-2222-222222222204',
  'Жіночий піжамний комплект — топ і шорти з принтом сердечок',
  $$Зручний і стильний домашній комплект для жінок — ідеальний для сну, відпочинку вдома та повсякденного комфорту.

Особливості:

• Комплект: топ + шорти
• М'який приємний матеріал
• V-подібний виріз
• Модний принт із сердечками
• Легкий і комфортний для дому
• Підходить для сну та відпочинку

💰 Вигідна ціна на AliExpress
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  244.42,
  488.84,
  'https://www.aliexpress.com/item/1005010348394629.html',
  'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005010348394629.html%3Fspm%3Da2g0o.detail.pcDetailTopMoreOtherSeller.10.41c60U2N0U2NGu%26gps-id%3DpcDetailTopMoreOtherSeller%26scm%3D1007.40050.354490.0%26scm_id%3D1007.40050.354490.0%26scm-url%3D1007.40050.354490.0%26pvid%3D6bb477ee-ecf3-4e0e-bc2b-80d00766b773%26_t%3Dgps-id%253ApcDetailTopMoreOtherSeller%252Cscm-url%253A1007.40050.354490.0%252Cpvid%253A6bb477ee-ecf3-4e0e-bc2b-80d00766b773%252Ctpp_buckets%253A668%25232846%25238108%25231977%26pdp_ext_f%3D%257B%2522order%2522%253A%25225541%2522%252C%2522eval%2522%253A%25221%2522%252C%2522orig_sl_item_id%2522%253A%25221005010348394629%2522%252C%2522orig_item_id%2522%253A%25221005010487209576%2522%252C%2522sceneId%2522%253A%252230050%2522%252C%2522fromPage%2522%253A%2522recommend%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%2521488.84%2521244.42%2521%2521%252166.94%252133.47%2521%25400b88ac1917817198888386275e0de4%252112000052069300906%2521rec%2521UA%25216069536835%2521XZ%25211%25210%2521n_tag%253A-29919%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%26utparam-url%3Dscene%253ApcDetailTopMoreOtherSeller%257Cquery_from%253A%257Cx_object_id%253A1005010348394629%257C_p_origin_prod%253A1005010487209576',
  'https://vyhodadeal.com/deals/womens-pajama-set.png',
  'approved',
  0,
  0,
  now() - interval '3 hours'
),
(
  '44444444-4444-4444-4444-444444444506',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111105',
  '22222222-2222-2222-2222-222222222204',
  'Жіночі легінси для йоги — висока талія, контроль живота',
  $$Стильні жіночі легінси з ефектом підтягування — ідеальні для йоги, фітнесу, бігу та пілates.

Особливості:

• Висока талія для комфортної посадки
• Контроль живота
• Ефект підтягування
• М'який еластичний матеріал
• Підходять для тренувань і повсякденного носіння
• Зручні для залу, йоги та бігу

💰 Вигідна ціна на AliExpress
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  297.75,
  689.22,
  'https://www.aliexpress.com/item/1005011955705593.html',
  'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005011955705593.html%3Fspm%3Da2g0o.productlist.main.2.53d6JX4KJX4K7J%26algo_pvid%3D61137d48-8629-4d52-8829-cbed06d2c2e5%26algo_exp_id%3D61137d48-8629-4d52-8829-cbed06d2c2e5-1%26pdp_ext_f%3D%257B%2522order%2522%253A%2522215%2522%252C%2522spu_best_type%2522%253A%2522price%2522%252C%2522eval%2522%253A%25221%2522%252C%2522fromPage%2522%253A%2522search%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%2521689.22%2521297.75%2521%2521%252194.38%252140.77%2521%25402103835c17817209066983052ee879%252112000057122241229%2521sea%2521UA%25216069536835%2521X%25211%25210%2521n_tag%253A-29919%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%253BpisId%253A5000000209628224%26curPageLogUid%3DEmz3Sc6r9vPo%26utparam-url%3Dscene%253Asearch%257Cquery_from%253A%257Cx_object_id%253A1005011955705593%257C_p_origin_prod%253A',
  'https://vyhodadeal.com/deals/womens-yoga-leggings.png',
  'approved',
  0,
  0,
  now() - interval '2 hours'
),
(
  '44444444-4444-4444-4444-444444444507',
  (
    SELECT COALESCE(
      (SELECT id FROM public.profiles WHERE role = 'admin' ORDER BY created_at LIMIT 1),
      (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1)
    )
  ),
  '11111111-1111-1111-1111-111111111102',
  '22222222-2222-2222-2222-222222222204',
  'Комплект чоловічих боксерів — 4 штуки, бавовна',
  $$Зручний комплект чоловічих боксерів — практичний вибір для щоденного носіння з м'якої бавовняної тканини.

Особливості:

• Комплект із 4 штук
• М'яка бавовняна тканина
• Комфортна посадка
• Підходять для щоденного носіння
• Практичний набір на кожен день

💰 Вигідна ціна на AliExpress
👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.$$,
  542.54,
  673.37,
  'https://www.aliexpress.com/item/32968499846.html',
  'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F32968499846.html%3Fspm%3Da2g0o.productlist.main.26.7571c3Fwc3Fw06%26utparam-url%3Dscene%253Asearch%257Cquery_from%253Apc_back_same_best%257Cx_object_id%253A32968499846%257C_p_origin_prod%253A%26algo_pvid%3Dcfc82b9f-a778-41ea-a008-f9fc4a2a36cf%26algo_exp_id%3Dcfc82b9f-a778-41ea-a008-f9fc4a2a36cf%26pdp_ext_f%3D%257B%2522order%2522%253A%25226538%2522%252C%2522spu_best_type%2522%253A%2522price%2522%252C%2522fromPage%2522%253A%2522search%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%2521762.61%2521631.76%2521%2521%2521104.43%252186.51%2521%2540211b679917817213595225103d01cc%252112000050317415190%2521sea%2521UA%25216069536835%2521X%25211%25210%2521n_tag%253A-29919%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%253BpisId%253A5000000209636066',
  'https://vyhodadeal.com/deals/mens-boxer-shorts-set.png',
  'approved',
  0,
  0,
  now() - interval '1 hour'
)
ON CONFLICT (id) DO NOTHING;
