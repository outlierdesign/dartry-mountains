import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react/rsc";

import HeroSection from "@/components/storyblok/HeroSection";
import EditorialStory from "@/components/storyblok/EditorialStory";
import ImageTextSplit from "@/components/storyblok/ImageTextSplit";
import PartnerGrid from "@/components/storyblok/PartnerGrid";
import Timeline from "@/components/storyblok/Timeline";
import MapSection from "@/components/storyblok/MapSection";
import EducationModule from "@/components/storyblok/EducationModule";
import QuoteBlock from "@/components/storyblok/QuoteBlock";
import CTABlock from "@/components/storyblok/CTABlock";
import NewsCards from "@/components/storyblok/NewsCards";
import StatsHighlight from "@/components/storyblok/StatsHighlight";
import VideoCard from "@/components/storyblok/VideoCard";

export const components: Record<string, React.ComponentType<any>> = {
  hero_section: HeroSection,
  editorial_story: EditorialStory,
  image_text_split: ImageTextSplit,
  partner_grid: PartnerGrid,
  timeline: Timeline,
  map_section: MapSection,
  education_module: EducationModule,
  quote_block: QuoteBlock,
  cta_block: CTABlock,
  news_cards: NewsCards,
  stats_highlight: StatsHighlight,
  video_card: VideoCard,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
});

/**
 * Fetch a story from Storyblok by slug.
 * Returns null if the story is not found or if the token is not configured.
 * Set version to "draft" for the visual editor preview.
 */
export async function fetchStory(
  slug: string,
  version: "published" | "draft" = "published"
) {
  const token = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;
  if (!token) {
    console.warn("Storyblok access token not configured");
    return null;
  }

  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version,
    });
    return data?.story ?? null;
  } catch (e) {
    console.warn(`Failed to fetch story "${slug}":`, e);
    return null;
  }
}

/**
 * Fetch all published stories (for generating static params).
 */
export async function fetchAllStories() {
  const token = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "published",
      starts_with: "",
    });
    return data?.stories ?? [];
  } catch (e) {
    console.warn("Failed to fetch stories:", e);
    return [];
  }
}
