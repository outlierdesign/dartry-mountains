import { Metadata } from "next";
import { fetchStory } from "@/lib/storyblok";
import StoryblokPage from "@/components/shared/StoryblokPage";
import HomeFallback from "@/components/fallback/HomeFallback";

export const metadata: Metadata = {
  title: "Dartry Mountains — Conservation, Habitats & Responsible Tourism",
  description:
    "Explore the Dartry Mountains in Sligo and Leitrim, Ireland. A Special Protection Area for chough and peregrine falcon, a Special Area of Conservation with rare grasslands and peatlands, and a landscape shaped by generations of hill farming. Visit responsibly.",
  keywords: [
    "Dartry Mountains",
    "Benbulben",
    "chough habitat",
    "peregrine falcon",
    "responsible tourism",
    "conservation Ireland",
    "Special Protection Area",
    "Special Area of Conservation",
    "hill farming Sligo",
    "species-rich grassland",
    "peatland conservation",
    "Sligo mountains",
    "Leitrim mountains",
    "wildlife Ireland",
    "ecotourism northwest Ireland",
  ],
  openGraph: {
    title: "Dartry Mountains — Conservation & Responsible Tourism",
    description:
      "An iconic mountain range in Sligo & Leitrim. Protected chough and peregrine habitats, rare grasslands, and a rich hill-farming heritage. Visit responsibly.",
    type: "website",
    url: "https://dartrymountains.ie",
    images: [
      {
        url: "/images/landscapes/benbulben.jpg",
        width: 1200,
        height: 630,
        alt: "Benbulben and the Dartry Mountains",
      },
    ],
  },
  alternates: {
    canonical: "https://dartrymountains.ie",
  },
};

export const revalidate = 60;

export default async function HomePage() {
  const story = await fetchStory("home");
  if (!story) return <HomeFallback />;
  return <StoryblokPage story={story} />;
}
