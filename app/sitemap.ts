import type { MetadataRoute } from "next";
import { routes, siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap { return routes.map((route) => ({ url: `${siteUrl}/${route}`.replace(/\/$/, route ? "" : "/"), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route.includes("strumenti") || route === "crea-cv" ? .9 : .7 })); }
