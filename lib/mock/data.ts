import type {
  Category,
  CommentWithProfile,
  DealWithRelations,
  Merchant,
  Profile,
} from "@/types/database";
import { resolveDealLinksFromAffiliate } from "@/lib/affiliate-links";

const DEAL_13_AFFILIATE =
  "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005009015429440.html%3Fspm%3Da2g0o.productlist.main.2.45c96sJn6sJnuC%26algo_pvid%3Dd69eebfe-fd79-43b0-8125-8e763fc2da7e%26algo_exp_id%3Dd69eebfe-fd79-43b0-8125-8e763fc2da7e-1%26pdp_ext_f%3D%257B%2522order%2522%253A%2522478%2522%252C%2522spu_best_type%2522%253A%2522price%2522%252C%2522eval%2522%253A%25221%2522%252C%2522fromPage%2522%253A%2522search%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%25211373.00%2521686.50%2521%2521%2521188.48%252194.24%2521%25402103894417818892598344746e996c%252112000056817438568%2521sea%2521UA%25216069536835%2521X%25211%25210%2521n_tag%253A-29919%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%26curPageLogUid%3DOON6X52E5cjw%26utparam-url%3Dscene%253Asearch%257Cquery_from%253A%257Cx_object_id%253A1005009015429440%257C_p_origin_prod%253A";

const deal13Links = (() => {
  const links = resolveDealLinksFromAffiliate(DEAL_13_AFFILIATE);
  if ("error" in links) throw new Error(links.error);
  return links;
})();

const DEAL_14_AFFILIATE =
  "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005011872113011.html%3Fspm%3Da2g0o.productlist.main.58.45c96sJn6sJnuC%26algo_pvid%3Dd69eebfe-fd79-43b0-8125-8e763fc2da7e%26algo_exp_id%3Dd69eebfe-fd79-43b0-8125-8e763fc2da7e-57%26pdp_ext_f%3D%257B%2522order%2522%253A%2522122%2522%252C%2522eval%2522%253A%25221%2522%252C%2522fromPage%2522%253A%2522search%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%25213439.42%25211513.37%2521%2521%2521472.15%2521207.75%2521%25402103894417818892598344746e996c%252112000056845198081%2521sea%2521UA%25216069536835%2521X%25211%25210%2521n_tag%253A-29919%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%26curPageLogUid%3Ddb2jN03O0GAl%26utparam-url%3Dscene%253Asearch%257Cquery_from%253A%257Cx_object_id%253A1005011872113011%257C_p_origin_prod%253A";

const deal14Links = (() => {
  const links = resolveDealLinksFromAffiliate(DEAL_14_AFFILIATE);
  if ("error" in links) throw new Error(links.error);
  return links;
})();

const DEAL_7_AFFILIATE =
  "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F32968499846.html";

const deal7Links = (() => {
  const links = resolveDealLinksFromAffiliate(DEAL_7_AFFILIATE);
  if ("error" in links) throw new Error(links.error);
  return links;
})();

const DEAL_15_AFFILIATE =
  "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005006979659713.html%3Fpdp_ext_f%3D%257B%2522sku_id%2522%253A%252212000038923976371%2522%257D%26sourceType%3D1%26spm%3Da2g0o.wish-manage-home.0.0";

const deal15Links = (() => {
  const links = resolveDealLinksFromAffiliate(DEAL_15_AFFILIATE);
  if ("error" in links) throw new Error(links.error);
  return links;
})();

const DEAL_16_AFFILIATE =
  "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005008100613059.html%3Fpdp_ext_f%3D%257B%2522sku_id%2522%253A%252212000043746262168%2522%257D%26sourceType%3D1%26spm%3Da2g0o.wish-manage-home.0.0";

const deal16Links = (() => {
  const links = resolveDealLinksFromAffiliate(DEAL_16_AFFILIATE);
  if ("error" in links) throw new Error(links.error);
  return links;
})();

const DEAL_17_AFFILIATE =
  "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005012276991058.html%3Fpdp_ext_f%3D%257B%2522sku_id%2522%253A%252212000057967448712%2522%257D%26sourceType%3D1%26spm%3Da2g0o.wish-manage-home.0.0";

const deal17Links = (() => {
  const links = resolveDealLinksFromAffiliate(DEAL_17_AFFILIATE);
  if ("error" in links) throw new Error(links.error);
  return links;
})();

const DEAL_18_AFFILIATE =
  "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005009313552383.html%3Fpdp_ext_f%3D%257B%2522sku_id%2522%253A%252212000048715594442%2522%257D%26sourceType%3D1%26spm%3Da2g0o.wish-manage-home.0.0";

const deal18Links = (() => {
  const links = resolveDealLinksFromAffiliate(DEAL_18_AFFILIATE);
  if ("error" in links) throw new Error(links.error);
  return links;
})();

const DEAL_19_AFFILIATE =
  "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005007619948310.html%3Fpdp_ext_f%3D%257B%2522sku_id%2522%253A%252212000041529798277%2522%257D%26sourceType%3D1%26spm%3Da2g0o.wish-manage-home.0.0";

const deal19Links = (() => {
  const links = resolveDealLinksFromAffiliate(DEAL_19_AFFILIATE);
  if ("error" in links) throw new Error(links.error);
  return links;
})();

const DEAL_20_AFFILIATE =
  "https://wbbsv.com/g/ynys1f2mjpd66b47c3060e81904d8b/?ulp=https%3A%2F%2Ftouch.com.ua%2Fua%2Fitem%2Figrovaya-konsol-sony-playstation-5-slim-1tb-call-of-duty-black-ops-6-bundle-1000049595-utsenka168364%2F";

const deal20Links = (() => {
  const links = resolveDealLinksFromAffiliate(DEAL_20_AFFILIATE);
  if ("error" in links) throw new Error(links.error);
  return links;
})();

const DEAL_21_AFFILIATE =
  "https://wbbsv.com/g/ynys1f2mjpd66b47c3060e81904d8b/?ulp=https%3A%2F%2Ftouch.com.ua%2Fua%2Fitem%2Fnintendo-switch-oled-model-the-legend-of-zelda-tears-of-the-kingdom-edition-portativnaya-igrovaya-pr%2F";

const deal21Links = (() => {
  const links = resolveDealLinksFromAffiliate(DEAL_21_AFFILIATE);
  if ("error" in links) throw new Error(links.error);
  return links;
})();

const DEAL_22_AFFILIATE =
  "https://hxbok.com/g/h29o15jdr6d66b47c306a76d99edd2/?ulp=https%3A%2F%2Fanswear.ua%2Fp%2Fbigovi-krosivky-hoka-mafate-speed-2-kolir-chornyj-1126851-1538050";

