import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "usx",
    short_name: "usx",
    description: "E-commerce moderno com Next.js 14",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#0f172a",
    icons: [     
    ],
  };
}
