import { type NextRequest, NextResponse } from "next/server";
import { isMockMode } from "@/lib/config";
import { getMockProfileById, getMockSessionUserIdFromRequest } from "@/lib/auth/mock-session";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (isMockMode()) {
    if (path.startsWith("/admin")) {
      const userId = getMockSessionUserIdFromRequest(request);
      if (!userId) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("next", path);
        return NextResponse.redirect(loginUrl);
      }
      const profile = getMockProfileById(userId);
      if (profile?.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    return NextResponse.next();
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return NextResponse.next();
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