const deal22Links = (() => {
  const links = resolveDealLinksFromAffiliate(DEAL_22_AFFILIATE);
  if ("error" in links) throw new Error(links.error);
  return links;
})();

const DEAL_23_AFFILIATE =
  "https://hxbok.com/g/h29o15jdr6d66b47c306a76d99edd2/?ulp=https%3A%2F%2Fanswear.ua%2Fp%2Fbigovi-krosivky-hoka-mafate-speed-2-kolir-zelenyj-1126851-1303762";

const deal23Links = (() => {
  const links = resolveDealLinksFromAffiliate(DEAL_23_AFFILIATE);
  if ("error" in links) throw new Error(links.error);
  return links;
})();

const DEAL_24_AFFILIATE =
  "https://hxbok.com/g/h29o15jdr6d66b47c306a76d99edd2/?ulp=https%3A%2F%2Fanswear.ua%2Fp%2Fkrosivky-dlya-trenuvan-adidas-performance-rapidmove-pro-trainer-kolir-bilyj-jp8783-1686300";

const deal24Links = (() => {
  const links = resolveDealLinksFromAffiliate(DEAL_24_AFFILIATE);
  if ("error" in links) throw new Error(links.error);
  return links;
})();

const DEAL_25_AFFILIATE = DEAL_23_AFFILIATE;

const deal25Links = (() => {
  const links = resolveDealLinksFromAffiliate(DEAL_25_AFFILIATE);
  if ("error" in links) throw new Error(links.error);
  return links;
})();

const DEAL_26_AFFILIATE =
  "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005005641392776.html%3Fpdp_ext_f%3D%257B%2522sku_id%2522%253A%252212000033860791952%2522%257D%26sourceType%3D1%26spm%3Da2g0o.wish-manage-home.0.0%26dp%3Dcdf2629b209138ffc60e6df93987fa21%26af%3D2541698%26cv%3D47843%26afref%3D%26mall_affr%3Dpr3%26utm_source%3Dadmitad%26utm_medium%3Dcpa%26utm_campaign%3D2541698%26utm_content%3D47843%26dp%3Dcdf2629b209138ffc60e6df93987fa21%26af%3D2541698%26cv%3D47843%26afref%3D%26mall_affr%3Dpr3%26utm_source%3Dadmitad%26utm_medium%3Dcpa%26utm_campaign%3D2541698%26utm_content%3D47843%26aff_fcid%3D1558ce5304254106afe2fe7e75ec1f88-1782328783179-06315-_ePNSNV%26aff_fsk%3D_ePNSNV%26aff_platform%3Dportals-tool%26sk%3D_ePNSNV%26aff_trace_key%3D1558ce5304254106afe2fe7e75ec1f88-1782328783179-06315-_ePNSNV%26terminal_id%3D24059a455d5a4e34859882c89e70522a%26afSmartRedirect%3Dy";

const deal26Links = (() => {
  const links = resolveDealLinksFromAffiliate(DEAL_26_AFFILIATE);
  if ("error" in links) throw new Error(links.error);
  return links;
})();

export const MOCK_PROFILES: Profile[] = [
  {
    id: "user-1",
    username: "VyhodaDeal Team",
    avatar_url: null,
    role: "user",
    created_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "user-2",
    username: "admin",
    avatar_url: null,
    role: "admin",
    created_at: "2025-01-01T00:00:00Z",
  },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: "cat-1", slug: "elektronika", name_uk: "Електроніка", icon: "📱", sort_order: 1, is_active: true },
  { id: "cat-2", slug: "odyag", name_uk: "Одяг", icon: "👕", sort_order: 2, is_active: true },
  { id: "cat-3", slug: "produkty", name_uk: "Продукти", icon: "🛒", sort_order: 3, is_active: true },
  { id: "cat-4", slug: "dim-i-sad", name_uk: "Дім і сад", icon: "🏡", sort_order: 4, is_active: true },
  { id: "cat-5", slug: "sport", name_uk: "Спорт", icon: "⚽", sort_order: 5, is_active: true },
  { id: "cat-6", slug: "krasa", name_uk: "Краса", icon: "💄", sort_order: 6, is_active: true },
  { id: "cat-7", slug: "diti", name_uk: "Дитячі товари", icon: "🧸", sort_order: 7, is_active: true },
  { id: "cat-8", slug: "podorozhi", name_uk: "Подорожі", icon: "✈️", sort_order: 8, is_active: true },
];

export const MOCK_MERCHANTS: Merchant[] = [
  { id: "merch-1", name: "Rozetka", slug: "rozetka", logo_url: null, affiliate_base_url: "https://rozetka.com.ua" },
  { id: "merch-2", name: "Prom", slug: "prom", logo_url: null, affiliate_base_url: "https://prom.ua" },
  { id: "merch-3", name: "Comfy", slug: "comfy", logo_url: null, affiliate_base_url: "https://comfy.ua" },
  { id: "merch-4", name: "AliExpress", slug: "aliexpress", logo_url: null, affiliate_base_url: "https://www.aliexpress.com" },
  { id: "merch-5", name: "TOUCH", slug: "touch", logo_url: null, affiliate_base_url: "https://touch.com.ua" },
  { id: "merch-6", name: "Answear", slug: "answear", logo_url: null, affiliate_base_url: "https://answear.ua" },
];

const hoursAgo = (h: number) => new Date(Date.now() - h * 3600000).toISOString();

