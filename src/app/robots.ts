import type { MetadataRoute } from "next";
import { STORE } from "@/lib/store-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/account", "/cart", "/checkout"],
    },
    sitemap: `${STORE.siteUrl}/sitemap.xml`,
  };
}
