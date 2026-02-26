import HeroSection from "@/components/storyblok/HeroSection";
import EditorialStory from "@/components/storyblok/EditorialStory";
import ImageTextSplit from "@/components/storyblok/ImageTextSplit";
import EducationModule from "@/components/storyblok/EducationModule";
import MapSection from "@/components/storyblok/MapSection";
import QuoteBlock from "@/components/storyblok/QuoteBlock";
import StatsHighlight from "@/components/storyblok/StatsHighlight";
import CTABlock from "@/components/storyblok/CTABlock";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata = {
  title: "Environmental Stewardship",
};

export default function EnvironmentalStewardshipPage() {
  return (
    <main>
      {/* Split Hero Section */}
      <ScrollReveal>
        <HeroSection
          variant="split"
          heading="Environmental Stewardship"
          subheading="Protecting the habitats, species, and landscapes that make the Dartry Mountains a site of European conservation importance."
          eyebrow="Protected Areas"
        />
      </ScrollReveal>

      {/* Editorial Story - Protected Areas Designations */}
      <ScrollReveal>
        <EditorialStory
          heading="Protected Areas"
          eyebrow="Conservation Status"
          content="The Dartry Mountains hold dual designation under European conservation legislation. As a Special Protection Area (SPA), it is protected under the EU Birds Directive for its populations of breeding chough, peregrine falcon, and other upland birds. As a Special Area of Conservation (SAC), it is protected under the EU Habitats Directive for its alpine and boreal heaths, calcareous rocky slopes, and Juniperus communis formations. These European Protected Areas designations reflect the international significance of the landscape and ensure that conservation standards meet the highest requirements for habitat and species protection."
        />
      </ScrollReveal>

      {/* Stats Highlight Section */}
      <ScrollReveal>
        <StatsHighlight
          stats={[
            {
              value: "2",
              suffix: "",
              label: "EU Designations (SPA & SAC)",
            },
            {
              value: "5800",
              suffix: "ha",
              label: "Total Protected Area",
            },
            {
              value: "12",
              suffix: "+",
              label: "Priority Habitats",
            },
            {
              value: "40",
              suffix: "+",
              label: "Protected Species",
            },
          ]}
        />
      </ScrollReveal>

      {/* Image + Text Split - Cliff Face */}
      <ScrollReveal>
        <ImageTextSplit
          heading="Cliff Face & Rocky Habitats"
          eyebrow="Habitats"
          content="The dramatic cliff faces of the Dartry Mountains support unique alpine and boreal heath communities adapted to steep, exposed slopes. Limestone pavements and rocky ledges provide habitat for rare arctic-alpine plant species, many of which are relicts from the last ice age. These specialised communities occur in crevices and on south-facing slopes where microhabitats create suitable growing conditions. The rocky habitats also provide essential nesting and perching sites for peregrine falcons and other cliff-dwelling birds."
          image_position="right"
          caption="Steep slope habitat beneath the cliff face"
        />
      </ScrollReveal>

      {/* Image + Text Split - Upland Grassland */}
      <ScrollReveal>
        <ImageTextSplit
          heading="Upland Grassland & Bog"
          eyebrow="Habitats"
          content="The rushy hilly terrain of the Dartry Mountains supports a mosaic of upland grassland and blanket bog habitats. These open habitats, dominated by grasses, heathers, and bog plants, are maintained through traditional grazing practices that have shaped the landscape for centuries. The short-sward grassland is particularly important for red-billed chough, which feed on insects in these areas near their cliff-face nest sites. The blanket bog component stores vast quantities of carbon and supports specialised plant communities adapted to waterlogged, nutrient-poor conditions."
          image_position="left"
          caption="Upland grassland at the base of the slopes"
        />
      </ScrollReveal>

      {/* Image + Text Split - Intact Peatland */}
      <ScrollReveal>
        <ImageTextSplit
          heading="Intact Peatland"
          eyebrow="Habitats"
          content="Blanket bog is one of Ireland's most important habitats and the Dartry Mountains support extensive areas of this rare and threatened ecosystem. Intact peatland plays a crucial role in carbon storage, water management, and climate regulation. The acidic, waterlogged conditions support specialised plant communities including sphagnum mosses, cotton grass, and sundews. These bog habitats are increasingly recognised for their global significance in carbon sequestration and their vulnerability to degradation. Conservation and restoration of peatland is a key priority of the Dartry Mountains project."
          image_position="right"
          caption="Intact peatland habitat"
        />
      </ScrollReveal>

      {/* Education Module - Species */}
      <ScrollReveal>
        <EducationModule
          heading="Species of Conservation Interest"
          description="Key species that the Dartry Mountains protect under EU legislation."
          items={[
            {
              title: "Red-billed Chough",
              scientific_name: "Pyrrhocorax pyrrhocorax",
              description: "Feeds on insects in upland grassland near cliff-face nesting sites. Grazing maintains short sward essential for feeding.",
              type: "species",
            },
            {
              title: "Peregrine Falcon",
              scientific_name: "Falco peregrinus",
              description: "Breeds on cliff ledges across the mountain range. The fastest bird in the world, reaching speeds over 300 km/h in hunting dives.",
              type: "species",
            },
            {
              title: "St. Patrick's Cabbage",
              scientific_name: "Saxifraga spathularis",
              description: "A Lusitanian flora species found in rocky crevices and mountain ledges. An indicator of the area's unique biogeographical position.",
              type: "flora",
            },
            {
              title: "Alpine Heath",
              scientific_name: "Habitat 4060",
              description: "EU Priority Habitat found above 350m. Dominated by Calluna vulgaris with scattered Vaccinium myrtillus.",
              type: "habitat",
            },
            {
              title: "Calcareous Rocky Slopes",
              scientific_name: "Habitat 8210",
              description: "Limestone cliff habitats supporting rare fern and moss communities, including arctic-alpine relict species.",
              type: "habitat",
            },
            {
              title: "Juniper Formations",
              scientific_name: "Juniperus communis",
              description: "Scattered juniper scrub formations on limestone slopes, a declining habitat across Ireland.",
              type: "flora",
            },
          ]}
        />
      </ScrollReveal>

      {/* Map Section */}
      <ScrollReveal>
        <MapSection
          heading="Protected Area Boundaries"
          description="The map below shows the SPA and SAC boundaries of the Dartry Mountains protected areas. No peak destinations are shown — the focus is on conservation boundaries."
          center_lat={54.3833}
          center_lng={-8.3667}
          zoom={11}
        />
      </ScrollReveal>

      {/* Quote Block */}
      <ScrollReveal>
        <QuoteBlock
          quote="Grazing maintains short grassland and allows protected birds like chough to feed easily near their nest sites. The relationship between farming and conservation here is essential."
          attribution="Dartry Mountains Conservation Project"
          background_color="dark"
        />
      </ScrollReveal>

      {/* Visit Responsibly Section */}
      <ScrollReveal>
        <EditorialStory
          heading="Visit Responsibly"
          eyebrow="Guidelines"
          content={`This landscape is working farmland. Please do not cross field boundaries.\n\nKeep dogs away from this area. Please leave them at home or in your vehicle as they can disturb wildlife and livestock.\n\nTake all litter home and stay in public areas.\n\nFor more information about the flora of this region, visit wildflowersofireland.net or irishwildflowers.ie. For bird species information, visit birdwatchireland.ie.`}
        />
      </ScrollReveal>

      {/* CTA Block Section */}
      <ScrollReveal>
        <CTABlock
          heading="Explore Responsibly"
          description="This landscape is working farmland. Please do not cross field boundaries."
          cta_label="Tourism Guidelines"
          cta_link={{ cached_url: "#guidelines" }}
          cta_secondary_label="Contact Us"
          cta_secondary_link={{ cached_url: "/contact" }}
        />
      </ScrollReveal>
    </main>
  );
}
