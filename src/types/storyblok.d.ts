import type { SbBlokData } from "@storyblok/react/rsc";

/* ============================================
   STORYBLOK BLOCK TYPES
   ============================================ */

export interface StoryblokLink {
  id: string;
  url: string;
  linktype: "url" | "story" | "email";
  fieldtype: "multilink";
  cached_url: string;
}

export interface StoryblokAsset {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  filename: string;
  copyright: string;
  fieldtype: "asset";
}

export type SpacingVariant = "default" | "compact" | "large";
export type BackgroundVariant = "default" | "muted" | "earth" | "moss" | "dark";

/** Common fields shared by all blocks */
export interface BaseBlok extends SbBlokData {
  background_color?: BackgroundVariant;
  spacing?: SpacingVariant;
}

/** Hero Section — 4 variants */
export interface HeroSectionBlok extends BaseBlok {
  component: "hero_section";
  variant: "cinematic" | "split" | "video" | "map";
  heading: string;
  subheading?: string;
  eyebrow?: string;
  image?: StoryblokAsset;
  video_url?: string;
  overlay_opacity?: number;
  show_scroll_indicator?: boolean;
  cta_label?: string;
  cta_link?: StoryblokLink;
  cta_secondary_label?: string;
  cta_secondary_link?: StoryblokLink;
  stats?: StatItem[];
}

export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
}

/** Editorial Story Block */
export interface EditorialStoryBlok extends BaseBlok {
  component: "editorial_story";
  eyebrow?: string;
  heading?: string;
  content: string; // richtext
  image?: StoryblokAsset;
  image_position?: "left" | "right" | "none";
  pull_quote?: string;
  pull_quote_attribution?: string;
}

/** Image + Text Split */
export interface ImageTextSplitBlok extends BaseBlok {
  component: "image_text_split";
  heading: string;
  content: string; // richtext
  image: StoryblokAsset;
  image_position: "left" | "right";
  caption?: string;
  eyebrow?: string;
}

/** Partner Grid */
export interface PartnerBlok {
  name: string;
  logo?: StoryblokAsset;
  description: string;
  website?: StoryblokLink;
  detail?: string; // richtext for accordion
}

export interface PartnerGridBlok extends BaseBlok {
  component: "partner_grid";
  heading: string;
  description?: string;
  partners: PartnerBlok[];
}

/** Timeline */
export interface TimelineMilestone {
  date: string;
  title: string;
  description: string;
  detail?: string; // richtext
}

export interface TimelineBlok extends BaseBlok {
  component: "timeline";
  heading: string;
  description?: string;
  milestones: TimelineMilestone[];
}

/** Map Section */
export interface MapSectionBlok extends BaseBlok {
  component: "map_section";
  heading: string;
  description?: string;
  center_lat: number;
  center_lng: number;
  zoom: number;
  show_spa_boundary?: boolean;
  show_sac_boundary?: boolean;
  layers?: MapLayer[];
}

export interface MapLayer {
  id: string;
  label: string;
  type: "flora" | "fauna" | "heritage" | "geology";
  visible?: boolean;
}

/** Education Module */
export interface EducationModuleBlok extends BaseBlok {
  component: "education_module";
  heading: string;
  description?: string;
  items: EducationItem[];
}

export interface EducationItem {
  title: string;
  scientific_name?: string;
  description: string;
  image?: StoryblokAsset;
  type: "species" | "habitat" | "geology" | "heritage";
}

/** Quote Block */
export interface QuoteBlockBlok extends BaseBlok {
  component: "quote_block";
  quote: string;
  attribution?: string;
  role?: string;
  show_texture?: boolean;
}

/** CTA Block */
export interface CTABlockBlok extends BaseBlok {
  component: "cta_block";
  heading: string;
  description?: string;
  cta_label: string;
  cta_link: StoryblokLink;
  cta_secondary_label?: string;
  cta_secondary_link?: StoryblokLink;
}

/** News Cards */
export interface NewsCardItem {
  title: string;
  image?: StoryblokAsset;
  tag?: string;
  date: string;
  excerpt: string;
  link: StoryblokLink;
}

export interface NewsCardsBlok extends BaseBlok {
  component: "news_cards";
  heading: string;
  cards: NewsCardItem[];
}

/** Stats Highlight */
export interface StatsHighlightBlok extends BaseBlok {
  component: "stats_highlight";
  heading?: string;
  stats: StatItem[];
}

/** Video Card */
export interface VideoCardBlok extends BaseBlok {
  component: "video_card";
  title: string;
  description?: string;
  video_url: string;
  preview_image: StoryblokAsset;
  transcript?: string;
}
