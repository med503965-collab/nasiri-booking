import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { STORE } from "@/lib/store-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: STORE.siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${STORE.siteUrl}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${STORE.siteUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${STORE.siteUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${STORE.siteUrl}/track`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${STORE.siteUrl}/products/${product.slug}`,
    lastModified: product.created_at,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
