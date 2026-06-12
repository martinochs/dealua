-- Demo seed data for DealUA MVP
-- Run after migrations. Requires auth.users entries for demo users OR adjust user_ids after registration.

-- Categories
INSERT INTO public.categories (id, slug, name_uk, icon, sort_order) VALUES
  ('11111111-1111-1111-1111-111111111101', 'elektronika', 'Електроніка', '📱', 1),
  ('11111111-1111-1111-1111-111111111102', 'odyag', 'Одяг', '👕', 2),
  ('11111111-1111-1111-1111-111111111103', 'produkty', 'Продукти', '🛒', 3),
  ('11111111-1111-1111-1111-111111111104', 'dim-i-sad', 'Дім і сад', '🏡', 4),
  ('11111111-1111-1111-1111-111111111105', 'sport', 'Спорт', '⚽', 5),
  ('11111111-1111-1111-1111-111111111106', 'krasa', 'Краса', '💄', 6),
  ('11111111-1111-1111-1111-111111111107', 'diti', 'Дитячі товари', '🧸', 7),
  ('11111111-1111-1111-1111-111111111108', 'podorozhi', 'Подорожі', '✈️', 8)
ON CONFLICT (slug) DO NOTHING;

-- Merchants
INSERT INTO public.merchants (id, name, slug, logo_url, affiliate_base_url) VALUES
  ('22222222-2222-2222-2222-222222222201', 'Rozetka', 'rozetka', 'https://logo.clearbit.com/rozetka.com.ua', 'https://rozetka.com.ua'),
  ('22222222-2222-2222-2222-222222222202', 'Prom', 'prom', 'https://logo.clearbit.com/prom.ua', 'https://prom.ua'),
  ('22222222-2222-2222-2222-222222222203', 'Comfy', 'comfy', 'https://logo.clearbit.com/comfy.ua', 'https://comfy.ua')
ON CONFLICT (slug) DO NOTHING;

-- Demo profiles (requires matching auth.users — create via Supabase dashboard or register in app)
-- Admin: demo@dealua.local / password123 — then run:
-- UPDATE profiles SET role = 'admin' WHERE username = 'admin';
INSERT INTO public.profiles (id, username, role) VALUES
  ('33333333-3333-3333-3333-333333333301', 'admin', 'admin'),
  ('33333333-3333-3333-3333-333333333302', 'dealmaster', 'user')
ON CONFLICT (id) DO NOTHING;

