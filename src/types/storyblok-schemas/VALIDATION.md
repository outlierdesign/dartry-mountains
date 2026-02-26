# Schema Validation Checklist

All 18 Storyblok component schemas have been validated:

## Main Block Components (12)

### 1. Hero Section ✓
- Name: hero_section
- Required fields: heading, image
- Optional variants: cinematic, split, video, map
- Nested components: stat_item (optional)
- Common fields: background_color, spacing
- Special fields: overlay_opacity (number), show_scroll_indicator (boolean)
- CTA support: Primary and secondary

### 2. Editorial Story ✓
- Name: editorial_story
- Required fields: heading, content
- Content type: richtext (supports formatted text)
- Optional image with position (left/right/none)
- Pull quote support with attribution
- Common fields: background_color, spacing

### 3. Image Text Split ✓
- Name: image_text_split
- Required fields: heading, content, image, image_position
- Image position: left or right (required)
- Caption support
- Common fields: background_color, spacing

### 4. Partner Grid ✓
- Name: partner_grid
- Required fields: heading
- Optional: description, partners (bloks)
- Restricted to: partner_item
- Common fields: background_color, spacing

### 5. Timeline ✓
- Name: timeline
- Required fields: heading
- Optional: description, milestones (bloks)
- Restricted to: timeline_milestone
- Common fields: background_color, spacing

### 6. Map Section ✓
- Name: map_section
- Required fields: heading
- Map configuration: center_lat, center_lng, zoom (all numeric)
- Protected areas: show_spa_boundary, show_sac_boundary
- Layers support: map_layer (optional)
- Common fields: background_color, spacing

### 7. Education Module ✓
- Name: education_module
- Required fields: heading
- Optional: description, items (bloks)
- Restricted to: education_item
- Common fields: background_color, spacing

### 8. Quote Block ✓
- Name: quote_block
- Required fields: quote
- Attribution support: attribution, role
- Visual option: show_texture (boolean)
- Common fields: background_color, spacing

### 9. CTA Block ✓
- Name: cta_block
- Required fields: heading, cta_label, cta_link
- Secondary CTA: cta_secondary_label, cta_secondary_link
- Description support (optional)
- Common fields: background_color, spacing

### 10. News Cards ✓
- Name: news_cards
- Required fields: heading
- Cards: Restricted to news_card_item
- Common fields: background_color, spacing

### 11. Stats Highlight ✓
- Name: stats_highlight
- Required fields: stats (bloks - required)
- Optional: heading
- Restricted to: stat_item
- Common fields: background_color, spacing

### 12. Video Card ✓
- Name: video_card
- Required fields: title, video_url, preview_image
- Optional: description, transcript
- Common fields: background_color, spacing

## Sub-Components (6)

### 1. Stat Item ✓
- Name: stat_item
- Required fields: label, value
- Optional: suffix

### 2. Partner Item ✓
- Name: partner_item
- Required fields: name, description
- Optional: logo, website (multilink), detail (richtext)

### 3. Timeline Milestone ✓
- Name: timeline_milestone
- Required fields: date, title, description
- Optional: detail (richtext)

### 4. Education Item ✓
- Name: education_item
- Required fields: title, description, type
- Optional: scientific_name, image
- Type options: species, habitat, geology, heritage

### 5. News Card Item ✓
- Name: news_card_item
- Required fields: title, date, excerpt, link
- Optional: image, tag

### 6. Map Layer ✓
- Name: map_layer
- Required fields: id, label, type
- Optional: visible (boolean, default true)
- Type options: flora, fauna, heritage, geology

## Field Type Validation

### Text Fields
- hero_section: heading, subheading, eyebrow, cta_label
- editorial_story: heading, eyebrow, pull_quote_attribution
- image_text_split: heading, eyebrow, caption
- [All other components validated]

### Textarea Fields
- Subheading, description, pull_quote, excerpt, transcript all use textarea

### Richtext Fields
- content (editorial_story, image_text_split)
- detail (partner_item, timeline_milestone)
- Used for formatted content

### Asset Fields (with accessibility notes)
- All image/asset fields include "Alt text is required for accessibility"
- Applies to: image, logo, preview_image, etc.

### Numeric Fields
- center_lat, center_lng, zoom (map_section)
- overlay_opacity (hero_section)

### Boolean Fields
- show_scroll_indicator, show_texture, show_spa_boundary, show_sac_boundary
- visible (map_layer)

### Option Fields (with enumerated values)
- variant: cinematic, split, video, map
- image_position: left, right, none
- background_color: default, muted, earth, moss, dark (all components)
- spacing: default, compact, large (all components)
- type: species, habitat, geology, heritage; flora, fauna, heritage, geology

### Multilink Fields
- cta_link, website, link (supports internal/external URLs)

### Bloks Fields (with restrictions)
- stats (restricted to stat_item)
- partners (restricted to partner_item)
- milestones (restricted to timeline_milestone)
- items (restricted to education_item)
- cards (restricted to news_card_item)
- layers (restricted to map_layer)

## Common Patterns Verified

### Background Color Field
- Present in all 12 main block components
- Options: default, muted, earth, moss, dark
- Required: false

### Spacing Field
- Present in all 12 main block components
- Options: default, compact, large
- Required: false

### Accessibility
- All asset fields include description about alt text
- Map coordinates include defaults and range information
- Helper descriptions provided for complex fields

### Nesting
- All components: is_nestable = true
- All components: is_root = false
- Component restrictions properly applied to bloks fields

## Index.ts Exports Verified

- storyblokSchemas object: Contains all 18 components
- mainBlockComponents array: 12 components
- subComponents array: 6 components
- allComponents array: 18 components
- Individual named exports: All available
- Default export: storyblokSchemas

## File Structure

All files created in: `/sessions/quirky-vigilant-mendel/dartry-mountains/src/types/storyblok-schemas/`

- 12 main component JSON files
- 6 sub-component JSON files
- 1 index.ts file
- 1 README.md file
- 1 VALIDATION.md file (this file)

## Ready for Integration

All schemas are ready to be:
1. Imported into TypeScript applications
2. Registered with Storyblok CMS
3. Used for component definition and field validation
4. Referenced in component implementations
