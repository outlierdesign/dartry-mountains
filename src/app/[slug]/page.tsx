import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchStory, fetchAllStories } from "@/lib/storyblok";
import StoryblokPage from "@/components/shared/StoryblokPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const stories = await fetchAllStories();
  // Exclude pages that have dedicated routes
  const dedicatedSlugs = ["home", "about", "the-project", "environmental-stewardship"];
  return stories
    .filter((s: any) => !dedicatedSlugs.includes(s.slug))
    .map((s: any) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await fetchStory(slug);

  if (!story) {
    const title = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return { title: `${title} | Dartry Mountains` };
  }

  return {
    title: `${story.name} | Dartry Mountains`,
    description: story.content?.meta_description || `Learn more about ${story.name} at the Dartry Mountains.`,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const story = await fetchStory(slug);

  if (!story) {
    notFound();
  }

  return <StoryblokPage story={story} />;
}
