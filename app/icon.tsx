import { ImageResponse } from "next/og";
import { LOGO_HEIGHT, LOGO_WIDTH, getLogoDataUrl } from "@/lib/brand-icon";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const src = await getLogoDataUrl();
  const scale = size.height / LOGO_HEIGHT;
  const imgWidth = LOGO_WIDTH * scale;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          background: "#ffffff",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <img src={src} width={imgWidth} height={size.height} alt="" />
      </div>
    ),
    { ...size }
  );
}
