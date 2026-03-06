import { Metadata } from "next";
import { fetchStory } from "@/lib/storyblok";
import StoryblokPage from "@/components/shared/StoryblokPage";
import HomeFallback from "@/components/fallback/HomeFallback";

export const metadata: Metadata = {
  title: "Dartry Mountains | Exploring Ireland's Mountain Landscape",
  description:
    "Discover the Dartry Mountains, a Special Protection Area and Special Area of Conservation in Counties Sligo and Leitrim, Ireland. Explore its unique ecology, heritage, and conservation efforts.",
  openGraph: {
    title: "Dartry Mountains",
    description:
      "A Special Protection Area and Special Area of Conservation in Counties Sligo and Leitrim, Ireland",
    type: "website",
  },
};

export const revalidate = 60;

export default async function HomePage() {
  const story = await fetchStory("home");
  if (!story) return <HomeFallback />;
  return <StoryblokPage story={story} />;
}
