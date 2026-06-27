import { ImageResponse } from "next/og";
import { FOX_CROP_WIDTH, LOGO_HEIGHT, LOGO_WIDTH, getLogoDataUrl } from "@/lib/brand-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const src = await getLogoDataUrl();
  const foxHeight = 150;
  const scale = foxHeight / LOGO_HEIGHT;
  const imgWidth = LOGO_WIDTH * scale;
  const foxWidth = FOX_CROP_WIDTH * scale;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            width: foxWidth,
            height: foxHeight,
            display: "flex",
            overflow: "hidden",
          }}
        >
          <img src={src} width={imgWidth} height={foxHeight} alt="" />
        </div>
      </div>
    ),
    { ...size }
  );
}
