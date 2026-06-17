import type {
  Category,
  CommentWithProfile,
  DealWithRelations,
  Merchant,
  Profile,
} from "@/types/database";

export const MOCK_PROFILES: Profile[] = [
  {
    id: "user-1",
    username: "dealmaster",
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
    profile: { username: "dealmaster", avatar_url: null },
  },
];

export const MOCK_COMMENTS: CommentWithProfile[] = [];

export const MOCK_VOTES: Record<string, "hot" | "cold"> = {};

export const MOCK_CURRENT_USER = MOCK_PROFILES[1];
