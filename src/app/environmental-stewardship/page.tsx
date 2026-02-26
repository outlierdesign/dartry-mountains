import { Metadata } from "next";
import { fetchStory } from "@/lib/storyblok";
import StoryblokPage from "@/components/shared/StoryblokPage";
import HeroSection from "@/components/storyblok/HeroSection";

export const metadata: Metadata = {
  title: "Environmental Stewardship | Dartry Mountains",
  description:
    "Protecting the habitats, species, and landscapes that make the Dartry Mountains a site of European conservation importance.",
};

export const revalidate = 60;

export default async function EnvironmentalStewardshipPage() {
  const story = await fetchStory("environmental-stewardship");

  if (!story) {
    return (
      <main className="w-full">
        <HeroSection
          variant="split"
          heading="Environmental Stewardship"
          subheading="Content is managed through Storyblok CMS."
          eyebrow="Protected Areas"
        />
      </main>
    );
  }

  return <StoryblokPage story={story} />;
}
