import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VygodaUA",
    short_name: "VygodaUA",
    description: "вигідні пропозиції щодня",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0057B7",
    lang: "uk",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
