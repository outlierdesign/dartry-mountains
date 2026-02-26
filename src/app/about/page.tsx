import { Metadata } from "next";
import HeroSection from "@/components/storyblok/HeroSection";
import EditorialStory from "@/components/storyblok/EditorialStory";
import StatsHighlight from "@/components/storyblok/StatsHighlight";
import ImageTextSplit from "@/components/storyblok/ImageTextSplit";
import QuoteBlock from "@/components/storyblok/QuoteBlock";
import CTABlock from "@/components/storyblok/CTABlock";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "About the Dartry Mountains",
  description:
    "Learn about the geography, ecology, and conservation significance of the Dartry Mountains, a Special Protection Area spanning Counties Sligo and Leitrim.",
  openGraph: {
    title: "About the Dartry Mountains",
    description:
      "Spanning Counties Sligo and Leitrim in northwest Ireland, the Dartry Mountains form one of the most ecologically significant upland areas in the country.",
    type: "website",
  },
};

export default function AboutPage() {
  // Stats Highlight data (same as home)
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

  return (
    <main className="w-full">
      {/* Split Hero Section */}
      <HeroSection
        variant="split"
        heading="About the Dartry Mountains"
        subheading="Spanning Counties Sligo and Leitrim in northwest Ireland, the Dartry Mountains form one of the most ecologically significant upland areas in the country."
        eyebrow="About"
      />

      {/* Geography & Landscape */}
      <ScrollReveal>
        <EditorialStory
          heading="Geography & Landscape"
          eyebrow="The Land"
          content={`The Dartry Mountains are a distinctive upland landscape defined by the Dartry limestone formation, a geological feature that dates back over 300 million years to the Carboniferous period. The mountains' most iconic feature is Ben Bulben, which rises 526 meters and dominates the landscape with its distinctive flat-topped profile.

The landscape was dramatically shaped by ice age glaciers during the last glacial period, which carved out the deep valleys and exposed the dramatic cliff faces that characterize the mountains today. The Gleniff Horseshoe, a glacial valley of outstanding beauty, is one of the most spectacular features, with near-vertical cliff faces rising hundreds of meters from the valley floor.

The geology of the area creates unique karst features, including limestone pavement, caves, and sinkholes. These landforms, combined with the varied topography, create a mosaic of different habitats and microclimates that support an exceptional diversity of plant and animal life. The underlying limestone also influences the soil chemistry and vegetation patterns across the region.`}
        />
      </ScrollReveal>

      {/* Stats Highlight */}
      <ScrollReveal>
        <StatsHighlight stats={statsHighlightData} />
      </ScrollReveal>

      {/* Living Landscape - Image + Text Split (Left) */}
      <ScrollReveal>
        <ImageTextSplit
          heading="A Living Landscape"
          eyebrow="Heritage & Tradition"
          content={`The Dartry Mountains are not just a natural landscape—they are a living, working landscape shaped by centuries of human interaction. Small-scale farming has been practiced in and around the mountains for generations, with families managing the upland fields and pastures that characterize much of the region.

Traditional agricultural practices have played a crucial role in maintaining the open upland habitats that many rare species depend on. By keeping the landscape open and preventing natural afforestation, farmers have inadvertently become custodians of some of Ireland's most important wildlife habitats. Today, conservation efforts work closely with farming communities to ensure that economic viability and environmental protection go hand in hand.

The landscape also holds deep cultural significance for local communities, with historical sites, folklore, and traditions woven into the fabric of the mountains. This integration of natural heritage, agricultural tradition, and cultural value makes the Dartry Mountains a unique and irreplaceable part of Irish identity.`}
          image_position="left"
          image={{ filename: "https://images.unsplash.com/photo-1500382017468-7049fae99fc8?w=800&h=600&fit=crop", alt: "Traditional farming landscape in the Dartry region" }}
          caption="Traditional farming landscape in the Dartry region"
        />
      </ScrollReveal>

      {/* Ecological Significance - Image + Text Split (Right) */}
      <ScrollReveal>
        <ImageTextSplit
          heading="Ecological Significance"
          eyebrow="Conservation Status"
          content={`The Dartry Mountains have been designated as both a Special Protection Area (SPA) under the EU Birds Directive and a Special Area of Conservation (SAC) under the EU Habitats Directive. These international designations recognize the outstanding ecological value of the landscape and its importance for European biodiversity.

The SPA designation reflects the mountains' importance for bird conservation. The region supports internationally significant populations of golden eagle, peregrine falcon, red-billed chough, and other upland bird species. These birds depend on the dramatic cliff faces for nesting and the open moorlands for hunting and foraging.

The SAC designation protects the diverse habitats found across the mountains, including alpine and subalpine heathland, limestone pavement, blanket bog, and cliff face communities. These habitats support rare plant species found nowhere else in Ireland, including several alpine plants at the southern edge of their natural range. The protection of these designations ensures that the landscape is managed with conservation as a primary objective.`}
          image_position="right"
          image={{ filename: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", alt: "Alpine habitat on the Dartry plateau" }}
          caption="Alpine habitat on the Dartry plateau"
        />
      </ScrollReveal>

      {/* Quote Block */}
      <ScrollReveal>
        <QuoteBlock
          quote="The Dartry Mountains represent one of Ireland's most important upland landscapes, supporting rare species and habitats found nowhere else on the island."
          attribution="National Parks & Wildlife Service"
          background_color="dark"
        />
      </ScrollReveal>

      {/* CTA Block */}
      <ScrollReveal>
        <CTABlock
          heading="Explore the Project"
          description="Learn more about the conservation work and initiatives happening across the Dartry Mountains."
          cta_label="The Project"
          cta_link={{ cached_url: "/the-project" }}
        />
      </ScrollReveal>
    </main>
  );
}
