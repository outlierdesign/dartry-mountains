import HeroSection from "@/components/storyblok/HeroSection";
import CTABlock from "@/components/storyblok/CTABlock";

/**
 * Fallback component shown when Storyblok content is unavailable.
 * Displays a minimal version of the home page.
 */
export default function HomeFallback() {
  return (
    <main className="w-full">
      <HeroSection
        variant="cinematic"
        heading="The Dartry Mountains"
        subheading="A Special Protection Area and Special Area of Conservation in Counties Sligo and Leitrim, Ireland"
        eyebrow="Sligo & Leitrim, Ireland"
        show_scroll_indicator={true}
        stats={[
          { value: "526", suffix: "m", label: "Highest Peak" },
          { value: "5,800", suffix: "ha", label: "Hectares Protected" },
          { value: "40", suffix: "+", label: "Bird Species" },
        ]}
      />
      <CTABlock
        heading="Content Loading"
        description="Page content is managed through Storyblok CMS. If you're seeing this, the CMS connection may be temporarily unavailable."
        cta_label="Refresh"
        cta_link={{ cached_url: "/" }}
      />
    </main>
  );
}
