import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const routes = [
  "",
  "/about",
  "/contact",
  "/products",
  "/products/cata",
  "/products/cata/support",
  "/products/cata/faq",
  "/products/cata/terms",
  "/products/cata/delete-account",
  "/products/cata/privacy",
  "/services",
  "/legal",
  "/legal/privacy",
  "/legal/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
