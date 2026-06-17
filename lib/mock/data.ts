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
    title: "Casio — чоловічий годинник Sport Military, 50m waterproof",
    description:
      "Casio wrist watch men luxury brand set quartz 50m waterproof. Luminous sport military watch — кварцевий механізм, світлові стрілки, водозахист 50 м.",
    price_uah: 2023,
    original_price_uah: 4398,
    external_url: "https://www.aliexpress.com/item/1005009567335272.html",
    affiliate_url:
      "https://www.aliexpress.com/item/1005009567335272.html?spm=a2g0o.productlist.main.43.37d673e2CS69IP&algo_pvid=e426c7dc-f501-4f0c-9604-9176f5f9c100&algo_exp_id=e426c7dc-f501-4f0c-9604-9176f5f9c100-40&pdp_ext_f=%7B%22order%22%3A%22141%22%2C%22eval%22%3A%221%22%2C%22fromPage%22%3A%22search%22%7D&pdp_npi=6%40dis%21UAH%214398.36%212023.26%21%21%21602.30%21277.06%21%40211b65de17817021398846625e7b9b%2112000049483099719%21sea%21UA%210%21ABX%211%210%21n_tag%3A-29910%3Bd%3A70748a2b%3Bm03_new_user%3A-29895&curPageLogUid=UVkSVnX9zf6Z&utparam-url=scene%3Asearch%7Cquery_from%3A%7Cx_object_id%3A1005009567335272%7C_p_origin_prod%3A",
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
