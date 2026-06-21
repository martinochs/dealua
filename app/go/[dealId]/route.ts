import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getDealOutboundUrl, logDealClick } from "@/lib/queries/deals";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dealId: string }> }
) {
  const { dealId } = await params;

  const targetUrl = await getDealOutboundUrl(dealId);
  if (!targetUrl) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const session = await getSession();
  await logDealClick(dealId, session?.id);
  return NextResponse.redirect(targetUrl, 302);
}
