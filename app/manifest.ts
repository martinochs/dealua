import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VyhodaDeal",
    short_name: "VyhodaDeal",
    description: "Найкращі пропозиції. Щодня.",
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
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
