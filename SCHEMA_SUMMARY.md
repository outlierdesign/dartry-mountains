# Storyblok Component Schemas - Summary

All 18 component schema files have been successfully created in:
`/sessions/quirky-vigilant-mendel/dartry-mountains/src/types/storyblok-schemas/`

## Created Files

### Main Block Components (12 files)
- ✓ hero_section.json (3.0 KB)
- ✓ editorial_story.json (2.1 KB)
- ✓ image_text_split.json (1.9 KB)
- ✓ partner_grid.json (1.5 KB)
- ✓ timeline.json (1.5 KB)
- ✓ map_section.json (2.3 KB)
- ✓ education_module.json (1.5 KB)
- ✓ quote_block.json (1.5 KB)
- ✓ cta_block.json (1.7 KB)
- ✓ news_cards.json (1.3 KB)
- ✓ stats_highlight.json (1.3 KB)
- ✓ video_card.json (1.6 KB)

### Sub-Component Schemas (6 files)
- ✓ stat_item.json (460 B)
- ✓ partner_item.json (735 B)
- ✓ timeline_milestone.json (619 B)
- ✓ education_item.json (1.1 KB)
- ✓ news_card_item.json (835 B)
- ✓ map_layer.json (1007 B)

### Index & Documentation (2 files)
- ✓ index.ts (2.4 KB) - TypeScript index with all exports
- ✓ README.md - Complete documentation

## Total: 20 Files

## Component Field Summary

### Hero Section (11 fields)
- variant (option: cinematic/split/video/map)
- heading, subheading, eyebrow (text/textarea)
- image (asset), video_url (text)
- overlay_opacity (number)
- show_scroll_indicator (boolean)
- cta_label, cta_link, cta_secondary_label, cta_secondary_link
- stats (bloks), background_color, spacing

### Editorial Story (7 fields)
- eyebrow, heading (text)
- content (richtext)
- image (asset)
- image_position (option: left/right/none)
- pull_quote, pull_quote_attribution (textarea/text)
- background_color, spacing

### Image Text Split (7 fields)
- eyebrow, heading (text)
- content (richtext)
- image (asset)
- image_position (option: left/right)
- caption (text)
- background_color, spacing

### Partner Grid (4 fields)
- heading (text)
- description (textarea)
- partners (bloks)
- background_color, spacing

### Timeline (4 fields)
- heading (text)
- description (textarea)
- milestones (bloks)
- background_color, spacing

### Map Section (8 fields)
- heading, description (text/textarea)
- center_lat, center_lng, zoom (number)
- show_spa_boundary, show_sac_boundary (boolean)
- layers (bloks)
- background_color, spacing

### Education Module (4 fields)
- heading (text)
- description (textarea)
- items (bloks)
- background_color, spacing

### Quote Block (5 fields)
- quote (textarea)
- attribution, role (text)
- show_texture (boolean)
- background_color, spacing

### CTA Block (7 fields)
- heading, description (text/textarea)
- cta_label, cta_link (text/multilink)
- cta_secondary_label, cta_secondary_link (text/multilink)
- background_color, spacing

### News Cards (3 fields)
- heading (text)
- cards (bloks)
- background_color, spacing

### Stats Highlight (3 fields)
- heading (text)
- stats (bloks)
- background_color, spacing

### Video Card (6 fields)
- title, description (text/textarea)
- video_url (text)
- preview_image (asset)
- transcript (textarea)
- background_color, spacing

## Sub-Component Structures

### Stat Item (3 fields)
- label, value (text)
- suffix (text)

### Partner Item (5 fields)
- name (text)
- logo (asset)
- description (textarea)
- website (multilink)
- detail (richtext)

### Timeline Milestone (4 fields)
- date, title (text)
- description (textarea)
- detail (richtext)

### Education Item (5 fields)
- title (text)
- scientific_name (text)
- description (textarea)
- image (asset)
- type (option: species/habitat/geology/heritage)

### News Card Item (6 fields)
- title (text)
- image (asset)
- tag (text)
- date (text)
- excerpt (textarea)
- link (multilink)

### Map Layer (4 fields)
- id, label (text)
- type (option: flora/fauna/heritage/geology)
- visible (boolean)

## Key Features

✓ All schemas follow Storyblok component format
✓ Proper field typing and validation rules
✓ Component restrictions for nested bloks
✓ Common styling fields (background_color, spacing)
✓ Accessibility notes for all asset fields
✓ Helper descriptions for complex fields
✓ TypeScript index file with multiple export patterns
✓ Complete README documentation

## Import Patterns

The index.ts file provides multiple import options:

```typescript
// Option 1: Import the combined object
import { storyblokSchemas } from '@/types/storyblok-schemas';

// Option 2: Import specific arrays
import { mainBlockComponents, subComponents } from '@/types/storyblok-schemas';

// Option 3: Import individual schemas
import { heroSection, editorialStory } from '@/types/storyblok-schemas';

// Option 4: Import default export
import storyblokSchemas from '@/types/storyblok-schemas';
```

All files are ready for integration with Storyblok CMS!
