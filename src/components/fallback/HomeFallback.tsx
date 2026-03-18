import HeroSection from "@/components/storyblok/HeroSection"
import EditorialStory from "@/components/storyblok/EditorialStory"
import ParallaxBreak from "@/components/storyblok/ParallaxBreak"
import ProtectedAreas from "@/components/storyblok/ProtectedAreas"
import HabitatCards from "@/components/storyblok/HabitatCards"
import SpeciesProfiles from "@/components/storyblok/SpeciesProfiles"
import FarmingSection from "@/components/storyblok/FarmingSection"
// StatsBar removed per feedback v2
import MapSection from "@/components/storyblok/MapSection"
import VisitResponsibly from "@/components/storyblok/VisitResponsibly"
import HomeGallery from "@/components/shared/HomeGallery"
import ResourceLinks from "@/components/storyblok/ResourceLinks"
import CTABlock from "@/components/storyblok/CTABlock"
import ScrollReveal from "@/components/shared/ScrollReveal"

export default async function HomeFallback() {
  return (
    <main>
      {/* 1. Hero Section */}
      <HeroSection
        eyebrow="Sligo & Leitrim, Ireland"
        heading="The Dartry Mountains"
        subheading="An iconic mountain range spanning the counties of Sligo and Leitrim, home to rare habitats, protected wildlife and a rich farming heritage."
        image={{ filename: "/images/landscapes/benbulben.jpg", alt: "Benbulben and the Dartry Mountains landscape" }}
        // video_bg will be set to hosted URL once available
        overlay_opacity={0.45}
        show_scroll_indicator={true}
        cta_label="Explore the Mountains"
        cta_link="#overview"
        cta_secondary_label="View Map"
        cta_secondary_link="#map"
        stats={[
          { label: "Hectares Protected", value: "9,000", suffix: "+" },
          { label: "EU Designations", value: "2" },
          { label: "Protected Species", value: "15", suffix: "+" },
          { label: "Active Farms", value: "100", suffix: "+" }
        ]}
        padding_top="none"
      />

      {/* 2. Editorial Story - About the Range */}
      <ScrollReveal>
        <div id="overview">
          <EditorialStory
            eyebrow="About the Range"
            heading="An Iconic Mountain Range"
            body={"The Dartry Mountains are a dramatic landscape of limestone plateaus, sheer cliffs, and deep valleys in the northwest of Ireland. Designated as both a Special Protection Area (SPA) and Special Area of Conservation (SAC), these mountains are of exceptional European ecological importance.\n\nThe range supports rare habitats including species-rich grasslands, peatlands, and cliff ecosystems that provide vital refuge for protected birds like the chough and peregrine falcon."}
            image={{ filename: "/images/landscapes/glenade-valley.jpg", alt: "Glenade Valley in the Dartry Mountains" }}
            image_position="right"
            background="cream"
            bullets={[
              "Special Protection Area (SPA) and Special Area of Conservation (SAC)",
              "Exceptional European ecological importance",
              "Home to rare habitats and protected species",
              "Rich farming heritage spanning generations"
            ]}
          />
        </div>
      </ScrollReveal>

      {/* 3. Parallax Break - First */}
      <ScrollReveal>
        <ParallaxBreak
          image={{ filename: "/images/landscapes/eagles-rock.jpg", alt: "Eagles Rock in the Dartry Mountains" }}
          quote="These mountains hold some of the most important habitats and species in all of Europe."
          attribution=""
          overlay_opacity={0.55}
        />
      </ScrollReveal>

      {/* 4. Protected Areas */}
      <ScrollReveal>
        <div id="protected-areas">
          <ProtectedAreas image={{ filename: "/images/landscapes/benbulben-1.jpg", alt: "Benbulben cliff face in the Dartry Mountains" }} />
        </div>
      </ScrollReveal>

      {/* 5. Habitat Cards */}
      <ScrollReveal>
        <div id="habitats">
          <HabitatCards />
        </div>
      </ScrollReveal>

      {/* 6. Species Profiles */}
      <ScrollReveal>
        <div id="species">
          <SpeciesProfiles />
        </div>
      </ScrollReveal>

      {/* 7. Parallax Break - Second */}
      <ScrollReveal>
        <ParallaxBreak
          image={{ filename: "/images/farming/sheep-benbulben.jpg", alt: "Sheep farming with Benbulben in the background" }}
          quote="The relationship between farming and nature in these mountains has sustained both for generations."
          attribution=""
          overlay_opacity={0.5}
        />
      </ScrollReveal>

      {/* 8. Farming Section */}
      <ScrollReveal>
        <div id="farming">
          <FarmingSection image={{ filename: "/images/farming/benbulben-sheep.jpg", alt: "Hill farming with sheep below Benbulben" }} />
        </div>
      </ScrollReveal>

      {/* 9. Map Section (stats bar removed per feedback v2) */}
      <ScrollReveal>
        <div id="map">
          <MapSection
            heading="Interactive Map"
            description="Explore the Special Protection Area and Special Area of Conservation boundaries of the Dartry Mountains."
          />
        </div>
      </ScrollReveal>

      {/* 11. Visit Responsibly */}
      <ScrollReveal>
        <div id="visit">
          <VisitResponsibly />
        </div>
      </ScrollReveal>

      {/* 11b. Gallery */}
      <ScrollReveal>
        <div id="gallery">
          <HomeGallery />
        </div>
      </ScrollReveal>

      {/* 12. Resource Links */}
      <ScrollReveal>
        <ResourceLinks />
      </ScrollReveal>

      {/* 13. CTA Block — Conservation key messages per feedback v2 */}
      <ScrollReveal>
        <CTABlock
          heading="Help Preserve the Dartry Mountains"
          subheading="Thank you for visiting responsibly, not disturbing wildlife, respecting the private farmland and entrances, not bringing your dog to this area, and taking your litter with you."
          cta_label="Learn More"
          cta_link="#overview"
          cta_secondary_label="View Map"
          cta_secondary_link="#map"
          background="gold"
        />
      </ScrollReveal>
    </main>
  )
}
