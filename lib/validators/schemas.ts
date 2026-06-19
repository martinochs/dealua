import { z } from "zod";
import { resolveDealLinksFromAffiliate } from "@/lib/affiliate-links";

export const loginSchema = z.object({
  email: z.string().email("Невірний email"),
  password: z.string().min(6, "Мінімум 6 символів"),
});

export const mockLoginSchema = z.object({
  username: z.string().min(1, "Введіть ім'я користувача"),
  password: z.string().min(1, "Введіть пароль"),
});

export const registerSchema = z.object({
  email: z.string().email("Невірний email"),
  password: z.string().min(6, "Мінімум 6 символів"),
  username: z
    .string()
    .min(3, "Мінімум 3 символи")
    .max(30, "Максимум 30 символів")
    .regex(/^[a-zA-Z0-9_]+$/, "Лише латиниця, цифри та _"),
});

export const submitDealSchema = z.object({
  title: z.string().min(5, "Мінімум 5 символів").max(200),
  description: z.string().min(20, "Мінімум 20 символів").max(5000),
  price_uah: z.coerce.number().positive("Ціна має бути більше 0"),
  original_price_uah: z
    .union([z.coerce.number().positive(), z.literal(""), z.undefined()])
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : v)),
  affiliate_url: z.string().min(1, "Вставте партнерське посилання"),
  image_url: z
    .union([z.string().url(), z.literal(""), z.undefined()])
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : v)),
  category_id: z.string().min(1, "Оберіть категорію"),
  merchant_id: z.string().min(1, "Оберіть магазин"),
}).transform((data) => {
  const links = resolveDealLinksFromAffiliate(data.affiliate_url);
  if ("error" in links) {
    throw new z.ZodError([
      { code: "custom", message: links.error, path: ["affiliate_url"] },
    ]);
  }
  return {
    ...data,
    affiliate_url: links.affiliate_url,
    external_url: links.external_url,
  };
});

export const commentSchema = z.object({
  deal_id: z.string().min(1),
  body: z.string().min(1, "Коментар не може бути порожнім").max(2000),
});

export const voteSchema = z.object({
  deal_id: z.string().min(1),
  vote_type: z.enum(["hot", "cold"]),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type SubmitDealInput = z.infer<typeof submitDealSchema>;
export type CommentInput = z.infer<typeof commentSchema>;
export type VoteInput = z.infer<typeof voteSchema>;
