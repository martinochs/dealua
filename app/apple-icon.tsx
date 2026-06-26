import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const BRAND_BLUE = "#0057B7";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_BLUE,
          borderRadius: 36,
          color: "#ffffff",
          fontSize: 96,
          fontWeight: 800,
        }}
      >
        %
      </div>
    ),
    { ...size }
  );
}
