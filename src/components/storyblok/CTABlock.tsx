import { cn } from "@/lib/utils";
import Link from "next/link";

interface CTALink {
  cached_url?: string;
  url?: string;
}

interface CTABlockProps {
  heading: string;
  description: string;
  cta_label: string;
  cta_link?: CTALink;
  cta_secondary_label?: string;
  cta_secondary_link?: CTALink;
  background_color?: string;
  spacing?: "compact" | "normal" | "generous";
}

export default function CTABlock({
  heading,
  description,
  cta_label,
  cta_link,
  cta_secondary_label,
  cta_secondary_link,
  background_color = "cream",
  spacing = "normal",
}: CTABlockProps) {
  const spacingClasses = {
    compact: "py-16 md:py-20",
    normal: "py-24 md:py-32",
    generous: "py-32 md:py-40",
  };

  const bgClasses = {
    cream: "bg-cream",
    "cream-light": "bg-cream-light",
    stone: "bg-stone-50",
    transparent: "bg-transparent",
  };

  const primaryLink = cta_link?.cached_url || cta_link?.url || "#";
  const secondaryLink = cta_secondary_link?.cached_url || cta_secondary_link?.url || "#";

  return (
    <section
      className={cn(
        "w-full",
        spacingClasses[spacing as keyof typeof spacingClasses],
        bgClasses[background_color as keyof typeof bgClasses] || bgClasses.cream
      )}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-moss-900 mb-4">
          {heading}
        </h2>

        {/* Description */}
        <p className="text-lg text-muted-foreground text-center mt-4 mb-8">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          {/* Primary Button */}
          <Link
            href={primaryLink}
            className={cn(
              "px-8 py-3 rounded-md font-medium transition-colors text-center",
              "bg-moss-700 text-white hover:bg-moss-800"
            )}
          >
            {cta_label}
          </Link>

          {/* Secondary Button */}
          {cta_secondary_label && (
            <Link
              href={secondaryLink}
              className={cn(
                "px-8 py-3 rounded-md font-medium transition-colors text-center",
                "border border-moss-700 text-moss-700 hover:bg-moss-50"
              )}
            >
              {cta_secondary_label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
