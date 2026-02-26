// Main block components
import heroSection from './hero_section.json';
import editorialStory from './editorial_story.json';
import imageTextSplit from './image_text_split.json';
import partnerGrid from './partner_grid.json';
import timeline from './timeline.json';
import mapSection from './map_section.json';
import educationModule from './education_module.json';
import quoteBlock from './quote_block.json';
import ctaBlock from './cta_block.json';
import newsCards from './news_cards.json';
import statsHighlight from './stats_highlight.json';
import videoCard from './video_card.json';

// Sub-component schemas
import statItem from './stat_item.json';
import partnerItem from './partner_item.json';
import timelineMilestone from './timeline_milestone.json';
import educationItem from './education_item.json';
import newsCardItem from './news_card_item.json';
import mapLayer from './map_layer.json';

/**
 * All Storyblok component schemas
 * Includes both main block components and nested sub-components
 */
export const storyblokSchemas = {
  // Main block components
  heroSection,
  editorialStory,
  imageTextSplit,
  partnerGrid,
  timeline,
  mapSection,
  educationModule,
  quoteBlock,
  ctaBlock,
  newsCards,
  statsHighlight,
  videoCard,
  
  // Sub-components
  statItem,
  partnerItem,
  timelineMilestone,
  educationItem,
  newsCardItem,
  mapLayer,
};

/**
 * Main block components array (for registration)
 */
export const mainBlockComponents = [
  heroSection,
  editorialStory,
  imageTextSplit,
  partnerGrid,
  timeline,
  mapSection,
  educationModule,
  quoteBlock,
  ctaBlock,
  newsCards,
  statsHighlight,
  videoCard,
];

/**
 * Sub-component schemas array
 */
export const subComponents = [
  statItem,
  partnerItem,
  timelineMilestone,
  educationItem,
  newsCardItem,
  mapLayer,
];

/**
 * All components array (main + sub)
 */
export const allComponents = [...mainBlockComponents, ...subComponents];

// Export individual schemas for direct access
export {
  // Main block components
  heroSection,
  editorialStory,
  imageTextSplit,
  partnerGrid,
  timeline,
  mapSection,
  educationModule,
  quoteBlock,
  ctaBlock,
  newsCards,
  statsHighlight,
  videoCard,
  
  // Sub-components
  statItem,
  partnerItem,
  timelineMilestone,
  educationItem,
  newsCardItem,
  mapLayer,
};

export default storyblokSchemas;
