import { NextRequest, NextResponse } from "next/server";
import { HOME_PAGE_SIZE, parseSortMode } from "@/lib/constants";
import { getProfile } from "@/lib/auth/session";
import { countDeals, getCommentCounts, getDeals, getUserVotes } from "@/lib/queries/deals";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const sort = parseSortMode(searchParams.get("sort") ?? undefined);
  const categorySlug = searchParams.get("cat")?.trim() || undefined;
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const limit = Math.min(
    50,
    Math.max(1, parseInt(searchParams.get("limit") ?? String(HOME_PAGE_SIZE), 10) || HOME_PAGE_SIZE)
  );
  const offset = (page - 1) * limit;

  const [deals, total, commentCounts, profile] = await Promise.all([
    getDeals(sort, categorySlug, limit, offset),
    countDeals(sort, categorySlug),
    getCommentCounts(),
    getProfile(),
  ]);

  const userVotes = profile
    ? await getUserVotes(
        deals.map((d) => d.id),
        profile.id
      )
    : {};

  return NextResponse.json({
    deals,
    commentCounts,
    userVotes,
    page,
    hasMore: offset + deals.length < total,
    total,
  });
}
