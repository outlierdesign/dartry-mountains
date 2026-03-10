import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dartrymountains.ie";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Dynamic news posts from Storyblok
  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const token = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;
    if (token) {
      const res = await fetch(
        `https://api.storyblok.com/v2/cdn/stories?starts_with=news/&token=${token}&version=draft`,
        { next: { revalidate: 3600 } }
      );
      const data = await res.json();
      if (data?.stories) {
        newsPages = data.stories.map((story: any) => ({
          url: `${baseUrl}/news/${story.slug}`,
          lastModified: new Date(story.published_at || story.created_at),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }));
      }
    }
  } catch (e) {
    console.warn("Sitemap: failed to fetch news stories", e);
  }

  return [...staticPages, ...newsPages];
}