-- Approved deals
INSERT INTO public.deals (id, user_id, category_id, merchant_id, title, description, price_uah, original_price_uah, external_url, image_url, status, hot_count, cold_count, created_at) VALUES
  ('44444444-4444-4444-4444-444444444401', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222201', 'Samsung Galaxy A55 128GB', 'Смартфон Samsung Galaxy A55 з AMOLED екраном 6.6", камерою 50MP та батареєю 5000 mAh. Чудова ціна для флагманського середнього класу.', 14999, 18999, 'https://rozetka.com.ua/ua/samsung-galaxy-a55/', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', 'approved', 42, 3, now() - interval '2 hours'),
  ('44444444-4444-4444-4444-444444444402', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222203', 'Навушники Sony WH-1000XM5', 'Бездротові навушники з активним шумопоглинанням. Найкращий звук у класі.', 9999, 12999, 'https://comfy.ua/ua/sony-wh1000xm5/', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 'approved', 38, 2, now() - interval '5 hours'),
  ('44444444-4444-4444-4444-444444444403', '33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111102', '22222222-2222-2222-2222-222222222202', 'Кросівки Nike Air Max 90', 'Класичні кросівки Nike Air Max 90 у чорному кольорі. Розпродаж сезону.', 3299, 5499, 'https://prom.ua/Nike-Air-Max-90', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 'approved', 25, 5, now() - interval '8 hours'),
  ('44444444-4444-4444-4444-444444444404', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111103', '22222222-2222-2222-2222-222222222201', 'Кава Lavazza Qualità Oro 1кг', 'Італійська кава Lavazza у зернах. Одна з найкращих цін на Rozetka.', 549, 799, 'https://rozetka.com.ua/ua/lavazza-qualita-oro/', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400', 'approved', 18, 1, now() - interval '12 hours'),
  ('44444444-4444-4444-4444-444444444405', '33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111104', '22222222-2222-2222-2222-222222222201', 'Робот-пилосос Xiaomi Mi Robot Vacuum', 'Робот-пилосос з лазерною навігацією та потужним всмоктуванням 4000Pa.', 7999, 11999, 'https://rozetka.com.ua/ua/xiaomi-robot-vacuum/', 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400', 'approved', 31, 4, now() - interval '1 day'),
  ('44444444-4444-4444-4444-444444444406', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111105', '22222222-2222-2222-2222-222222222202', 'Йога-мат ProForm 6мм', 'Нескользкий йога-мат з TPE матеріалу. Ідеальний для домашніх тренувань.', 399, 699, 'https://prom.ua/yoga-mat-proform', 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', 'approved', 12, 0, now() - interval '1 day'),
  ('44444444-4444-4444-4444-444444444407', '33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111106', '22222222-2222-2222-2222-222222222203', 'Набір косметики The Ordinary', 'Повний набір засобів The Ordinary для догляду за шкірою.', 1899, 2799, 'https://comfy.ua/ua/the-ordinary-set/', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400', 'approved', 22, 2, now() - interval '2 days'),
  ('44444444-4444-4444-4444-444444444408', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111107', '22222222-2222-2222-2222-222222222201', 'LEGO City Fire Station', 'Конструктор LEGO City Пожежна станція, 1029 деталей.', 2499, 3999, 'https://rozetka.com.ua/ua/lego-city-fire/', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400', 'approved', 15, 1, now() - interval '2 days'),
  ('44444444-4444-4444-4444-444444444409', '33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111108', '22222222-2222-2222-2222-222222222202', 'Чемодан Samsonite 75см', 'Легкий полікарбонатний чемодан Samsonite з TSA замком.', 4599, 6999, 'https://prom.ua/samsonite-75cm', 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400', 'approved', 9, 0, now() - interval '3 days'),
  ('44444444-4444-4444-4444-444444444410', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222201', 'MacBook Air M2 256GB', 'Apple MacBook Air з чипом M2, 8GB RAM, 256GB SSD. Рідкісна знижка.', 38999, 44999, 'https://rozetka.com.ua/ua/macbook-air-m2/', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', 'approved', 55, 8, now() - interval '4 hours'),
  ('44444444-4444-4444-4444-444444444411', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222203', 'Телевізор LG OLED 55"', 'LG OLED55C3 з AI процесором α9 Gen6. Ідеальний чорний та HDR.', 32999, 42999, 'https://comfy.ua/ua/lg-oled55c3/', 'https://images.unsplash.com/photo-1593359673509-e6ba3bb5a4f0?w=400', 'approved', 47, 6, now() - interval '6 hours'),
  ('44444444-4444-4444-4444-444444444412', '33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111103', '22222222-2222-2222-2222-222222222201', 'Оливкова олія Borges Extra Virgin 1л', 'Іспанська оливкова олія Extra Virgin. Акція -30%.', 299, 429, 'https://rozetka.com.ua/ua/borges-olive-oil/', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', 'approved', 8, 0, now() - interval '3 days'),
  ('44444444-4444-4444-4444-444444444413', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111102', '22222222-2222-2222-2222-222222222202', 'Зимова куртка Columbia', 'Тепла зимова куртка Columbia з Omni-Heat технологією.', 4999, 7999, 'https://prom.ua/columbia-winter-jacket', 'https://images.unsplash.com/photo-1551028711-00167b16eac5?w=400', 'approved', 20, 3, now() - interval '1 day'),
  ('44444444-4444-4444-4444-444444444414', '33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111104', '22222222-2222-2222-2222-222222222201', 'Кавомашина De''Longhi Magnifica S', 'Автоматична кавомашина з капучинатором. Ідеальна для дому.', 12999, 16999, 'https://rozetka.com.ua/ua/delonghi-magnifica/', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', 'approved', 28, 2, now() - interval '18 hours'),
  ('44444444-4444-4444-4444-444444444415', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111105', '22222222-2222-2222-2222-222222222203', 'Велосипед Giant ATX 3', 'Гірський велосипед Giant ATX 3 2024. Розмір рами M/L.', 15999, 19999, 'https://comfy.ua/ua/giant-atx3/', 'https://images.unsplash.com/photo-1485965120180-e8d882698281?w=400', 'approved', 14, 1, now() - interval '2 days'),
  ('44444444-4444-4444-4444-444444444416', '33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111106', '22222222-2222-2222-2222-222222222201', 'Електрична зубна щітка Oral-B iO9', 'Преміум зубна щітка з AI та 7 режимами чищення.', 5999, 8499, 'https://rozetka.com.ua/ua/oral-b-io9/', 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400', 'approved', 11, 0, now() - interval '3 days'),
  ('44444444-4444-4444-4444-444444444417', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111107', '22222222-2222-2222-2222-222222222202', 'Дитячий велосипед Strider 12"', 'Баланс-байк Strider для дітей 2-5 років. Легкий алюмінієвий.', 3499, 4499, 'https://prom.ua/strider-12', 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=400', 'approved', 7, 0, now() - interval '4 days'),
  ('44444444-4444-4444-4444-444444444418', '33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111108', '22222222-2222-2222-2222-222222222201', 'Powerbank Anker 20000mAh 65W', 'Потужний powerbank Anker з швидкою зарядкою USB-C PD.', 1899, 2499, 'https://rozetka.com.ua/ua/anker-20000/', 'https://images.unsplash.com/photo-1609091839311-9bad316092a8?w=400', 'approved', 33, 2, now() - interval '10 hours'),
  ('44444444-4444-4444-4444-444444444419', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222203', 'Ігрова консоль PlayStation 5 Slim', 'Sony PS5 Slim з дисковим приводом. В наявності!', 18999, 22999, 'https://comfy.ua/ua/ps5-slim/', 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400', 'approved', 61, 5, now() - interval '3 hours'),
  ('44444444-4444-4444-4444-444444444420', '33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111103', '22222222-2222-2222-2222-222222222201', 'Набір посуду Tefal Ingenio 15 предметів', 'Антипригарний набір посуду Tefal зі знімними ручками.', 3999, 5999, 'https://rozetka.com.ua/ua/tefal-ingenio/', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d4046?w=400', 'approved', 16, 1, now() - interval '2 days')
ON CONFLICT (id) DO NOTHING;

-- Pending deals for admin queue
INSERT INTO public.deals (id, user_id, category_id, merchant_id, title, description, price_uah, original_price_uah, external_url, image_url, status, hot_count, cold_count) VALUES
  ('55555555-5555-5555-5555-555555555501', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222201', 'iPad Air M2 64GB', 'Новий iPad Air з чипом M2. Чекає на модерацію.', 21999, 25999, 'https://rozetka.com.ua/ua/ipad-air-m2/', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', 'pending', 0, 0),
  ('55555555-5555-5555-5555-555555555502', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111102', '22222222-2222-2222-2222-222222222202', 'Кросівки Adidas Ultraboost', 'Adidas Ultraboost 23 у білому кольорі.', 3999, 5999, 'https://prom.ua/adidas-ultraboost', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', 'pending', 0, 0),
  ('55555555-5555-5555-5555-555555555503', '33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111104', '22222222-2222-2222-2222-222222222203', 'Мікрохвильова піч Samsung', 'Мікрохвильова піч Samsung 23л з грилем.', 2999, 3999, 'https://comfy.ua/ua/samsung-microwave/', 'https://images.unsplash.com/photo-1585659722983-3b344a8e9139?w=400', 'pending', 0, 0),
  ('55555555-5555-5555-5555-555555555504', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111105', '22222222-2222-2222-2222-222222222201', 'Гантелі 2x10кг', 'Набір гантелей по 10кг з неопреновим покриттям.', 899, 1299, 'https://rozetka.com.ua/ua/dumbbells-10kg/', 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400', 'pending', 0, 0),
  ('55555555-5555-5555-5555-555555555505', '33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111106', '22222222-2222-2222-2222-222222222202', 'Parfum Dior Sauvage 100ml', 'Оригінальний Dior Sauvage Eau de Parfum.', 3499, 4999, 'https://prom.ua/dior-sauvage', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', 'pending', 0, 0)
ON CONFLICT (id) DO NOTHING;

-- Sample comments
INSERT INTO public.comments (deal_id, user_id, body, created_at) VALUES
  ('44444444-4444-4444-4444-444444444401', '33333333-3333-3333-3333-333333333301', 'Чудова ціна! Брав місяць тому дорожче.', now() - interval '1 hour'),
  ('44444444-4444-4444-4444-444444444401', '33333333-3333-3333-3333-333333333302', 'Підтверджую, найнижча ціна на ринку.', now() - interval '30 minutes'),
  ('44444444-4444-4444-4444-444444444410', '33333333-3333-3333-3333-333333333301', 'MacBook за таку ціну — must have!', now() - interval '2 hours'),
  ('44444444-4444-4444-4444-444444444419', '33333333-3333-3333-3333-333333333302', 'PS5 нарешті в наявності, брав одразу.', now() - interval '1 hour')
ON CONFLICT DO NOTHING;
