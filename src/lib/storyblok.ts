import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react/rsc";

// Core components
import HeroSection from "@/components/storyblok/HeroSection";
import EditorialStory from "@/components/storyblok/EditorialStory";
import ParallaxBreak from "@/components/storyblok/ParallaxBreak";
import VideoEmbed from "@/components/storyblok/VideoEmbed";
import StatsBar from "@/components/storyblok/StatsBar";
import QuoteBlock from "@/components/storyblok/QuoteBlock";
import CTABlock from "@/components/storyblok/CTABlock";
import NewsCards from "@/components/storyblok/NewsCards";
import MapSection from "@/components/storyblok/MapSection";

// Content-specific components
import HabitatCards from "@/components/storyblok/HabitatCards";
import SpeciesProfiles from "@/components/storyblok/SpeciesProfiles";
import FarmingSection from "@/components/storyblok/FarmingSection";
import VisitResponsibly from "@/components/storyblok/VisitResponsibly";
import ResourceLinks from "@/components/storyblok/ResourceLinks";
import GalleryGrid from "@/components/storyblok/GalleryGrid";
import ProtectedAreas from "@/components/storyblok/ProtectedAreas";

// Legacy components (kept for backward compatibility)
import ImageTextSplit from "@/components/storyblok/ImageTextSplit";
import PartnerGrid from "@/components/storyblok/PartnerGrid";
import Timeline from "@/components/storyblok/Timeline";
import EducationModule from "@/components/storyblok/EducationModule";
import StatsHighlight from "@/components/storyblok/StatsHighlight";
import VideoCard from "@/components/storyblok/VideoCard";

export const components: Record<string, React.ComponentType<any>> = {
  // New v2 components
  hero_section: HeroSection,
  editorial_story: EditorialStory,
  parallax_break: ParallaxBreak,
  video_embed: VideoEmbed,
  stats_bar: StatsBar,
  quote_block: QuoteBlock,
  cta_block: CTABlock,
  news_cards: NewsCards,
  map_section: MapSection,
  habitat_cards: HabitatCards,
  species_profiles: SpeciesProfiles,
  farming_section: FarmingSection,
  visit_responsibly: VisitResponsibly,
  resource_links: ResourceLinks,
  gallery_grid: GalleryGrid,
  protected_areas: ProtectedAreas,

  // Legacy (backward compatibility)
  image_text_split: ImageTextSplit,
  partner_grid: PartnerGrid,
  timeline: Timeline,
  education_module: EducationModule,
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
 * Uses "draft" by default so the visual editor preview shows unsaved changes.
 * Published site uses ISR caching so draft fetches don't affect performance.
 */
export async function fetchStory(
  slug: string,
  version: "published" | "draft" = "draft"
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
