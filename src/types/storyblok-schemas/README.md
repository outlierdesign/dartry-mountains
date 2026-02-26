# Storyblok Component Schemas

This directory contains JSON schema definitions for all Storyblok components used in the Donegal Bay SPA website.

## Main Block Components (12)

1. **hero_section.json** - Hero section with multiple variants (cinematic, split, video, map)
2. **editorial_story.json** - Editorial content block with optional image
3. **image_text_split.json** - Side-by-side image and text layout
4. **partner_grid.json** - Grid layout for partner organizations
5. **timeline.json** - Timeline visualization of milestones
6. **map_section.json** - Interactive map with configurable layers and boundaries
7. **education_module.json** - Educational content about species, habitats, geology, and heritage
8. **quote_block.json** - Featured quote block with optional attribution
9. **cta_block.json** - Call-to-action block with primary and secondary buttons
10. **news_cards.json** - Grid of news/article cards
11. **stats_highlight.json** - Highlighted statistics display
12. **video_card.json** - Video player with preview image and transcript

## Sub-Components (6)

These are nested components used within the main blocks:

1. **stat_item.json** - Individual stat (label, value, suffix)
2. **partner_item.json** - Individual partner entry (name, logo, description, website)
3. **timeline_milestone.json** - Individual timeline milestone (date, title, description)
4. **education_item.json** - Individual education entry (species, habitat, geology, heritage)
5. **news_card_item.json** - Individual news card (title, image, excerpt, link)
6. **map_layer.json** - Individual map layer (flora, fauna, heritage, geology)

## Field Types Used

- **text** - Single-line text input
- **textarea** - Multi-line text input
- **richtext** - Rich text editor with formatting
- **asset** - Image/file upload (all include accessibility note for alt text)
- **bloks** - Nested component blocks (restricted to specific component types)
- **option** - Dropdown selection from predefined options
- **number** - Numeric input
- **boolean** - Toggle/checkbox input
- **multilink** - Link to internal page, external URL, email, or document

## Common Fields

All main blocks include:

- **background_color** - Option: default, muted, earth, moss, dark
- **spacing** - Option: default, compact, large

## Accessibility Notes

- All **asset** (image) fields include a note that alt text is required
- Asset descriptions are provided where appropriate
- Rich text fields are available for structured content

## Index File

**index.ts** - Exports all schemas in the following groupings:
- `storyblokSchemas` - Combined object of all schemas
- `mainBlockComponents` - Array of the 12 main components
- `subComponents` - Array of the 6 sub-components
- `allComponents` - Combined array
- Individual named exports for direct access

## Usage Example

```typescript
import { storyblokSchemas, mainBlockComponents } from '@/types/storyblok-schemas';

// Access individual schema
const heroSchema = storyblokSchemas.heroSection;

// Register all main blocks with Storyblok
mainBlockComponents.forEach(component => {
  // Register component...
});
```

## Schema Format

Each schema follows the Storyblok component definition format:

```json
{
  "name": "component_name",
  "display_name": "Display Name",
  "is_root": false,
  "is_nestable": true,
  "schema": {
    "field_name": {
      "type": "field_type",
      "display_name": "Field Label",
      "required": false,
      "description": "Helper text"
    }
  }
}
```

For nested components (bloks), restrictions are applied:

```json
{
  "type": "bloks",
  "restrict_components": true,
  "component_whitelist": ["allowed_component_name"]
}
```
