import { NextRequest, NextResponse } from "next/server";
import { isMockMode } from "@/lib/config";
import { getSession } from "@/lib/auth/session";
import { mockGetDealUrl, mockLogClick } from "@/lib/mock/store";
import { supabaseGetDealUrl, supabaseLogClick } from "@/lib/supabase/queries/deals";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dealId: string }> }
) {
  const { dealId } = await params;

  if (isMockMode()) {
    const targetUrl = mockGetDealUrl(dealId);
    if (!targetUrl) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    mockLogClick(dealId);
    return NextResponse.redirect(targetUrl, 302);
  }

  const targetUrl = await supabaseGetDealUrl(dealId);
  if (!targetUrl) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const session = await getSession();
  await supabaseLogClick(dealId, session?.id);
  return NextResponse.redirect(targetUrl, 302);
}
