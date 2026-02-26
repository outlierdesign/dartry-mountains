import { Metadata } from "next";
import { fetchStory } from "@/lib/storyblok";
import StoryblokPage from "@/components/shared/StoryblokPage";
import HeroSection from "@/components/storyblok/HeroSection";

export const metadata: Metadata = {
  title: "The Project | Dartry Mountains",
  description:
    "Learn about the collaborative conservation initiative protecting the Dartry Mountains.",
};

export const revalidate = 60;

export default async function TheProjectPage() {
  const story = await fetchStory("the-project");

  if (!story) {
    return (
      <main className="w-full">
        <HeroSection
          variant="cinematic"
          heading="The Project"
          subheading="Content is managed through Storyblok CMS."
          eyebrow="Conservation in Action"
        />
      </main>
    );
  }

  return <StoryblokPage story={story} />;
}
