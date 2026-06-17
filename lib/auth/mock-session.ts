import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { MOCK_PROFILES } from "@/lib/mock/data";
import type { Profile } from "@/types/database";

const COOKIE_NAME = "dealua_session";
const MAX_AGE = 60 * 60 * 24 * 7;

function getConfiguredPassword(): string {
  if (process.env.MOCK_ADMIN_PASSWORD) {
    return process.env.MOCK_ADMIN_PASSWORD;
  }
  if (process.env.NODE_ENV === "development") {
    return "admin123";
  }
  return "";
}

export function getMockAdminUsername(): string {
  return process.env.MOCK_ADMIN_USERNAME ?? "admin";
}

export function verifyMockAdminLogin(username: string, password: string): boolean {
  const expectedUsername = getMockAdminUsername();
  const expectedPassword = getConfiguredPassword();
  if (!expectedPassword) return false;
  return username === expectedUsername && password === expectedPassword;
}

export function getMockProfileById(userId: string): Profile | null {
  return MOCK_PROFILES.find((p) => p.id === userId) ?? null;
}

export function getMockAdminProfile(): Profile | null {
  return MOCK_PROFILES.find((p) => p.role === "admin") ?? null;
}

export function getMockSessionUserIdFromRequest(request: NextRequest): string | null {
  return request.cookies.get(COOKIE_NAME)?.value ?? null;
}

export async function getMockSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function setMockSession(userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, userId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearMockSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
