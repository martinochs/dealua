import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { MockBannerWrapper } from "@/components/layout/MockBannerWrapper";
import { StickySubmitCta } from "@/components/layout/StickySubmitCta";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <MockBannerWrapper />
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-5 pb-24">{children}</main>
      <Footer />
      <StickySubmitCta />
    </div>
  );
}
