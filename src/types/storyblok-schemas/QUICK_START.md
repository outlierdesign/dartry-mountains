# Storyblok Schemas Quick Start

## What's Included

22 files in `/src/types/storyblok-schemas/`:

### 12 Main Block Components
- hero_section
- editorial_story
- image_text_split
- partner_grid
- timeline
- map_section
- education_module
- quote_block
- cta_block
- news_cards
- stats_highlight
- video_card

### 6 Sub-Components
- stat_item
- partner_item
- timeline_milestone
- education_item
- news_card_item
- map_layer

### Configuration & Docs
- index.ts (TypeScript exports)
- README.md (full documentation)
- VALIDATION.md (validation checklist)
- COMPONENT_REFERENCE.md (detailed reference)
- QUICK_START.md (this file)

---

## Quick Import

```typescript
// All exports in one object
import { storyblokSchemas } from '@/types/storyblok-schemas';

// Individual arrays
import { mainBlockComponents, subComponents, allComponents } from '@/types/storyblok-schemas';

// Specific components
import { heroSection, editorialStory } from '@/types/storyblok-schemas';
```

---

## Quick Register

```typescript
import { allComponents } from '@/types/storyblok-schemas';

allComponents.forEach(component => {
  storyblokClient.registerComponent(component.name, component);
});
```

---

## Component Structure

Each component has:
- `name` - Component identifier (snake_case)
- `display_name` - Human-readable name
- `is_nestable` - true (can contain other components)
- `is_root` - false (can be nested inside pages)
- `schema` - Field definitions with type, required flag, and descriptions

---

## All Components at a Glance

| Component | Fields | Nested |
|-----------|--------|--------|
| Hero Section | 15 | stat_item |
| Editorial Story | 9 | none |
| Image Text Split | 8 | none |
| Partner Grid | 4 | partner_item |
| Timeline | 4 | timeline_milestone |
| Map Section | 10 | map_layer |
| Education Module | 4 | education_item |
| Quote Block | 5 | none |
| CTA Block | 8 | none |
| News Cards | 3 | news_card_item |
| Stats Highlight | 3 | stat_item |
| Video Card | 6 | none |

---

## Common Fields (Every Main Component)

- **background_color** - default, muted, earth, moss, dark
- **spacing** - default, compact, large

---

## All Field Types Used

```
✓ text (single-line)
✓ textarea (multi-line)
✓ richtext (formatted)
✓ asset (images - alt text required)
✓ bloks (nested components)
✓ option (dropdowns)
✓ number (coordinates, opacity)
✓ boolean (toggles)
✓ multilink (links)
```

---

## File Locations

```
src/types/storyblok-schemas/
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
├── COMPONENT_REFERENCE.md
└── QUICK_START.md
```

---

## Validation

All 18 JSON schema files are validated and ready.

No additional setup required.

---

## Next Steps

1. Import schemas into your application
2. Register components with Storyblok
3. Create component Vue/React implementations
4. Use schema definitions for type safety
5. Test with Storyblok CMS

---

For detailed information, see:
- **README.md** - Full overview
- **COMPONENT_REFERENCE.md** - Detailed field reference
- **VALIDATION.md** - Complete validation checklist

