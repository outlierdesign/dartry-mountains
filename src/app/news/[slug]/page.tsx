import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchStory } from "@/lib/storyblok";

export const revalidate = 60;

type PageParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await fetchStory(`news/${slug}`);

  if (!story) {
    return {
      title: "Article not found | Dartry Mountains",
    };
  }

  return {
    title: `${story.name} | Dartry Mountains`,
    description:
      story.content?.excerpt ||
      story.content?.description ||
      "Read this article about the Dartry Mountains.",
    openGraph: {
      title: story.name,
      description:
        story.content?.excerpt ||
        story.content?.description ||
        "Read this article about the Dartry Mountains.",
      type: "article",
      images: story.content?.image?.filename
        ? [
            {
              url: story.content.image.filename,
              width: 1200,
              height: 630,
              alt: story.name,
            },
          ]
        : undefined,
    },
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const story = await fetchStory(`news/${slug}`);

  if (!story) {
    notFound();
  }

  const publishDate =
    story.first_published_at || story.created_at || new Date().toISOString();

  return (
    <main>
      {/* Header Section */}
      <section className="section-cream section-padding">
        <div className="container-narrow">
          <div className="mb-4">
            <p className="label-eyebrow">{formatDate(publishDate)}</p>
          </div>
          <h1 className="heading-display">{story.name}</h1>
          {story.content?.author && (
            <p className="text-muted-foreground mt-4">
              By {story.content.author}
            </p>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {story.content?.image?.filename && (
        <section className="section-light">
          <div className="container-wide">
            <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
              <Image
                src={story.content.image.filename}
                alt={story.content?.image?.alt || story.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="section-light section-padding">
        <div className="container-narrow">
          <article className="prose-dartry">
            <p className="text-foreground">
              Article content will be loaded from CMS.
            </p>
            {story.content?.body && (
              <div className="mt-8 text-foreground">
                <p>
                  {typeof story.content.body === "string"
                    ? story.content.body
                    : JSON.stringify(story.content.body)}
                </p>
              </div>
            )}
          </article>

          {/* Tags */}
          {story.content?.tags && story.content.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-stone-200">
              <div className="flex flex-wrap gap-2">
                {story.content.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 text-xs font-medium bg-moss-100 text-moss-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-stone-200">
            <Link
              href="/news"
              className="inline-flex items-center text-gold-500 hover:text-gold-600 font-medium transition-colors"
            >
              ← Back to News
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
