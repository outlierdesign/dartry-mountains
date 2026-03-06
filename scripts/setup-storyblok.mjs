#!/usr/bin/env node
/**
 * Storyblok Setup Script — V2
 * Creates all component schemas and the home story via the Management API
 */
import { randomUUID } from "node:crypto";

const SPACE_ID = "290807059765088";
const PERSONAL_TOKEN = "QERqkpEBWrrowpKtQQUQtAtt-148900520403571-vB_cQVDm4HwjCqzj42wm";
const API_BASE = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;
const headers = {
  Authorization: PERSONAL_TOKEN,
  "Content-Type": "application/json",
};

async function api(method, path, body) {
  const url = `${API_BASE}${path}`;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${path} failed (${res.status}): ${text}`);
  }
  await new Promise((r) => setTimeout(r, 350));
  return res.json();
}

function uid() { return randomUUID(); }

// ─── COMPONENT SCHEMAS ───────────────────────────────────
const componentSchemas = [
  // PAGE (root content type)
  {
    name: "page",
    display_name: "Page",
    is_root: true,
    is_nestable: false,
    schema: {
      body: { type: "bloks", display_name: "Body" },
    },
  },
  // STAT ITEM
  {
    name: "stat_item",
    display_name: "Stat Item",
    is_nestable: true,
    schema: {
      value: { type: "text", display_name: "Value", required: true },
      suffix: { type: "text", display_name: "Suffix" },
      label: { type: "text", display_name: "Label", required: true },
    },
  },
  // HERO SECTION
  {
    name: "hero_section",
    display_name: "Hero Section",
    is_nestable: true,
    schema: {
      variant: { type: "option", display_name: "Variant", options: [
        { name: "cinematic", value: "cinematic" },
        { name: "split", value: "split" },
        { name: "video", value: "video" },
        { name: "map", value: "map" },
      ], default_value: "cinematic" },
      heading: { type: "text", display_name: "Heading", required: true },
      subheading: { type: "textarea", display_name: "Subheading" },
      eyebrow: { type: "text", display_name: "Eyebrow" },
      image: { type: "asset", display_name: "Background Image", filetypes: ["images"] },
      overlay_opacity: { type: "number", display_name: "Overlay Opacity" },
      show_scroll_indicator: { type: "boolean", display_name: "Show Scroll Indicator", default_value: true },
      cta_label: { type: "text", display_name: "CTA Label" },
      cta_link: { type: "text", display_name: "CTA Link" },
      cta_secondary_label: { type: "text", display_name: "Secondary CTA Label" },
      cta_secondary_link: { type: "text", display_name: "Secondary CTA Link" },
      stats: { type: "bloks", display_name: "Stats", restrict_type: "groups", restrict_components: true, component_whitelist: ["stat_item"] },
      padding_top: { type: "option", display_name: "Padding Top", options: [
        { name: "none", value: "none" },
        { name: "small", value: "small" },
        { name: "normal", value: "normal" },
      ] },
    },
  },
  // EDITORIAL STORY
  {
    name: "editorial_story",
    display_name: "Editorial Story",
    is_nestable: true,
    schema: {
      eyebrow: { type: "text", display_name: "Eyebrow" },
      heading: { type: "text", display_name: "Heading", required: true },
      body: { type: "textarea", display_name: "Body", required: true },
      image: { type: "asset", display_name: "Image", filetypes: ["images"] },
      image_position: { type: "option", display_name: "Image Position", options: [
        { name: "left", value: "left" },
        { name: "right", value: "right" },
      ], default_value: "right" },
      background: { type: "option", display_name: "Background", options: [
        { name: "dark", value: "dark" },
        { name: "light", value: "light" },
        { name: "cream", value: "cream" },
      ], default_value: "cream" },
      bullets: { type: "textarea", display_name: "Bullet Points", description: "One bullet per line" },
    },
  },
  // PARALLAX BREAK
  {
    name: "parallax_break",
    display_name: "Parallax Break",
    is_nestable: true,
    schema: {
      image: { type: "asset", display_name: "Background Image", filetypes: ["images"] },
      quote: { type: "textarea", display_name: "Quote" },
      attribution: { type: "text", display_name: "Attribution" },
      overlay_opacity: { type: "number", display_name: "Overlay Opacity" },
    },
  },
  // PROTECTED AREAS
  {
    name: "protected_areas",
    display_name: "Protected Areas",
    is_nestable: true,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      body: { type: "textarea", display_name: "Body" },
      image: { type: "asset", display_name: "Image", filetypes: ["images"] },
    },
  },
  // HABITAT ITEM
  {
    name: "habitat_item",
    display_name: "Habitat Item",
    is_nestable: true,
    schema: {
      title: { type: "text", display_name: "Title", required: true },
      description: { type: "textarea", display_name: "Description", required: true },
      image: { type: "asset", display_name: "Image", filetypes: ["images"] },
      scientific_name: { type: "text", display_name: "Scientific Name" },
      color: { type: "text", display_name: "CSS Color Class" },
    },
  },
  // HABITAT CARDS
  {
    name: "habitat_cards",
    display_name: "Habitat Cards",
    is_nestable: true,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      eyebrow: { type: "text", display_name: "Eyebrow" },
      subtitle: { type: "textarea", display_name: "Subtitle" },
      habitats: { type: "bloks", display_name: "Habitats", restrict_type: "groups", restrict_components: true, component_whitelist: ["habitat_item"] },
      external_link_url: { type: "text", display_name: "External Link URL" },
      external_link_label: { type: "text", display_name: "External Link Label" },
    },
  },
  // SPECIES ITEM
  {
    name: "species_item",
    display_name: "Species Item",
    is_nestable: true,
    schema: {
      name: { type: "text", display_name: "Name", required: true },
      irish_name: { type: "text", display_name: "Irish Name" },
      scientific_name: { type: "text", display_name: "Scientific Name", required: true },
      description: { type: "textarea", display_name: "Description", required: true },
      image: { type: "asset", display_name: "Image", filetypes: ["images"] },
      facts: { type: "textarea", display_name: "Facts", description: "One fact per line" },
      profile_url: { type: "text", display_name: "Profile URL" },
    },
  },
  // SPECIES PROFILES
  {
    name: "species_profiles",
    display_name: "Species Profiles",
    is_nestable: true,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      eyebrow: { type: "text", display_name: "Eyebrow" },
      subtitle: { type: "textarea", display_name: "Subtitle" },
      species: { type: "bloks", display_name: "Species", restrict_type: "groups", restrict_components: true, component_whitelist: ["species_item"] },
    },
  },
  // FARMING SECTION
  {
    name: "farming_section",
    display_name: "Farming Section",
    is_nestable: true,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      body: { type: "textarea", display_name: "Body" },
      image: { type: "asset", display_name: "Image", filetypes: ["images"] },
    },
  },
  // MAP SECTION
  {
    name: "map_section",
    display_name: "Map Section",
    is_nestable: true,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      description: { type: "textarea", display_name: "Description" },
      center_lat: { type: "number", display_name: "Center Latitude" },
      center_lng: { type: "number", display_name: "Center Longitude" },
      zoom: { type: "number", display_name: "Zoom Level" },
      show_spa_boundary: { type: "boolean", display_name: "Show SPA Boundary", default_value: true },
      show_sac_boundary: { type: "boolean", display_name: "Show SAC Boundary", default_value: true },
    },
  },
  // GUIDELINE ITEM
  {
    name: "guideline_item",
    display_name: "Guideline Item",
    is_nestable: true,
    schema: {
      title: { type: "text", display_name: "Title", required: true },
      description: { type: "textarea", display_name: "Description", required: true },
      icon: { type: "option", display_name: "Icon", options: [
        { name: "Home", value: "home" },
        { name: "Paw", value: "paw" },
        { name: "Trash", value: "trash" },
        { name: "Gate", value: "gate" },
      ] },
    },
  },
  // VISIT RESPONSIBLY
  {
    name: "visit_responsibly",
    display_name: "Visit Responsibly",
    is_nestable: true,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      subtitle: { type: "textarea", display_name: "Subtitle" },
      guidelines: { type: "bloks", display_name: "Guidelines", restrict_type: "groups", restrict_components: true, component_whitelist: ["guideline_item"] },
      external_link_url: { type: "text", display_name: "External Link URL" },
      external_link_label: { type: "text", display_name: "External Link Label" },
    },
  },
  // RESOURCE ITEM
  {
    name: "resource_item",
    display_name: "Resource Item",
    is_nestable: true,
    schema: {
      title: { type: "text", display_name: "Title", required: true },
      description: { type: "textarea", display_name: "Description" },
      url: { type: "text", display_name: "URL" },
      icon: { type: "option", display_name: "Icon", options: [
        { name: "File", value: "file" },
        { name: "Shield", value: "shield" },
        { name: "Flower", value: "flower" },
        { name: "Map", value: "map" },
      ] },
    },
  },
  // RESOURCE LINKS
  {
    name: "resource_links",
    display_name: "Resource Links",
    is_nestable: true,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      resources: { type: "bloks", display_name: "Resources", restrict_type: "groups", restrict_components: true, component_whitelist: ["resource_item"] },
    },
  },
  // CTA BLOCK
  {
    name: "cta_block",
    display_name: "CTA Block",
    is_nestable: true,
    schema: {
      heading: { type: "text", display_name: "Heading", required: true },
      subheading: { type: "textarea", display_name: "Subheading" },
      cta_label: { type: "text", display_name: "CTA Label" },
      cta_link: { type: "text", display_name: "CTA Link" },
      cta_secondary_label: { type: "text", display_name: "Secondary CTA Label" },
      cta_secondary_link: { type: "text", display_name: "Secondary CTA Link" },
      background: { type: "option", display_name: "Background", options: [
        { name: "Dark", value: "dark" },
        { name: "Gold", value: "gold" },
      ], default_value: "dark" },
    },
  },
  // QUOTE BLOCK
  {
    name: "quote_block",
    display_name: "Quote Block",
    is_nestable: true,
    schema: {
      quote: { type: "textarea", display_name: "Quote", required: true },
      attribution: { type: "text", display_name: "Attribution" },
      role: { type: "text", display_name: "Role" },
      image: { type: "asset", display_name: "Image", filetypes: ["images"] },
      background: { type: "option", display_name: "Background", options: [
        { name: "Dark", value: "dark" },
        { name: "Light", value: "light" },
        { name: "Cream", value: "cream" },
      ] },
    },
  },
  // NEWS CARD ITEM
  {
    name: "news_card_item",
    display_name: "News Card Item",
    is_nestable: true,
    schema: {
      title: { type: "text", display_name: "Title", required: true },
      excerpt: { type: "textarea", display_name: "Excerpt" },
      image: { type: "asset", display_name: "Image", filetypes: ["images"] },
      date: { type: "text", display_name: "Date" },
      slug: { type: "text", display_name: "Slug" },
    },
  },
  // NEWS CARDS
  {
    name: "news_cards",
    display_name: "News Cards",
    is_nestable: true,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      eyebrow: { type: "text", display_name: "Eyebrow" },
      items: { type: "bloks", display_name: "Items", restrict_type: "groups", restrict_components: true, component_whitelist: ["news_card_item"] },
    },
  },
  // GALLERY GRID
  {
    name: "gallery_grid",
    display_name: "Gallery Grid",
    is_nestable: true,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      eyebrow: { type: "text", display_name: "Eyebrow" },
    },
  },
  // VIDEO EMBED
  {
    name: "video_embed",
    display_name: "Video Embed",
    is_nestable: true,
    schema: {
      url: { type: "text", display_name: "Video URL" },
      caption: { type: "text", display_name: "Caption" },
      poster: { type: "asset", display_name: "Poster Image", filetypes: ["images"] },
    },
  },
  // STATS BAR
  {
    name: "stats_bar",
    display_name: "Stats Bar",
    is_nestable: true,
    schema: {
      stats: { type: "bloks", display_name: "Stats", restrict_type: "groups", restrict_components: true, component_whitelist: ["stat_item"] },
    },
  },
];

// ─── HOME STORY ──────────────────────────────────────────
const stories = [
  {
    name: "Home",
    slug: "home",
    content: {
      _uid: uid(),
      component: "page",
      body: [
        // 1. Hero
        {
          _uid: uid(), component: "hero_section",
          eyebrow: "Sligo & Leitrim, Ireland",
          heading: "The Dartry Mountains",
          subheading: "An iconic mountain range spanning the counties of Sligo and Leitrim, home to rare habitats, protected wildlife and a rich farming heritage.",
          image: { filename: "/images/landscapes/benbulben.jpg", alt: "Benbulben and the Dartry Mountains landscape" },
          overlay_opacity: 0.45,
          show_scroll_indicator: true,
          cta_label: "Explore the Mountains",
          cta_link: "#overview",
          cta_secondary_label: "View Map",
          cta_secondary_link: "#map",
          padding_top: "none",
          stats: [
            { _uid: uid(), component: "stat_item", value: "9,000", suffix: "+", label: "Hectares Protected" },
            { _uid: uid(), component: "stat_item", value: "2", suffix: "", label: "EU Designations" },
            { _uid: uid(), component: "stat_item", value: "15", suffix: "+", label: "Protected Species" },
            { _uid: uid(), component: "stat_item", value: "100", suffix: "+", label: "Active Farms" },
          ],
        },
        // 2. Editorial Story
        {
          _uid: uid(), component: "editorial_story",
          eyebrow: "About the Range",
          heading: "An Iconic Mountain Range",
          body: "The Dartry Mountains are a dramatic landscape of limestone plateaus, sheer cliffs, and deep valleys in the northwest of Ireland. Designated as both a Special Protection Area (SPA) and Special Area of Conservation (SAC), these mountains are of exceptional European ecological importance.\n\nThe range supports rare habitats including species-rich grasslands, peatlands, and cliff ecosystems that provide vital refuge for protected birds like the chough and peregrine falcon.",
          image: { filename: "/images/landscapes/glenade-valley.jpg", alt: "Glenade Valley in the Dartry Mountains" },
          image_position: "right",
          background: "cream",
          bullets: "Special Protection Area (SPA) and Special Area of Conservation (SAC)\nExceptional European ecological importance\nHome to rare habitats and protected species\nRich farming heritage spanning generations",
        },
        // 3. Parallax Break 1
        {
          _uid: uid(), component: "parallax_break",
          image: { filename: "/images/landscapes/eagles-rock.jpg", alt: "Eagles Rock in the Dartry Mountains" },
          quote: "These mountains hold some of the most important habitats and species in all of Europe.",
          overlay_opacity: 0.55,
        },
        // 4. Protected Areas
        {
          _uid: uid(), component: "protected_areas",
          heading: "Protected Areas",
          image: { filename: "/images/landscapes/benbulben-1.jpg", alt: "Benbulben cliff face" },
        },
        // 5. Habitat Cards
        {
          _uid: uid(), component: "habitat_cards",
          heading: "Habitats",
          eyebrow: "DIVERSE ECOSYSTEMS",
          subtitle: "From species-rich grasslands to blanket bog, the Dartry Mountains support a remarkable variety of habitats and rare plant communities.",
          external_link_url: "https://www.wildflowersofireland.net",
          external_link_label: "Explore Wildflowers of Ireland",
          habitats: [
            { _uid: uid(), component: "habitat_item", title: "Species-Rich Grassland", description: "The limestone slopes support grasslands of exceptional floristic diversity. Rare flowering plants have been recorded here, including Yellow saxifrage and Mossy saxifrage — some with their only known Irish stations at this site.", image: { filename: "/images/habitats/species-rich-grassland.jpg", alt: "Species-rich grassland" } },
            { _uid: uid(), component: "habitat_item", title: "Wet Grassland", description: "Rough wet grassland at lower elevations provides vital habitat for wildlife including skylark, meadow pipit, frogs, and a diverse range of invertebrates that form the base of the food chain.", image: { filename: "/images/habitats/wet-grassland.jpg", alt: "Wet grassland habitat" } },
            { _uid: uid(), component: "habitat_item", title: "Peatland", description: "Blanket bog and heath ecosystems cap the higher elevations. These carbon-rich habitats support specialised plant communities and play a crucial role in water regulation and carbon storage.", image: { filename: "/images/habitats/peatland.jpg", alt: "Peatland habitat" } },
          ],
        },
        // 6. Species Profiles
        {
          _uid: uid(), component: "species_profiles",
          heading: "Species of Conservation Interest",
          eyebrow: "PROTECTED WILDLIFE",
          subtitle: "This area is a Special Protection Area under the EU Birds Directive, of special conservation interest for the following species.",
          species: [
            { _uid: uid(), component: "species_item", name: "Red-Billed Chough", irish_name: "Cág cosdearg", scientific_name: "Pyrrhocorax pyrrhocorax", description: "The chough is a striking crow with a long, curved red bill and bright red legs. Irish chough make up about 60% of a distinct isolated Northwest European population, making this site of international importance.", image: { filename: "/images/birds/chough.jpg", alt: "Red-billed Chough" }, facts: "Known for distinctive call and aerial acrobatics\nAmber listed on Birds of Conservation Concern\nInland population here is quite unique", profile_url: "https://birdwatchireland.ie/birds/chough/" },
            { _uid: uid(), component: "species_item", name: "Peregrine Falcon", irish_name: "Fabhcún gorm", scientific_name: "Falco peregrinus", description: "Famous as the fastest animal on Earth, reaching speeds of 389 km/h in a hunting dive. A powerful, compact falcon with long pointed wings, dark head, and distinctive black 'moustache' stripe. Known for spectacular aerobatics.", image: { filename: "/images/birds/peregrine-falcon.jpg", alt: "Peregrine Falcon" }, facts: "Recovered strongly after 20th century declines\nNests on cliff ledges and rocky crags\nHighly territorial breeding pairs", profile_url: "https://birdwatchireland.ie/birds/peregrine/" },
          ],
        },
        // 7. Parallax Break 2
        {
          _uid: uid(), component: "parallax_break",
          image: { filename: "/images/farming/sheep-benbulben.jpg", alt: "Sheep farming with Benbulben" },
          quote: "The relationship between farming and nature in these mountains has sustained both for generations.",
          overlay_opacity: 0.5,
        },
        // 8. Farming Section
        {
          _uid: uid(), component: "farming_section",
          heading: "Hill Farming on the Dartrys & Conservation",
          image: { filename: "/images/farming/benbulben-sheep.jpg", alt: "Hill farming with sheep below Benbulben" },
        },
        // 9. Map Section
        {
          _uid: uid(), component: "map_section",
          heading: "Interactive Map",
          description: "Explore the Special Protection Area and Special Area of Conservation boundaries of the Dartry Mountains.",
        },
        // 10. Visit Responsibly
        {
          _uid: uid(), component: "visit_responsibly",
          heading: "Please Visit Responsibly",
          subtitle: "The habitats and wildlife found here are sensitive to disturbance and need careful farming management practices to continue. You can make a positive impact by following these guidelines.",
          external_link_url: "https://www.leavenotraceireland.org",
          external_link_label: "Learn More at Leave No Trace Ireland",
          guidelines: [
            { _uid: uid(), component: "guideline_item", title: "Respect Private Farmland", description: "This landscape is working farmland. Please respect private farmland and entrances at all times.", icon: "home" },
            { _uid: uid(), component: "guideline_item", title: "No Dogs", description: "Please do not bring your dog to this area. Dogs can disturb wildlife and livestock.", icon: "paw" },
            { _uid: uid(), component: "guideline_item", title: "Leave No Trace", description: "Take your litter with you. Leave nothing behind.", icon: "trash" },
            { _uid: uid(), component: "guideline_item", title: "Keep Entrances Clear", description: "Landowners require access to land and livestock at all times. Please do not block gates or entrances.", icon: "gate" },
          ],
        },
        // 11. Resource Links
        {
          _uid: uid(), component: "resource_links",
          resources: [
            { _uid: uid(), component: "resource_item", title: "Chough Survey Report", description: "Latest population survey and conservation status", icon: "file" },
            { _uid: uid(), component: "resource_item", title: "NPWS - National Parks & Wildlife", description: "Official site conservation information", url: "https://www.npws.ie", icon: "shield" },
            { _uid: uid(), component: "resource_item", title: "Cliff & Scree Information Sign", description: "Download the interpretive signage", icon: "map" },
            { _uid: uid(), component: "resource_item", title: "Grassland & Peatland Sign", description: "Luke’s Bridge interpretive panel", icon: "flower" },
          ],
        },
        // 12. CTA Block
        {
          _uid: uid(), component: "cta_block",
          heading: "Help Preserve the Dartry Mountains",
          subheading: "Thank you for visiting responsibly, not disturbing wildlife, respecting the private farmland and entrances, not bringing your dog to this area, and taking your litter with you.",
          cta_label: "Learn More",
          cta_link: "#overview",
          cta_secondary_label: "View Map",
          cta_secondary_link: "#map",
          background: "gold",
        },
      ],
    },
  },
];

// ─── MAIN ────────────────────────────────────────────────
async function main() {
  console.log("Setting up Storyblok space...\n");

  // Step 1: Fetch existing components
  console.log("Fetching existing components...");
  const { components: existing } = await api("GET", "/components");
  const existingMap = {};
  for (const c of existing) existingMap[c.name] = c.id;
  console.log(`  Found ${existing.length} existing components\n`);

  // Step 2: Create or update component schemas
  console.log("Creating/updating component schemas...");
  for (const schema of componentSchemas) {
    try {
      if (existingMap[schema.name]) {
        await api("PUT", `/components/${existingMap[schema.name]}`, { component: schema });
        console.log(`  Updated: ${schema.display_name}`);
      } else {
        await api("POST", "/components", { component: schema });
        console.log(`  Created: ${schema.display_name}`);
      }
    } catch (e) {
      console.error(`  Failed: ${schema.display_name} - ${e.message}`);
    }
  }

  // Step 3: Delete existing stories
  console.log("\nClearing existing stories...");
  const { stories: existingStories } = await api("GET", "/stories");
  for (const s of existingStories) {
    console.log(`  Deleting: ${s.name} (${s.id})`);
    await api("DELETE", `/stories/${s.id}`);
  }

  // Step 4: Create stories
  console.log("\nCreating stories...");
  for (const story of stories) {
    try {
      await api("POST", "/stories", {
        story: { name: story.name, slug: story.slug, content: story.content },
        publish: 1,
      });
      console.log(`  Published: ${story.name} (slug: ${story.slug})`);
    } catch (e) {
      console.error(`  Failed: ${story.name} - ${e.message}`);
    }
  }

  console.log("\nStoryblok setup complete!");
}

main().catch(console.error);
