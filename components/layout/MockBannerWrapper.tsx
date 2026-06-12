import { isMockMode } from "@/lib/config";
import { MockBanner } from "./MockBanner";

export function MockBannerWrapper() {
  if (!isMockMode()) return null;
  return <MockBanner />;
}