export const MOCK_DEALS: DealWithRelations[] = [
  {
    id: "deal-1",
    user_id: "user-1",
    category_id: "cat-1",
    merchant_id: "merch-4",
    title: "Casio — чоловічий спортивний військовий годинник, водозахист 50 м",
    description:
      "Надійний та стильний чоловічий годинник Casio, створений для активного способу життя. Поєднує спортивний дизайн, міцний корпус та практичні функції для щоденного використання.\n\nОсобливості:\n\n• Відомий японський бренд Casio\n• Спортивний та військовий стиль\n• Водозахист до 50 метрів\n• Міцний корпус і зручний ремінець\n• Чіткий та легко читаний циферблат\n• Підходить для повсякденного носіння, спорту та активного відпочинку\n• Надійний кварцовий механізм\n\nГодинник стане чудовим вибором для чоловіків, які цінують практичність, комфорт та сучасний дизайн.\n\nСтан: новий.\n\nЗв'яжіться для отримання додаткової інформації або оформлення замовлення.",
    price_uah: 2023,
    original_price_uah: 4398,
    external_url: "https://www.aliexpress.com/item/1005009567335272.html",
    affiliate_url:
      "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005009567335272.html%3Fspm%3Da2g0o.productlist.main.43.37d673e2CS69IP%26algo_pvid%3De426c7dc-f501-4f0c-9604-9176f5f9c100%26algo_exp_id%3De426c7dc-f501-4f0c-9604-9176f5f9c100-40%26pdp_ext_f%3D%257B%2522order%2522%253A%2522141%2522%252C%2522eval%2522%253A%25221%2522%252C%2522fromPage%2522%253A%2522search%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%25214398.36%25212023.26%2521%2521%2521602.30%2521277.06%2521%2540211b65de17817021398846625e7b9b%252112000049483099719%2521sea%2521UA%25210%2521ABX%25211%25210%2521n_tag%253A-29910%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%26curPageLogUid%3DUVkSVnX9zf6Z%26utparam-url%3Dscene%253Asearch%257Cquery_from%253A%257Cx_object_id%253A1005009567335272%257C_p_origin_prod%253A",
    image_url: "/deals/casio-watch.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(1),
    category: { slug: "elektronika", name_uk: "Електроніка", icon: "📱" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-2",
    user_id: "user-1",
    category_id: "cat-1",
    merchant_id: "merch-4",
    title: "Casio Sport Military — надійний чоловічий годинник для активного способу життя",
    description:
      "✅ Водозахист до 50 метрів\n✅ Спортивний та військовий дизайн\n✅ Японська якість Casio\n✅ Міцний ремінець і корпус\n✅ Підходить для щоденного носіння та спорту\n✅ Доступно кілька кольорів і моделей\n\nСтильний та практичний годинник, який чудово підійде для роботи, відпочинку та активного способу життя.\n\n💰 Вигідна ціна на AliExpress\n👉 Перейдіть за посиланням та оберіть свій варіант.",
    price_uah: 1687.63,
    original_price_uah: 5921.52,
    external_url: "https://www.aliexpress.com/item/4000843744583.html",
    affiliate_url:
      "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F4000843744583.html%3FinvitationCode%3DQklkVC85UElNSmwwTDE5a3RMQVAyT1hmUHgxMG9PWHdzbEIwbTlFRmNvV2VQemFTZUJrNWVWT0s1MU1hdTAyWg%26srcSns%3Dsns_WhatsApp%26spreadType%3DsocialShare%26social_params%3D61545889834%26bizType%3DProductDetail%26spreadCode%3DQklkVC85UElNSmwwTDE5a3RMQVAyT1hmUHgxMG9PWHdzbEIwbTlFRmNvV2VQemFTZUJrNWVWT0s1MU1hdTAyWg%26aff_fcid%3D14da9db0a8714eafb21dce10bca06606-1781704844102-06149-_EweDEz4%26tt%3DMG%26aff_fsk%3D_EweDEz4%26aff_platform%3Ddefault%26sk%3D_EweDEz4%26aff_trace_key%3D14da9db0a8714eafb21dce10bca06606-1781704844102-06149-_EweDEz4%26shareId%3D61545889834%26businessType%3DProductDetail%26platform%3DAE%26terminal_id%3D9958bfced5b34a7a95165046056e6ec1%26afSmartRedirect%3Dy%26gatewayAdapt%3Ddeu2glo",
    image_url: "/deals/casio-digital-watch.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.5),
    category: { slug: "elektronika", name_uk: "Електроніка", icon: "📱" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-3",
    user_id: "user-1",
    category_id: "cat-1",
    merchant_id: "merch-4",
    title: "Casio World Time — чоловічий цифровий годинник зі шкіряним ремінцем",
    description:
      "Стильний цифровий годинник Casio World Time з бронзовим корпусом і коричневим шкіряним ремінцем. Ідеальний вибір для тих, хто цінує функціональність та класичний дизайн.\n\nОсобливості:\n\n• Функція World Time — світовий час і карта часових поясів\n• Водозахист до 100 метрів (WR100M)\n• Батарея на 10 років\n• Підсвітка Illuminator\n• Будильник, секундомір, таймер\n• Міцний корпус зі шкіряним ремінцем\n• Японська якість Casio\n\nПідходить для щоденного носіння, подорожей та активного способу життя.\n\n💰 Вигідна ціна на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 2609.59,
    original_price_uah: 5219.17,
    external_url: "https://www.aliexpress.com/item/1005009966164200.html",
    affiliate_url:
      "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005009966164200.html%3FinvitationCode%3DQklkVC85UElNSm1RdEduR0pxVzB0ZVhmUHgxMG9PWHdzbEIwbTlFRmNvV2VQemFTZUJrNWVWT0s1MU1hdTAyWg%26srcSns%3Dsns_Copy%26spreadType%3DsocialShare%26social_params%3D61544444090%26bizType%3DProductDetail%26spreadCode%3DQklkVC85UElNSm1RdEduR0pxVzB0ZVhmUHgxMG9PWHdzbEIwbTlFRmNvV2VQemFTZUJrNWVWT0s1MU1hdTAyWg%26aff_fcid%3D0604f69f2d874cb0ba22a0ab411e3d43-1781705572919-03433-_EHKmguw%26tt%3DMG%26aff_fsk%3D_EHKmguw%26aff_platform%3Ddefault%26sk%3D_EHKmguw%26aff_trace_key%3D0604f69f2d874cb0ba22a0ab411e3d43-1781705572919-03433-_EHKmguw%26shareId%3D61544444090%26businessType%3DProductDetail%26platform%3DAE%26terminal_id%3D9958bfced5b34a7a95165046056e6ec1%26afSmartRedirect%3Dy%26gatewayAdapt%3Ddeu2glo",
    image_url: "/deals/casio-world-time-watch.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.25),
    category: { slug: "elektronika", name_uk: "Електроніка", icon: "📱" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-4",
    user_id: "user-1",
    category_id: "cat-2",
    merchant_id: "merch-4",
    title: "Жіночі спортивні шорти — для бігу, фітнесу та йоги",
    description:
      "Зручні жіночі спортивні шорти з високою талією — ідеальні для бігу, велоспорту, фітнесу та йоги.\n\nОсобливості:\n\n• Висока талія для комфортної посадки\n• Підходять для тренувань, бігу та повсякденного носіння\n• Еластичний матеріал, що не обмежує рух\n• Стильний спортивний дизайн\n• Підходять для залу, йоги та активного відпочинку\n\n💰 Вигідна ціна на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 169.93,
    original_price_uah: 346.87,
    external_url: "https://www.aliexpress.com/item/1005011627508581.html",
    affiliate_url:
      "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005011627508581.html%3Fspm%3Da2g0n.home.msiteJustForYou.13.30696278wIxoHp%26gps-id%3DmsiteJustForYou%26scm%3D1007.33107.376995.0%26scm_id%3D1007.33107.376995.0%26scm-url%3D1007.33107.376995.0%26pvid%3D34466abf-3be9-4ebd-8033-a1494d67ef32%26_t%3Dgps-id%253AmsiteJustForYou%252Cscm-url%253A1007.33107.376995.0%252Cpvid%253A34466abf-3be9-4ebd-8033-a1494d67ef32%252Ctpp_buckets%253A668%25232846%25238108%25231977%26pdp_ext_f%3D%257B%2522order%2522%253A%2522800%2522%252C%2522eval%2522%253A%25221%2522%252C%2522sceneId%2522%253A%252223107%2522%252C%2522fromPage%2522%253A%2522recommend%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%2521335.92%2521164.60%2521%2521%252146.00%252122.54%2521%25400b88ac1917817198623105570e0de4%252112000056095228286%2521rec%2521UA%25216069536835%2521XZ%25211%25210%2521n_tag%253A-29919%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%26utparam-url%3Dscene%253AmsiteJustForYou%257Cquery_from%253A%257Cx_object_id%253A1005011627508581%257C_p_origin_prod%253A%26curPageLogUid%3DLQUZVImdtQy1",
    image_url: "/deals/womens-sport-shorts.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.1),
    category: { slug: "odyag", name_uk: "Одяг", icon: "👕" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-5",
    user_id: "user-1",
    category_id: "cat-2",
    merchant_id: "merch-4",
    title: "Жіночий піжамний комплект — топ і шорти з принтом сердечок",
    description:
      "Зручний і стильний домашній комплект для жінок — ідеальний для сну, відпочинку вдома та повсякденного комфорту.\n\nОсобливості:\n\n• Комплект: топ + шорти\n• М'який приємний матеріал\n• V-подібний виріз\n• Модний принт із сердечками\n• Легкий і комфортний для дому\n• Підходить для сну та відпочинку\n\n💰 Вигідна ціна на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 244.42,
    original_price_uah: 488.84,
    external_url: "https://www.aliexpress.com/item/1005010348394629.html",
    affiliate_url:
      "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005010348394629.html%3Fspm%3Da2g0o.detail.pcDetailTopMoreOtherSeller.10.41c60U2N0U2NGu%26gps-id%3DpcDetailTopMoreOtherSeller%26scm%3D1007.40050.354490.0%26scm_id%3D1007.40050.354490.0%26scm-url%3D1007.40050.354490.0%26pvid%3D6bb477ee-ecf3-4e0e-bc2b-80d00766b773%26_t%3Dgps-id%253ApcDetailTopMoreOtherSeller%252Cscm-url%253A1007.40050.354490.0%252Cpvid%253A6bb477ee-ecf3-4e0e-bc2b-80d00766b773%252Ctpp_buckets%253A668%25232846%25238108%25231977%26pdp_ext_f%3D%257B%2522order%2522%253A%25225541%2522%252C%2522eval%2522%253A%25221%2522%252C%2522orig_sl_item_id%2522%253A%25221005010348394629%2522%252C%2522orig_item_id%2522%253A%25221005010487209576%2522%252C%2522sceneId%2522%253A%252230050%2522%252C%2522fromPage%2522%253A%2522recommend%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%2521488.84%2521244.42%2521%2521%252166.94%252133.47%2521%25400b88ac1917817198888386275e0de4%252112000052069300906%2521rec%2521UA%25216069536835%2521XZ%25211%25210%2521n_tag%253A-29919%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%26utparam-url%3Dscene%253ApcDetailTopMoreOtherSeller%257Cquery_from%253A%257Cx_object_id%253A1005010348394629%257C_p_origin_prod%253A1005010487209576",
    image_url: "/deals/womens-pajama-set.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.05),
    category: { slug: "odyag", name_uk: "Одяг", icon: "👕" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-6",
    user_id: "user-1",
    category_id: "cat-5",
    merchant_id: "merch-4",
    title: "Жіночі легінси для йоги — висока талія, контроль живота",
    description:
      "Стильні жіночі легінси з ефектом підтягування — ідеальні для йоги, фітнесу, бігу та пілates.\n\nОсобливості:\n\n• Висока талія для комфортної посадки\n• Контроль живота\n• Ефект підтягування\n• М'який еластичний матеріал\n• Підходять для тренувань і повсякденного носіння\n• Зручні для залу, йоги та бігу\n\n💰 Вигідна ціна на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 297.75,
    original_price_uah: 689.22,
    external_url: "https://www.aliexpress.com/item/1005011955705593.html",
    affiliate_url:
      "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005011955705593.html%3Fspm%3Da2g0o.productlist.main.2.53d6JX4KJX4K7J%26algo_pvid%3D61137d48-8629-4d52-8829-cbed06d2c2e5%26algo_exp_id%3D61137d48-8629-4d52-8829-cbed06d2c2e5-1%26pdp_ext_f%3D%257B%2522order%2522%253A%2522215%2522%252C%2522spu_best_type%2522%253A%2522price%2522%252C%2522eval%2522%253A%25221%2522%252C%2522fromPage%2522%253A%2522search%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%2521689.22%2521297.75%2521%2521%252194.38%252140.77%2521%25402103835c17817209066983052ee879%252112000057122241229%2521sea%2521UA%25216069536835%2521X%25211%25210%2521n_tag%253A-29919%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%253BpisId%253A5000000209628224%26curPageLogUid%3DEmz3Sc6r9vPo%26utparam-url%3Dscene%253Asearch%257Cquery_from%253A%257Cx_object_id%253A1005011955705593%257C_p_origin_prod%253A",
    image_url: "/deals/womens-yoga-leggings.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.02),
    category: { slug: "sport", name_uk: "Спорт", icon: "⚽" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-7",
    user_id: "user-1",
    category_id: "cat-2",
    merchant_id: "merch-4",
    title: "Комплект чоловічих боксерів — 4 штуки, бавовна",
    description:
      "Зручний комплект чоловічих боксерів — практичний вибір для щоденного носіння з м'якої бавовняної тканини.\n\nОсобливості:\n\n• Комплект із 4 штук\n• М'яка бавовняна тканина\n• Комфортна посадка\n• Підходять для щоденного носіння\n• Практичний набір на кожен день\n\n💰 Вигідна ціна на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 542.54,
    original_price_uah: 673.37,
    external_url: deal7Links.external_url,
    affiliate_url: deal7Links.affiliate_url,
    image_url: "/deals/mens-boxer-shorts-set.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.01),
    category: { slug: "odyag", name_uk: "Одяг", icon: "👕" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-8",
    user_id: "user-1",
    category_id: "cat-1",
    merchant_id: "merch-4",
    title: "Xiaomi Redmi Buds 4 Lite — бездротові навушники TWS, Bluetooth 5.3",
    description:
      "Xiaomi Redmi Buds 4 Lite — компактні бездротові навушники TWS з Bluetooth 5.3 для щоденного використання, спорту та подорожей.\n\nОсобливості:\n\n• Bluetooth 5.3 — стабільне з'єднання\n• Захист IP54 від бризок і поту\n• До 20 годин прослуховування з кейсом\n• Легкі та зручні для тривалого носіння\n• Чіткий звук для музики, дзвінків і подкастів\n• Компактний зарядний кейс\n\n💰 Вигідна ціна на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 424.33,
    original_price_uah: 902.77,
    external_url: "https://www.aliexpress.com/item/1005012370663632.html",
    affiliate_url:
      "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005012370663632.html%3Fspm%3Da2g0o.home.pcJustForYou.34.4e826278ddurJr%26gps-id%3DpcJustForYou%26scm%3D1007.13562.416251.0%26scm_id%3D1007.13562.416251.0%26scm-url%3D1007.13562.416251.0%26pvid%3D75b06cdc-27c6-48a2-8b0a-68e893c10af8%26_t%3Dgps-id%253ApcJustForYou%252Cscm-url%253A1007.13562.416251.0%252Cpvid%253A75b06cdc-27c6-48a2-8b0a-68e893c10af8%252Ctpp_buckets%253A668%25232846%25238108%25231977%26pdp_ext_f%3D%257B%2522order%2522%253A%25226039%2522%252C%2522eval%2522%253A%25221%2522%252C%2522orig_sl_item_id%2522%253A%25221005012370663632%2522%252C%2522orig_item_id%2522%253A%25221005009836438015%2522%252C%2522sceneId%2522%253A%25223562%2522%252C%2522fromPage%2522%253A%2522recommend%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%2521902.77%2521424.33%2521%2521%2521123.80%252158.19%2521%254021039eb717818101126047103e0ec2%252112000058284023201%2521rec%2521UA%25216069536835%2521XZ%25211%25210%2521n_tag%253A-29919%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%26utparam-url%3Dscene%253ApcJustForYou%257Cquery_from%253A%257Cx_object_id%253A1005012370663632%257C_p_origin_prod%253A1005009836438015",
    image_url: "/deals/redmi-buds-4-lite.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.005),
    category: { slug: "elektronika", name_uk: "Електроніка", icon: "📱" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-9",
    user_id: "user-1",
    category_id: "cat-8",
    merchant_id: "merch-4",
    title: "Naturehike — надувний кемпінговий матрац R-Value 4.6, ультралегкий",
    description:
      "Naturehike — сучасний надувний кемпінговий матрац для походів, кемпінгу та відпочинку на природі. З високим показником теплоізоляції R-Value 4.6 для комфортного сну навіть у прохолодну погоду.\n\nОсобливості:\n\n• R-Value 4.6 — хороша теплоізоляція\n• Ультралегка конструкція для походів\n• Складна конструкція — зручно брати з собою\n• Підходить для кемпінгу, пікніків і пляжу\n• М'яка поверхня для комфортного сну\n• Компактне зберігання в поході\n\n💰 Вигідна ціна на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 2797.01,
    original_price_uah: 6906.15,
    external_url: "https://www.aliexpress.com/item/1005007500152556.html",
    affiliate_url:
      "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005007500152556.html%3FproductId%3D1005007500152556%26selectedSkuId%3D12000041039284580%26channel%3DdetailPageDealCombineFloor%26combineBizType%3DplatformFreeShipping%26intent_extra_sku_from%3Dfrom_add_to_shopcart%26type%3Dmergeorder%26pdp_npi%3D4%2540dis%2521UAH%25216906.15%25212797.01%2521%2521%2521947.06%2521383.56%2521%254021039eb717818102729964205e0ec2%252112000041039284580%2521fus%2521UA%25216069536835%2521X%26trackParams%3D%257B%2522businessScenario%2522%253A%2522choiceV2%2522%252C%2522activityType%2522%253A%2522CHOICE_FREE_SHIPPING%2522%257D%26spm%3Da2g0o.detail.fusionpage.0",
    image_url: "/deals/naturehike-camping-mattress.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.001),
    category: { slug: "podorozhi", name_uk: "Подорожі", icon: "✈️" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-10",
    user_id: "user-1",
    category_id: "cat-7",
    merchant_id: "merch-4",
    title: "Гра «Піратська бочка» — весела настільна гра для дітей",
    description:
      "Весела гра «Піратська бочка» — класична настільна гра, де потрібно обережно вставляти мечі, не «пробудивши» пірата. Ідеальний подарунок для дітей та сімейного дозвілля.\n\nОсобливості:\n\n• Весела гра для дітей і всієї родини\n• Розвиває уважність і координацію\n• Компактна — зручно брати у гості\n• Чудовий подарунок на свято\n• Яскравий дизайн у піратському стилі\n• Підходить для дітей від 3 років\n\n💰 Знижка 71% на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 140.39,
    original_price_uah: 484.5,
    external_url: "https://www.aliexpress.com/item/1005005948757725.html",
    affiliate_url:
      "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005005948757725.html%3Fspm%3Da2g0o.cart.0.0.7e7a795dTyrK7L%26mp%3D1%26sourceType%3D570%26pdp_npi%3D6%2540dis%2521UAH%2521UAH%2B484.50%2521UAH%2B140.39%2521%2521UAH%2B140.39%2521%2521%2521%2540210389a017818616813356137e1117%252112000034982815781%2521ct%2521UA%25216069536835%2521%25211%25210%2521%26pdp_ext_f%3D%257B%2522cart2PdpParams%2522%253A%257B%2522sourceType%2522%253A%2522570%2522%252C%2522cartSource%2522%253A%2522main%2522%257D%257D",
    image_url: "/deals/pirate-barrel-toy.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.0005),
    category: { slug: "diti", name_uk: "Дитячі товари", icon: "🧸" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-11",
    user_id: "user-1",
    category_id: "cat-7",
    merchant_id: "merch-4",
    title: "Іграшкова інерційна машинка з шестернями — подарунок для дітей",
    description:
      "Яскрава іграшкова інерційна машинка з механізмом шестерень — весела іграшка для хлопчиків і дівчаток. Потягни назад — і машинка їде вперед.\n\nОсобливості:\n\n• Інерційний механізм — їде без батарейок\n• Прозорий корпус із видимими шестернями\n• Яскравий мультяшний дизайн\n• Розвиває моторику та цікавість до механіки\n• Чудовий подарунок на день народження\n• Підходить для дітей від 3 років\n\n💰 Знижка 75% на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 148.59,
    original_price_uah: 613.87,
    external_url: "https://www.aliexpress.com/item/1005007758475767.html",
    affiliate_url:
      "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005007758475767.html%3Fspm%3Da2g0o.cart.0.0.7e7a795dTyrK7L%26mp%3D1%26sourceType%3D570%26pdp_npi%3D6%2540dis%2521UAH%2521UAH%2B613.87%2521UAH%2B148.59%2521%2521UAH%2B148.59%2521%2521%2521%2540210389a017818616813356137e1117%252112000042110401595%2521ct%2521UA%25216069536835%2521%25211%25210%2521%26pdp_ext_f%3D%257B%2522cart2PdpParams%2522%253A%257B%2522sourceType%2522%253A%2522570%2522%252C%2522cartSource%2522%253A%2522main%2522%257D%257D",
    image_url: "/deals/kids-gear-car-toy.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.0001),
    category: { slug: "diti", name_uk: "Дитячі товари", icon: "🧸" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-12",
    user_id: "user-1",
    category_id: "cat-2",
    merchant_id: "merch-4",
    title: "Жіноча сукня Clacive — легка бавовняна, до щиколоток",
    description:
      "Елегантна жіноча сукня Clacive з бавовни — стильний літній варіант на бретельках без рукавів, довжиною до щиколоток. Вільний крій для комфорту в спеку.\n\nОсобливості:\n\n• Легка бавовняна тканина\n• Вільний комфортний крій\n• На бретельках, без рукавів\n• Довжина до щиколоток\n• Елегантний дизайн з декоративними вирізами\n• Підходить для літа та повсякденного стилю\n\n💰 Знижка 46% на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 1265.19,
    original_price_uah: 2342.99,
    external_url: "https://www.aliexpress.com/item/1005007031484588.html",
    affiliate_url:
      "https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F1005007031484588.html%3Fspm%3Da2g0o.productlist.main.23.45c96sJn6sJnuC%26algo_pvid%3Dd69eebfe-fd79-43b0-8125-8e763fc2da7e%26algo_exp_id%3Dd69eebfe-fd79-43b0-8125-8e763fc2da7e-22%26pdp_ext_f%3D%257B%2522order%2522%253A%2522688%2522%252C%2522spu_best_type%2522%253A%2522price%2522%252C%2522eval%2522%253A%25221%2522%252C%2522fromPage%2522%253A%2522search%2522%257D%26pdp_npi%3D6%2540dis%2521UAH%25212342.99%25211265.19%2521%2521%252147.39%252125.59%2521%25402103894417818892598344746e996c%252112000039170193842%2521sea%2521UA%25216069536835%2521X%25211%25210%2521n_tag%253A-29919%253Bd%253A70748a2b%253Bm03_new_user%253A-29895%26curPageLogUid%3DArIrtsWLMJUh%26utparam-url%3Dscene%253Asearch%257Cquery_from%253A%257Cx_object_id%253A1005007031484588%257C_p_origin_prod%253A",
    image_url: "/deals/womens-black-summer-dress.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.00005),
    category: { slug: "odyag", name_uk: "Одяг", icon: "👕" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-13",
    user_id: "user-1",
    category_id: "cat-2",
    merchant_id: "merch-4",
    title: "Жіноча літня міні-сукня на шийці — атласна, з відкритою спиною",
    description:
      "Стильна літня міні-сукня на шийці з атласної тканини — елегантний варіант для вечірок, прогулянок і святкових подій. Відкрита спина та однотонний дизайн.\n\nОсобливості:\n\n• Атласна тканина з елегантним блиском\n• Модель на шийці (halter)\n• Відкрита спина\n• Міні-довжина — стильний літній силует\n• Підходить для вечірок і повсякденного образу\n• Однотонний універсальний дизайн\n\n💰 Знижка 50% на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 686.5,
    original_price_uah: 1373,
    external_url: deal13Links.external_url,
    affiliate_url: deal13Links.affiliate_url,
    image_url: "/deals/womens-halter-mini-dress.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.00001),
    category: { slug: "odyag", name_uk: "Одяг", icon: "👕" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-14",
    user_id: "user-1",
    category_id: "cat-2",
    merchant_id: "merch-4",
    title: "Жіноча атласна сукня без бретелів — зі складками, відкриті плечі",
    description:
      "Елегантна атласна сукня без бретелів зі складками — стильний варіант для вечірок і святкових подій. Модель з відкритими плечима, відкритою спиною та високою талією.\n\nОсобливості:\n\n• Атласна тканина з елегантним блиском\n• Без бретелів, з відкритими плечима\n• Драпірування зі складками\n• Відкрита спина\n• Облягаючий силует з високою талією\n• Підходить для вечірок і урочистих подій\n\n💰 Знижка 56% на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 1513.37,
    original_price_uah: 3439.42,
    external_url: deal14Links.external_url,
    affiliate_url: deal14Links.affiliate_url,
    image_url: "/deals/womens-pleated-strapless-dress.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.000005),
    category: { slug: "odyag", name_uk: "Одяг", icon: "👕" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-15",
    user_id: "user-1",
    category_id: "cat-2",
    merchant_id: "merch-4",
    title: "Комплект чоловічих боксерів з принтом — 4/5 штук",
    description:
      "Стильний комплект чоловічих боксерів (boyshort) з принтом — зручна повсякденна білизна з м'якої тканини. Набір із 4–5 штук за вигідною ціною.\n\nОсобливості:\n\n• Комплект 4/5 штук\n• Модний принт\n• Зручна посадка boyshort\n• Підходять для щоденного носіння\n• Європейські та американські розміри\n• Залишилося обмежена кількість\n\n💰 Знижка 58% на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 274.58,
    original_price_uah: 650.1,
    external_url: deal15Links.external_url,
    affiliate_url: deal15Links.affiliate_url,
    image_url: "/deals/mens-printed-boyshorts-set.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.000002),
    category: { slug: "odyag", name_uk: "Одяг", icon: "👕" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-16",
    user_id: "user-1",
    category_id: "cat-5",
    merchant_id: "merch-4",
    title: "Жіночі спортивні легінси без швів — широка резинка",
    description:
      "Безшовні спортивні легінси з широкою резинкою — зручний варіант для тренувань, йоги та повсякденного носіння.\n\nОсобливості:\n\n• Безшовна конструкція — комфорт під час руху\n• Широка резинка на талії\n• Підходять для фітнесу, йоги та бігу\n• Еластична тканина\n• Залишилося обмежена кількість\n\n💰 Знижка 50% на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 417.05,
    original_price_uah: 834.17,
    external_url: deal16Links.external_url,
    affiliate_url: deal16Links.affiliate_url,
    image_url: "/deals/womens-seamless-sport-leggings.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.000001),
    category: { slug: "sport", name_uk: "Спорт", icon: "⚽" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-17",
    user_id: "user-1",
    category_id: "cat-7",
    merchant_id: "merch-4",
    title: "Дитячий проектор-ліхтарик з мультфільмами — 10 карток, 80 зображень",
    description:
      "Креативний дитячий проектор-ліхтарик — іграшка для вечірніх казок і розваг перед сном. Набір із 10 карток та 80 мультяшних зображень.\n\nОсобливості:\n\n• 10 проекційних карток — 80 різних зображень\n• Мультяшні малюнки для вечірніх історій\n• Компактний формат — зручно брати з собою\n• Підходить для дітей від 3 років\n• Залишилося лише 10 штук\n\n💰 Знижка 56% на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 191.73,
    original_price_uah: 431.89,
    external_url: deal17Links.external_url,
    affiliate_url: deal17Links.affiliate_url,
    image_url: "/deals/kids-cartoon-projection-flashlight.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.0000005),
    category: { slug: "diti", name_uk: "Дитячі товари", icon: "🧸" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-18",
    user_id: "user-1",
    category_id: "cat-2",
    merchant_id: "merch-4",
    title: "Чоловічі легкі літні капці EVA — для дому та відпочинку",
    description:
      "Легкі та м'які чоловічі капці з EVA — зручний варіант для дому, дачі та повсякденного відпочинку на свіжому повітрі.\n\nОсобливості:\n\n• М'який матеріал EVA — комфорт при тривалому носінні\n• Легка конструкція — не відчуваються на ногах\n• Підходять для дому та вулиці\n• Літній дизайн — зручно в спеку\n• Залишилося лише 10 пар\n\n💰 Знижка 56% на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 234.17,
    original_price_uah: 532.19,
    external_url: deal18Links.external_url,
    affiliate_url: deal18Links.affiliate_url,
    image_url: "/deals/mens-eva-summer-slippers.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.0000002),
    category: { slug: "odyag", name_uk: "Одяг", icon: "👕" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-19",
    user_id: "user-1",
    category_id: "cat-7",
    merchant_id: "merch-4",
    title: "Дитячий надувний плавзасіб у вигляді машинки — для басейну та пляжу",
    description:
      "Милий надувний плавзасіб у формі машинки — для малюків та дітей на басейн, пляж і літній відпочинок.\n\nОсобливості:\n\n• Дизайн у вигляді автомобіля — дітям сподобається\n• Зручні ручки для безпечного утримання\n• Підходить для басейну, моря та пляжу\n• Легко надувається — зручно брати з собою\n• Залишилося лише 10 штук\n\n💰 Знижка 57% на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 237.75,
    original_price_uah: 551.4,
    external_url: deal19Links.external_url,
    affiliate_url: deal19Links.affiliate_url,
    image_url: "/deals/baby-car-inflatable-swim-float.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.0000001),
    category: { slug: "diti", name_uk: "Дитячі товари", icon: "🧸" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-20",
    user_id: "user-1",
    category_id: "cat-1",
    merchant_id: "merch-5",
    title: "Sony PlayStation 5 Slim 1TB + Call of Duty: Black Ops 6 — уцінка",
    description:
      "Ігрова консоль Sony PlayStation 5 Slim з накопичувачем 1 ТБ у комплекті з грою Call of Duty: Black Ops 6 — вигідна уцінка в TOUCH.\n\nОсобливості:\n\n• PlayStation 5 Slim — компактний корпус, SSD 1 ТБ\n• У комплекті ваучер Call of Duty: Black Ops 6\n• Підтримка 4K, HDR та до 120 FPS\n• DualSense з тактильним зворотним зв'язком\n• Уцінка: легкі подряпини на корпусі — повна функціональність\n• Економія 2 900 ₴\n\n💰 Знижка 2 900 ₴ на TOUCH\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 29999,
    original_price_uah: 32899,
    external_url: deal20Links.external_url,
    affiliate_url: deal20Links.affiliate_url,
    image_url: "/deals/ps5-slim-cod-bundle-touch.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.00000005),
    category: { slug: "elektronika", name_uk: "Електроніка", icon: "📱" },
    merchant: { name: "TOUCH", slug: "touch", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-21",
    user_id: "user-1",
    category_id: "cat-1",
    merchant_id: "merch-5",
    title: "Nintendo Switch OLED — The Legend of Zelda: Tears of the Kingdom Edition",
    description:
      "Портативна ігрова консоль Nintendo Switch OLED у спеціальному дизайні The Legend of Zelda: Tears of the Kingdom — вигідна ціна в TOUCH.\n\nОсобливості:\n\n• OLED-екран 7\" — яскраві кольори та контраст\n• Лімітоване оформлення Zelda: Tears of the Kingdom\n• Портативний та домашній режим гри\n• Joy-Con контролери в комплекті\n• Док-станція та кабель HDMI в комплекті\n• Економія 1 740 ₴\n\n💰 Знижка 1 740 ₴ на TOUCH\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 18059,
    original_price_uah: 19799,
    external_url: deal21Links.external_url,
    affiliate_url: deal21Links.affiliate_url,
    image_url: "/deals/nintendo-switch-oled-zelda-tears-touch.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.00000002),
    category: { slug: "elektronika", name_uk: "Електроніка", icon: "📱" },
    merchant: { name: "TOUCH", slug: "touch", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-22",
    user_id: "user-1",
    category_id: "cat-5",
    merchant_id: "merch-6",
    title: "HOKA Mafate Speed 2 — 43⅓, 44, 46 | чорний/синій",
    description:
      "Трейлові кросівки HOKA Mafate Speed 2 у кольорі чорний/синій — знижка на Answear з додатковим промокодом SALE (−5%).\n\nОсобливості:\n\n• Промокод SALE: 5 199 ₴ → 4 939 ₴\n• Підошва Vibram Megagrip — надійне зчеплення на різному покритті\n• Амортизація CMEVA та геометрія Meta-Rocker\n• Легка безшовна верхня частина SpeedFrame\n• Drop 4 mm — для технічних трейлів і довгих дистанцій\n• Доступні розміри: 43⅓, 44, 46\n• Економія 3 760 ₴ від 8 699 ₴\n\n💰 Знижка 43% на Answear (з кодом SALE)\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 4939,
    original_price_uah: 8699,
    external_url: deal22Links.external_url,
    affiliate_url: deal22Links.affiliate_url,
    image_url: "/deals/hoka-mafate-speed-2-answear.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.00000001),
    category: { slug: "sport", name_uk: "Спорт", icon: "⚽" },
    merchant: { name: "Answear", slug: "answear", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-23",
    user_id: "user-1",
    category_id: "cat-5",
    merchant_id: "merch-6",
    title: "Бігові кросівки Hoka Mafate Speed 2 — 42⅔, 43⅓, 44⅔, 45⅓, 46, 46⅔ | зелений",
    description:
      "Бігові кросівки HOKA Mafate Speed 2 у зеленому кольорі — знижка на Answear з додатковим промокодом SALE (−5%).\n\nОсобливості:\n\n• Промокод SALE: 5 399 ₴ → 5 129 ₴\n• Підошва Vibram Megagrip — надійне зчеплення на різному покритті\n• Амортизація CMEVA та геометрія Meta-Rocker\n• Легка безшовна верхня частина SpeedFrame\n• Drop 4 mm — для технічних трейлів і довгих дистанцій\n• Доступні розміри: 42⅔, 43⅓, 44⅔, 45⅓, 46, 46⅔\n• Економія 2 570 ₴ від 7 699 ₴\n\n💰 Знижка 33% на Answear (з кодом SALE)\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 5129,
    original_price_uah: 7699,
    external_url: deal23Links.external_url,
    affiliate_url: deal23Links.affiliate_url,
    image_url: "/deals/hoka-mafate-speed-2-answear-green.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.000000005),
    category: { slug: "sport", name_uk: "Спорт", icon: "⚽" },
    merchant: { name: "Answear", slug: "answear", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-24",
    user_id: "user-1",
    category_id: "cat-5",
    merchant_id: "merch-6",
    title: "Жіночі кросівки adidas Rapidmove Pro Trainer | білий",
    description:
      "Жіночі кросівки для тренувань adidas Performance Rapidmove Pro Trainer у білому кольорі — знижка на Answear з додатковим промокодом SALE (−5%).\n\nОсобливості:\n\n• Промокод SALE: 4 999 ₴ → 4 749 ₴\n• Технологія Climacool — вентиляція та відведення вологи\n• Підошва Lightstrike Pro + Lightstrike — амортизація та віддача енергії\n• Зовнішня підошва Continental — надійне зчеплення на сухій і мокрій поверхні\n• Підходять для тренувань, функціонального фітнесу та залу\n• Економія 2 250 ₴ від 6 999 ₴\n\n💰 Знижка 32% на Answear (з кодом SALE)\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 4749,
    original_price_uah: 6999,
    external_url: deal24Links.external_url,
    affiliate_url: deal24Links.affiliate_url,
    image_url: "/deals/adidas-rapidmove-pro-trainer-womens-white.jpg",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.000000002),
    category: { slug: "sport", name_uk: "Спорт", icon: "⚽" },
    merchant: { name: "Answear", slug: "answear", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-25",
    user_id: "user-1",
    category_id: "cat-5",
    merchant_id: "merch-6",
    title: "Answear SALE — HOKA Mafate Speed 2 зелений + ще кросівки",
    description:
      "Підбірка знижок на кросівки в Answear — додаткові −5% з промокодом SALE на вже знижені ціни.\n\nГоловна пропозиція — HOKA Mafate Speed 2 у зеленому кольорі (розміри 42⅔–46⅔).\n\nОсобливості:\n\n• Промокод SALE: 5 399 ₴ → 5 129 ₴\n• Підошва Vibram Megagrip — надійне зчеплення\n• Амортизація CMEVA та Meta-Rocker\n• Економія 2 570 ₴ від 7 699 ₴\n\n💰 Знижка 33% на Answear (з кодом SALE)\n👉 Натисніть «Забрати зараз» для головної пропозиції\n\n🔥 Ще пропозиції:\n\n• HOKA Mafate Speed 2 чорний/синій — 4 939 ₴ → https://hxbok.com/g/h29o15jdr6d66b47c306a76d99edd2/?ulp=https%3A%2F%2Fanswear.ua%2Fp%2Fbigovi-krosivky-hoka-mafate-speed-2-kolir-chornyj-1126851-1538050\n• Жіночі adidas Rapidmove Pro Trainer білий — 4 749 ₴ → https://hxbok.com/g/h29o15jdr6d66b47c306a76d99edd2/?ulp=https%3A%2F%2Fanswear.ua%2Fp%2Fkrosivky-dlya-trenuvan-adidas-performance-rapidmove-pro-trainer-kolir-bilyj-jp8783-1686300",
    price_uah: 5129,
    original_price_uah: 7699,
    external_url: deal25Links.external_url,
    affiliate_url: deal25Links.affiliate_url,
    image_url: "/deals/hoka-mafate-speed-2-answear-green.png",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.000000001),
    category: { slug: "sport", name_uk: "Спорт", icon: "⚽" },
    merchant: { name: "Answear", slug: "answear", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
  {
    id: "deal-26",
    user_id: "user-1",
    category_id: "cat-7",
    merchant_id: "merch-4",
    title: "Дитячий LED-дзигуш з музикою та світлом — іграшка-подарунок",
    description:
      "Класичний магічний дзигуш з LED-підсвіткою та музикою — яскрава іграшка для дітей, ідеальна як подарунок хлопчикам на день народження чи свято.\n\nОсобливості:\n\n• Натискаєш зверху — дзигуш крутиться\n• Світиться та грає музику під час обертання\n• Легкий і компактний — зручно брати з собою\n• Міцний корпус з ABS — безпечний для дітей\n• Приваблює увагу яскравим LED-ефектом\n• Чудовий подарунок для дітей від 3 років\n\n💰 Вигідна ціна на AliExpress\n👉 Натисніть «Забрати зараз», щоб перейти до пропозиції.",
    price_uah: 175.29,
    original_price_uah: 412.8,
    external_url: deal26Links.external_url,
    affiliate_url: deal26Links.affiliate_url,
    image_url: "/deals/kids-led-music-spinning-top.jpg",
    status: "approved",
    hot_count: 0,
    cold_count: 0,
    expires_at: null,
    created_at: hoursAgo(0.0000000005),
    category: { slug: "diti", name_uk: "Дитячі товари", icon: "🧸" },
    merchant: { name: "AliExpress", slug: "aliexpress", logo_url: null },
    profile: { username: "VyhodaDeal Team", avatar_url: null },
  },
];

export const MOCK_COMMENTS: CommentWithProfile[] = [];

export const MOCK_VOTES: Record<string, "hot" | "cold"> = {};

export const MOCK_CURRENT_USER = MOCK_PROFILES[1];
