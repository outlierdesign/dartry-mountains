# Storyblok Component Schema Reference

Complete reference guide for all 18 component schemas used in the Donegal Bay SPA website.

## Quick Navigation

- [Main Block Components](#main-block-components) (12)
- [Sub-Components](#sub-components) (6)
- [Field Type Reference](#field-type-reference)
- [Usage Examples](#usage-examples)

---

## Main Block Components

### 1. Hero Section
**File:** `hero_section.json`

Full-screen hero component with multiple layout variants.

**Key Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| variant | option | No | cinematic, split, video, map |
| heading | text | Yes | Main headline |
| subheading | textarea | No | Supporting text |
| eyebrow | text | No | Pre-heading label |
| image | asset | Yes | Alt text required |
| video_url | text | No | URL for video variant |
| overlay_opacity | number | No | 0-1, default 0.4 |
| show_scroll_indicator | boolean | No | Show scroll prompt |
| cta_label | text | No | Primary button text |
| cta_link | multilink | No | Primary button link |
| cta_secondary_label | text | No | Secondary button text |
| cta_secondary_link | multilink | No | Secondary button link |
| stats | bloks | No | Restricted to stat_item |
| background_color | option | No | Color scheme |
| spacing | option | No | Layout spacing |

---

### 2. Editorial Story
**File:** `editorial_story.json`

Long-form editorial content with rich text support.

**Key Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| eyebrow | text | No | Pre-heading label |
| heading | text | Yes | Article headline |
| content | richtext | Yes | Main article text |
| image | asset | No | Optional featured image, alt text required |
| image_position | option | No | left, right, or none |
| pull_quote | textarea | No | Highlighted quote |
| pull_quote_attribution | text | No | Quote author/source |
| background_color | option | No | Color scheme |
| spacing | option | No | Layout spacing |

---

### 3. Image Text Split
**File:** `image_text_split.json`

Side-by-side image and text layout.

**Key Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| eyebrow | text | No | Pre-heading label |
| heading | text | Yes | Section headline |
| content | richtext | Yes | Body text (formatted) |
| image | asset | Yes | Alt text required |
| image_position | option | Yes | left or right |
| caption | text | No | Image caption |
| background_color | option | No | Color scheme |
| spacing | option | No | Layout spacing |

---

### 4. Partner Grid
**File:** `partner_grid.json`

Grid layout for displaying partner organizations.

**Key Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| heading | text | Yes | Section headline |
| description | textarea | No | Intro text |
| partners | bloks | No | Restricted to partner_item |
| background_color | option | No | Color scheme |
| spacing | option | No | Layout spacing |

---

### 5. Timeline
**File:** `timeline.json`

Chronological timeline visualization.

**Key Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| heading | text | Yes | Section headline |
| description | textarea | No | Intro text |
| milestones | bloks | No | Restricted to timeline_milestone |
| background_color | option | No | Color scheme |
| spacing | option | No | Layout spacing |

---

### 6. Map Section
**File:** `map_section.json`

Interactive map with configurable layers and protected area boundaries.

**Key Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| heading | text | Yes | Section headline |
| description | textarea | No | Intro text |
| center_lat | number | No | Latitude, default 54.3833 |
| center_lng | number | No | Longitude, default -8.3667 |
| zoom | number | No | Zoom level, default 11, range 0-20 |
| show_spa_boundary | boolean | No | Show Special Protected Area |
| show_sac_boundary | boolean | No | Show Special Area of Conservation |
| layers | bloks | No | Restricted to map_layer |
| background_color | option | No | Color scheme |
| spacing | option | No | Layout spacing |

---

### 7. Education Module
**File:** `education_module.json`

Educational content about species, habitats, geology, and heritage.

**Key Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| heading | text | Yes | Section headline |
| description | textarea | No | Intro text |
| items | bloks | No | Restricted to education_item |
| background_color | option | No | Color scheme |
| spacing | option | No | Layout spacing |

---

### 8. Quote Block
**File:** `quote_block.json`

Featured quote with optional attribution.

**Key Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| quote | textarea | Yes | Quote text |
| attribution | text | No | Who said it |
| role | text | No | Speaker title/role |
| show_texture | boolean | No | Add background texture |
| background_color | option | No | Color scheme |
| spacing | option | No | Layout spacing |

---

### 9. CTA Block
**File:** `cta_block.json`

Call-to-action block with up to two action buttons.

**Key Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| heading | text | Yes | Section headline |
| description | textarea | No | Supporting text |
| cta_label | text | Yes | Primary button text |
| cta_link | multilink | Yes | Primary button link |
| cta_secondary_label | text | No | Secondary button text |
| cta_secondary_link | multilink | No | Secondary button link |
| background_color | option | No | Color scheme |
| spacing | option | No | Layout spacing |

---

### 10. News Cards
**File:** `news_cards.json`

Grid of news/article cards.

**Key Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| heading | text | Yes | Section headline |
| cards | bloks | No | Restricted to news_card_item |
| background_color | option | No | Color scheme |
| spacing | option | No | Layout spacing |

---

### 11. Stats Highlight
**File:** `stats_highlight.json`

Highlighted statistics display.

**Key Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| heading | text | No | Optional section headline |
| stats | bloks | Yes | Restricted to stat_item, required |
| background_color | option | No | Color scheme |
| spacing | option | No | Layout spacing |

---

### 12. Video Card
**File:** `video_card.json`

Video player with preview image and transcript.

**Key Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | Yes | Video title |
| description | textarea | No | Video description |
| video_url | text | Yes | Video URL (YouTube, Vimeo, etc.) |
| preview_image | asset | Yes | Alt text required |
| transcript | textarea | No | Video transcript/captions |
| background_color | option | No | Color scheme |
| spacing | option | No | Layout spacing |

---

## Sub-Components

### 1. Stat Item
**File:** `stat_item.json`

Used within: Hero Section, Stats Highlight

| Field | Type | Required |
|-------|------|----------|
| label | text | Yes |
| value | text | Yes |
| suffix | text | No |

**Example:** 95% species diversity, 2020 designation year

---

### 2. Partner Item
**File:** `partner_item.json`

Used within: Partner Grid

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | text | Yes | Partner name |
| logo | asset | No | Alt text required |
| description | textarea | Yes | Partner description |
| website | multilink | No | Partner website |
| detail | richtext | No | Detailed information |

---

### 3. Timeline Milestone
**File:** `timeline_milestone.json`

Used within: Timeline

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| date | text | Yes | e.g., "2020", "Q2 2021" |
| title | text | Yes | Milestone title |
| description | textarea | Yes | What happened |
| detail | richtext | No | Extended information |

---

### 4. Education Item
**File:** `education_item.json`

Used within: Education Module

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | Yes | Item title |
| scientific_name | text | No | Scientific name (for species) |
| description | textarea | Yes | Item description |
| image | asset | No | Alt text required |
| type | option | Yes | species, habitat, geology, heritage |

---

### 5. News Card Item
**File:** `news_card_item.json`

Used within: News Cards

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | Yes | Article title |
| image | asset | No | Alt text required |
| tag | text | No | Category tag |
| date | text | Yes | Publication date |
| excerpt | textarea | Yes | Article excerpt/summary |
| link | multilink | Yes | Link to full article |

---

### 6. Map Layer
**File:** `map_layer.json`

Used within: Map Section

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | text | Yes | Unique identifier |
| label | text | Yes | Layer display name |
| type | option | Yes | flora, fauna, heritage, geology |
| visible | boolean | No | Default: true |

---

## Field Type Reference

### Text
- Single-line text input
- Used for: headings, labels, links, short values
- Examples: heading, cta_label, partner name

### Textarea
- Multi-line text input
- Used for: descriptions, excerpts, quotes, short content
- Examples: description, excerpt, pull_quote

### Richtext
- Rich text editor with formatting (bold, italic, lists, etc.)
- Used for: article content, detailed descriptions
- Examples: content, detail

### Asset
- Image/file upload
- All require alt text for accessibility
- Used for: images, logos, videos

### Bloks
- Nested component blocks
- Can be restricted to specific component types
- Used for: stats, partners, timeline items, education items, news cards, map layers

### Option
- Dropdown selection from predefined options
- Examples:
  - Background color: default, muted, earth, moss, dark
  - Spacing: default, compact, large
  - Image position: left, right, none
  - Component variants: cinematic, split, video, map

### Number
- Numeric input
- Used for: zoom levels, opacity values, coordinates

### Boolean
- Toggle/checkbox input
- Used for: visibility flags, feature enablement

### Multilink
- Link to internal page, external URL, email, or document
- Used for: navigation, CTAs, external references

---

## Usage Examples

### Importing in TypeScript

```typescript
// Import the entire schema collection
import { storyblokSchemas } from '@/types/storyblok-schemas';

// Import specific arrays
import { mainBlockComponents, subComponents } from '@/types/storyblok-schemas';

// Import individual schemas
import { heroSection, editorialStory, statItem } from '@/types/storyblok-schemas';

// Import with default
import schemas from '@/types/storyblok-schemas';
```

### Registering with Storyblok

```typescript
import { mainBlockComponents, subComponents, allComponents } from '@/types/storyblok-schemas';

// Register main blocks
mainBlockComponents.forEach(component => {
  storyblokClient.registerComponent(component.name, component);
});

// Register sub-components
subComponents.forEach(component => {
  storyblokClient.registerComponent(component.name, component);
});

// Or register all at once
allComponents.forEach(component => {
  storyblokClient.registerComponent(component.name, component);
});
```

### Accessing Schema Information

```typescript
// Get a specific component schema
const heroSchema = storyblokSchemas.heroSection;

// Access field definitions
const heading = heroSchema.schema.heading;
console.log(heading.type); // "text"
console.log(heading.required); // true

// Check nested component restrictions
const statsField = heroSchema.schema.stats;
console.log(statsField.component_whitelist); // ["stat_item"]
```

---

## Color Scheme Options

All main block components support these background colors:

| Option | Use Case |
|--------|----------|
| default | Standard white/light background |
| muted | Subtle gray background |
| earth | Warm brown/tan for natural content |
| moss | Green for environmental/nature themes |
| dark | Dark background for contrast |

---

## Spacing Options

All main block components support these spacing options:

| Option | Padding |
|--------|---------|
| default | Standard vertical padding |
| compact | Reduced padding for dense layouts |
| large | Increased padding for emphasis |

---

## Component Relationships

```
Hero Section
├── Stats (contains stat_item)
│
Editorial Story
│
Image Text Split
│
Partner Grid
├── Partners (contains partner_item)
│
Timeline
├── Milestones (contains timeline_milestone)
│
Map Section
├── Layers (contains map_layer)
│
Education Module
├── Items (contains education_item)
│
Quote Block
│
CTA Block
│
News Cards
├── Cards (contains news_card_item)
│
Stats Highlight
├── Stats (contains stat_item)
│
Video Card
```

---

## File Locations

All schema files are located in:
```
/src/types/storyblok-schemas/
├── hero_section.json
├── editorial_story.json
├── image_text_split.json
├── partner_grid.json
├── timeline.json
├── map_section.json
├── education_module.json
├── quote_block.json
├── cta_block.json
├── news_cards.json
├── stats_highlight.json
├── video_card.json
├── stat_item.json
├── partner_item.json
├── timeline_milestone.json
├── education_item.json
├── news_card_item.json
├── map_layer.json
├── index.ts
├── README.md
├── VALIDATION.md
└── COMPONENT_REFERENCE.md
```

---

**Last Updated:** February 26, 2026
**Total Components:** 18 (12 main + 6 sub)
**Total Fields:** 150+
