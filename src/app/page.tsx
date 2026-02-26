import { Metadata } from "next";
import HeroSection from "@/components/storyblok/HeroSection";
import EditorialStory from "@/components/storyblok/EditorialStory";
import ImageTextSplit from "@/components/storyblok/ImageTextSplit";
import StatsHighlight from "@/components/storyblok/StatsHighlight";
import MapSection from "@/components/storyblok/MapSection";
import PartnerGrid from "@/components/storyblok/PartnerGrid";
import EducationModule from "@/components/storyblok/EducationModule";
import CTABlock from "@/components/storyblok/CTABlock";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Dartry Mountains | Exploring Ireland's Mountain Landscape",
  description:
    "Discover the Dartry Mountains, a Special Protection Area and Special Area of Conservation in Counties Sligo and Leitrim, Ireland. Explore its unique ecology, heritage, and conservation efforts.",
  openGraph: {
    title: "Dartry Mountains",
    description:
      "A Special Protection Area and Special Area of Conservation in Counties Sligo and Leitrim, Ireland",
    type: "website",
  },
};

export default function HomePage() {
  // Hero Section - Cinematic variant
  const heroStats = [
    {
      value: "526",
      suffix: "m",
      label: "Highest Peak",
    },
    {
      value: "5,800",
      suffix: "ha",
      label: "Hectares Protected",
    },
    {
      value: "40",
      suffix: "+",
      label: "Bird Species",
    },
  ];

  // Stats Highlight Section
  const statsHighlightData = [
    {
      value: "526",
      suffix: "m",
      label: "Highest Peak (Ben Bulben)",
    },
    {
      value: "5800",
      suffix: "ha",
      label: "Protected Area",
    },
    {
      value: "40",
      suffix: "+",
      label: "Bird Species Recorded",
    },
    {
      value: "15",
      suffix: "+",
      label: "Rare Plant Species",
    },
  ];

  // Partner Grid data
  const partners = [
    {
      name: "NPWS",
      description:
        "National Parks and Wildlife Service manages the conservation and designation of protected areas across Ireland.",
    },
    {
      name: "BirdWatch Ireland",
      description:
        "Ireland's leading bird conservation charity working to protect and monitor bird populations and habitats.",
    },
    {
      name: "Sligo County Council",
      description:
        "Local authority responsible for planning, heritage, and sustainable development in County Sligo.",
    },
    {
      name: "Leitrim County Council",
      description:
        "Local authority responsible for planning, heritage, and sustainable development in County Leitrim.",
    },
    {
      name: "Teagasc",
      description:
        "Agriculture and food development authority providing research and advisory services to farmers and landowners.",
    },
    {
      name: "The Heritage Council",
      description:
        "Independent body promoting the heritage of Ireland, including natural, built, and cultural heritage.",
    },
  ];

  // Education Module items
  const educationItems: { title: string; scientific_name: string; description: string; type: "species" | "habitat" | "geology" | "heritage" | "flora" }[] = [
    {
      title: "Peregrine Falcon",
      scientific_name: "Falco peregrinus",
      description:
        "The fastest animal on Earth, these raptors nest on Dartry cliff faces and hunt across the mountains.",
      type: "species",
    },
    {
      title: "Red-billed Chough",
      scientific_name: "Pyrrhocorax pyrrhocorax",
      description:
        "An iconic Irish bird species with distinctive red legs and beak, found in upland cliff habitats.",
      type: "species",
    },
    {
      title: "Alpine Flora",
      scientific_name: "Mountain Plants",
      description:
        "Rare alpine and subalpine plant species adapted to harsh mountain conditions and rocky terrain.",
      type: "flora",
    },
    {
      title: "Limestone Pavement",
      scientific_name: "Karst Landscape",
      description:
        "Distinctive weathered limestone formations creating unique microhabitats for specialized plant and animal species.",
      type: "geology",
    },
    {
      title: "Blanket Bog",
      scientific_name: "Peatland Habitat",
      description:
        "Carbon-rich peatlands covering upland areas, supporting specialist bog plants and storing vast amounts of carbon.",
      type: "habitat",
    },
    {
      title: "Cliff Face Habitats",
      scientific_name: "Vertical Ecosystems",
      description:
        "Steep rock faces provide nesting sites for birds and habitats for rare plants and invertebrates.",
      type: "habitat",
    },
  ];

  return (
    <main className="w-full">
      {/* Hero Section */}
      <HeroSection
        variant="cinematic"
        heading="The Dartry Mountains"
        subheading="A Special Protection Area and Special Area of Conservation in Counties Sligo and Leitrim, Ireland"
        eyebrow="Sligo & Leitrim, Ireland"
        show_scroll_indicator={true}
        cta_label="Explore the Area"
        cta_secondary_label="Learn More"
        stats={heroStats}
      />

      {/* Editorial Story - About */}
      <ScrollReveal>
        <EditorialStory
          eyebrow="About"
          heading="An Iconic Irish Mountain Landscape"
          content={`The Dartry Mountains form one of Ireland's most distinctive and ecologically significant upland landscapes. Spanning the border between Counties Sligo and Leitrim in northwest Ireland, these mountains are defined by dramatic limestone formations, including the iconic Ben Bulben, which rises 526 meters above the surrounding countryside.

This ancient landscape was shaped by ice age glaciers and millennia of natural weathering, creating a unique terrain of steep valleys, cliff faces, and exposed limestone pavement. The Dartry limestone formation is a geological treasure, with karst features that create specialized microhabitats for rare alpine and subalpine plants found nowhere else in Ireland.

Today, the Dartry Mountains are protected as a Special Protection Area (SPA) and Special Area of Conservation (SAC) due to their outstanding ecological significance. The region supports internationally important bird populations, rare plant species, and distinctive habitats including blanket bog, limestone pavement, and cliff face ecosystems. These protections ensure that this remarkable landscape continues to be managed for conservation while supporting the farming communities that have shaped the land for generations.`}
        />
      </ScrollReveal>

      {/* Image + Text Split - Uniqueness */}
      <ScrollReveal>
        <ImageTextSplit
          heading="What Makes the Dartry Mountains Unique"
          eyebrow="Natural Heritage"
          content={`The Dartry Mountains represent a convergence of geological, ecological, and cultural significance. The limestone formations that define the landscape were created over 300 million years ago and have been sculpted by ice age glaciers and natural weathering into their distinctive appearance.

The mountains support a remarkable diversity of habitats, from the windswept summit plateaus to the sheltered valleys below. Rare alpine plants cling to cliff faces, blanket bogs cover the upland areas, and the dramatic limestone pavements create unique microhabitats. This diversity supports an extraordinary range of wildlife, including several bird species of international importance.

The landscape also tells the story of human interaction with the natural world, with traditional farming practices maintaining the open upland habitats that many species depend on. Conservation efforts work to balance the needs of farming communities with the protection of this unique ecosystem.`}
          image_position="right"
          image={{ filename: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop", alt: "View across the Dartry plateau" }}
          caption="View across the Dartry plateau"
        />
      </ScrollReveal>

      {/* Stats Highlight */}
      <ScrollReveal>
        <StatsHighlight stats={statsHighlightData} />
      </ScrollReveal>

      {/* Map Section */}
      <ScrollReveal>
        <MapSection
          heading="Explore the Protected Areas"
          description="An interactive map showing SPA and SAC boundaries, along with key ecological and heritage sites across the Dartry Mountains."
          center_lat={54.3833}
          center_lng={-8.3667}
          zoom={11}
        />
      </ScrollReveal>

      {/* Partner Grid */}
      <ScrollReveal>
        <PartnerGrid
          heading="Partner Agencies"
          description="Working together to protect and manage this unique landscape."
          partners={partners}
        />
      </ScrollReveal>

      {/* Education Module */}
      <ScrollReveal>
        <EducationModule
          heading="Wildlife & Habitats"
          description="Discover the remarkable species and habitats found across the Dartry Mountains."
          items={educationItems}
        />
      </ScrollReveal>

      {/* CTA Block */}
      <ScrollReveal>
        <CTABlock
          heading="Help Protect the Dartry Mountains"
          description="Learn how you can support conservation efforts and explore this remarkable landscape responsibly."
          cta_label="Get Involved"
          cta_link={{ cached_url: "/contact" }}
          cta_secondary_label="Explore the Map"
          cta_secondary_link={{ cached_url: "#map" }}
        />
      </ScrollReveal>
    </main>
  );
}
