import { createHmac, createHash } from "crypto";

export interface TelegramAuthUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

const AUTH_MAX_AGE_SECONDS = 86_400;

function getTelegramAuthSecret(): string {
  const secret =
    process.env.TELEGRAM_AUTH_SECRET ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    throw new Error("Telegram auth secret is not configured");
  }
  return secret;
}

export function verifyTelegramAuth(user: TelegramAuthUser): boolean {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) return false;

  const now = Math.floor(Date.now() / 1000);
  if (!user.auth_date || now - user.auth_date > AUTH_MAX_AGE_SECONDS) {
    return false;
  }

  const { hash, ...data } = user;
  if (!hash) return false;

  const dataCheckString = Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== null)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secretKey = createHash("sha256").update(botToken).digest();
  const expectedHash = createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  return expectedHash === hash;
}

export function getTelegramUserEmail(telegramId: number): string {
  return `telegram_${telegramId}@telegram.vyhodadeal.local`;
}

export function getTelegramUserPassword(telegramId: number): string {
  return createHmac("sha256", getTelegramAuthSecret())
    .update(`telegram:${telegramId}`)
    .digest("hex");
}

export function getTelegramUserCredentials(telegramId: number) {
  return {
    email: getTelegramUserEmail(telegramId),
    password: getTelegramUserPassword(telegramId),
  };
}

export function getTelegramProfileUsername(user: TelegramAuthUser): string {
  if (user.username) {
    return user.username.replace(/^@/, "");
  }

  const slug = [user.first_name, user.last_name]
    .filter(Boolean)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "");

  return slug || `tg${user.id}`;
}

export function getTelegramDisplayName(user: TelegramAuthUser): string {
  return [user.first_name, user.last_name].filter(Boolean).join(" ");
}
