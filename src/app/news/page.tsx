import { Metadata } from "next";
import { getStoryblokApi } from "@storyblok/react/rsc";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "News & Conservation Updates",
  description:
    "Latest news, conservation updates and stories from the Dartry Mountains. Follow chough monitoring, habitat restoration, farming partnerships, and responsible tourism initiatives in this Special Protection Area.",
  keywords: [
    "Dartry Mountains news",
    "conservation updates Ireland",
    "chough monitoring",
    "habitat restoration Sligo",
    "hill farming conservation",
    "responsible tourism news",
    "Benbulben updates",
  ],
  openGraph: {
    title: "News & Conservation Updates | Dartry Mountains",
    description:
      "Latest conservation news and stories from the Dartry Mountains SPA and SAC.",
    type: "website",
    url: "https://dartrymountains.ie/news",
  },
  alternates: {
    canonical: "https://dartrymountains.ie/news",
  },
};

export const revalidate = 60;

async function fetchBlogPosts() {
  const token = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      starts_with: "news/",
      sort_by: "first_published_at:desc",
    });
    return data?.stories ?? [];
  } catch (e) {
    console.warn("Failed to fetch blog posts:", e);
    return [];
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsPage() {
  const stories = await fetchBlogPosts();

  return (
    <main>
      {/* Header Section */}
      <section className="section-cream section-padding pt-32">
        <div className="container-content">
          <div className="mb-4">
            <p className="label-eyebrow">Latest from the Dartry Mountains</p>
          </div>
          <h1 className="heading-section">News & Conservation Updates</h1>
          <p className="mt-4 text-sm text-stone-500 max-w-2xl leading-relaxed">
            Follow conservation efforts, habitat restoration, farming partnerships, and responsible tourism initiatives across the Dartry Mountains.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-light section-padding">
        <div className="container-content">
          {stories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story: any) => (
                <Link
                  key={story.uuid}
                  href={'/news/' + story.slug}
                  className="card-rounded group"
                >
                  <article className="h-full flex flex-col bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all">
                    {/* Image Area */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-moss-50 to-earth-100">
                      {story.content?.image?.filename ? (
                        <Image
                          src={story.content.image.filename}
                          alt={story.content?.image?.alt || story.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-moss-200 to-gold-200 opacity-30" />
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col p-6">
                      <div className="flex-1">
                        <p className="text-sm text-stone-500 mb-2">
                          {formatDate(story.first_published_at || story.created_at)}
                        </p>
                        <h2 className="font-display text-xl font-light mb-2 text-foreground">
                          {story.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {story.content?.excerpt ||
                            story.content?.description ||
                            "Read more about this story."}
                        </p>
                      </div>
                      <div className="mt-4 text-gold-500 font-medium text-sm group-hover:text-gold-600 transition-colors">
                        Read more →
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No news articles yet. Check back soon for updates about the
                Dartry Mountains.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
