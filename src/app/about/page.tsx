import { Metadata } from "next";
import { fetchStory } from "@/lib/storyblok";
import StoryblokPage from "@/components/shared/StoryblokPage";
import HeroSection from "@/components/storyblok/HeroSection";

export const metadata: Metadata = {
  title: "About | Dartry Mountains",
  description:
    "Learn about the geography, ecology, and heritage of the Dartry Mountains in Counties Sligo and Leitrim, Ireland.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const story = await fetchStory("about");

  if (!story) {
    return (
      <main className="w-full">
        <HeroSection
          variant="split"
          heading="About the Dartry Mountains"
          subheading="Content is managed through Storyblok CMS."
          eyebrow="About"
        />
      </main>
    );
  }

  return <StoryblokPage story={story} />;
}
