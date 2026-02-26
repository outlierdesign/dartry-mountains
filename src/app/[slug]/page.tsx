import type { Metadata } from "next";
import HeroSection from "@/components/storyblok/HeroSection";
import CTABlock from "@/components/storyblok/CTABlock";

// Catch-all page for future Storyblok-driven pages
// In production, this would fetch content from Storyblok API

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title,
    description: `Learn more about ${title} at the Dartry Mountains.`,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <HeroSection
        variant="split"
        heading={title}
        subheading="This page is coming soon. Content will be managed through Storyblok CMS."
        eyebrow="Coming Soon"
      />

      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-lg text-muted-foreground">
            This page will be populated with content from Storyblok. The
            component architecture is in place and ready for editorial content.
          </p>
        </div>
      </section>

      <CTABlock
        heading="Return Home"
        description="Explore what's available on the Dartry Mountains website."
        cta_label="Go to Home"
        cta_link={{ cached_url: "/" }}
      />
    </>
  );
}
