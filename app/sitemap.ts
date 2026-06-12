import type { MetadataRoute } from "next";
import { getCategories, getDeals } from "@/lib/queries/deals";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "hourly", priority: 1 },
    { url: `${base}/deals`, changeFrequency: "hourly", priority: 0.9 },
    { url: `${base}/categories`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/rules`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const [categories, deals] = await Promise.all([
    getCategories(),
    getDeals("hot", undefined, 1000),
  ]);

  const categoryPages = categories.map((cat) => ({
    url: `${base}/category/${cat.slug}`,
    changeFrequency: "hourly" as const,
    priority: 0.7,
  }));

  const dealPages = deals.map((deal) => ({
    url: `${base}/deal/${deal.id}`,
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...dealPages];
}
