import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

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

export const components = {
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
