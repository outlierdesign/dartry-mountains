import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dartrymountains.ie";

  // Static pages with priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  let newsPages: MetadataRoute.Sitemap = [];
  let contentPages: MetadataRoute.Sitemap = [];

  try {
    const token = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;
    if (token) {
      // Fetch news stories
      const newsRes = await fetch(
        `https://api.storyblok.com/v2/cdn/stories?starts_with=news/&token=${token}&version=draft`,
        { next: { revalidate: 3600 } }
      );
      const newsData = await newsRes.json();
      if (newsData?.stories) {
        newsPages = newsData.stories.map((story: any) => ({
          url: `${baseUrl}/news/${story.slug}`,
          lastModified: new Date(story.published_at || story.created_at),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }));
      }

      // Fetch all top-level content pages (e.g. /coir-logs, /reprofiling-peat-banks)
      const allRes = await fetch(
        `https://api.storyblok.com/v2/cdn/stories?token=${token}&version=draft&excluding_slugs=home`,
        { next: { revalidate: 3600 } }
      );
      const allData = await allRes.json();
      if (allData?.stories) {
        contentPages = allData.stories
          .filter((s: any) => s.slug !== "home" && !s.full_slug.startsWith("news/"))
          .map((story: any) => ({
            url: `${baseUrl}/${story.slug}`,
            lastModified: new Date(story.published_at || story.created_at),
            changeFrequency: "monthly" as const,
            priority: 0.5,
          }));
      }
    }
  } catch (e) {
    console.warn("Sitemap: failed to fetch stories", e);
  }

  return [...staticPages, ...contentPages, ...newsPages];
}
