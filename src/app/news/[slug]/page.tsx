import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchStory } from "@/lib/storyblok";
import RichTextRenderer from "@/components/shared/RichTextRenderer";

export const revalidate = 60;

type PageParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await fetchStory('news/' + slug);

  if (!story) {
    return { title: "Article not found | Dartry Mountains" };
  }

  const description =
    story.content?.excerpt ||
    story.content?.description ||
    "Read this article about conservation and responsible tourism in the Dartry Mountains.";

  return {
    title: story.name,
    description,
    openGraph: {
      title: story.name + " | Dartry Mountains",
      description,
      type: "article",
      publishedTime: story.first_published_at || story.created_at,
      authors: story.content?.author ? [story.content.author] : undefined,
      url: 'https://dartrymountains.ie/news/' + slug,
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
    alternates: {
      canonical: 'https://dartrymountains.ie/news/' + slug,
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
  const story = await fetchStory('news/' + slug);

  if (!story) {
    notFound();
  }

  const publishDate =
    story.first_published_at || story.created_at || new Date().toISOString();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.name,
    description: story.content?.excerpt || story.content?.description || "",
    image: story.content?.image?.filename || "",
    datePublished: publishDate,
    dateModified: story.updated_at || publishDate,
    author: {
      "@type": "Organization",
      name: story.content?.author || "Dartry Mountains Conservation",
    },
    publisher: {
      "@type": "Organization",
      name: "Dartry Mountains",
      url: "https://dartrymountains.ie",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": 'https://dartrymountains.ie/news/' + slug,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="section-cream section-padding pt-32">
        <div className="container-narrow">
          <div className="mb-4">
            <Link
              href="/news"
              className="text-sm text-moss-600 hover:text-moss-700 font-medium transition-colors"
            >
              ← Back to News
            </Link>
          </div>
          <p className="label-eyebrow mb-4">{formatDate(publishDate)}</p>
          <h1 className="heading-display">{story.name}</h1>
          {story.content?.author && (
            <p className="text-muted-foreground mt-4">
              By {story.content.author}
            </p>
          )}
        </div>
      </section>

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

      <section className="section-light section-padding">
        <div className="container-narrow">
          <article className="prose-dartry">
            {story.content?.body && typeof story.content.body === "object" ? (
              <RichTextRenderer content={story.content.body} />
            ) : story.content?.body && typeof story.content.body === "string" ? (
              <div>
                {story.content.body.split("\n\n").map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">
                This article is being prepared. Check back soon.
              </p>
            )}
          </article>

          {story.content?.tags && (
            <div className="mt-12 pt-8 border-t border-stone-200">
              <div className="flex flex-wrap gap-2">
                {(typeof story.content.tags === "string"
                  ? story.content.tags.split(",").map((t: string) => t.trim())
                  : story.content.tags
                ).map((tag: string, index: number) => (
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
    </div>
  );
}
