import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/gallery",
    "/heritage",
    "/about",
    "/blog",
    "/video",
    "/team",
    "/contact",
  ];

  const galleryCategories = ["main-doors", "furniture", "tudal", "samples"];

  const blogSlugs = [
    "history-of-wood-carving",
    "tools-used-in-wood-carving",
    "care-and-maintenance-of-wooden-art",
    "types-of-wood-for-carving",
    "wood-carving-in-cultural-tourism",
    "starting-a-wood-carving-business",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/shop" ? 0.9 : 0.7,
  }));

  galleryCategories.forEach((slug) => {
    entries.push({
      url: `${SITE_URL}/gallery/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  blogSlugs.forEach((slug) => {
    entries.push({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  return entries;
}
