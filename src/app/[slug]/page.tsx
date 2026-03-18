import { Metadata } from "next";
import { fetchStory, fetchAllStories } from "@/lib/storyblok";
import StoryblokPage from "@/components/shared/StoryblokPage";
import HomeFallback from "@/components/fallback/HomeFallback";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate dynamic metadata for each content page.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await fetchStory(slug);

  if (!story) {
    return { title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) };
  }

  const title = story.content?.seo_title || story.name || slug;
  const description =
    story.content?.seo_description ||
    story.content?.description ||
    story.content?.excerpt ||
    `Learn about ${story.name} in the Dartry Mountains conservation area.`;
  const image = story.content?.image?.filename || "/images/landscapes/benbulben.jpg";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Dartry Mountains`,
      description,
      type: "article",
      url: `https://dartrymountains.ie/${slug}`,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    alternates: {
      canonical: `https://dartrymountains.ie/${slug}`,
    },
  };
}

/**
 * Dynamic route that renders Storyblok stories by slug.
 * Handles /home specifically (redirecting to the home story)
 * and any other future Storyblok pages.
 */
export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;

  const story = await fetchStory(slug);

  // If the slug is "home" and Storyblok returns the story, render it
  // (this is needed for the Storyblok visual editor which navigates to /home)
  if (story) {
    return <StoryblokPage story={story} />;
  }

  // For "home" slug, fall back to HomeFallback if Storyblok is unreachable
  if (slug === "home") {
    return <HomeFallback />;
  }

  notFound();
}

/**
 * Generate static params for known Storyblok stories.
 */
export async function generateStaticParams() {
  const stories = await fetchAllStories();
  return stories
    .filter((s: any) => s.slug !== "home") // home is handled by root page.tsx
    .map((s: any) => ({ slug: s.slug }));
}
