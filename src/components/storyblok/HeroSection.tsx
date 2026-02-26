"use client"

import { cn } from "@/lib/utils"
import ScrollReveal from "@/components/shared/ScrollReveal"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ImageObject {
  filename?: string
  alt?: string
}

interface Stat {
  label: string
  value: string
  suffix?: string
}

interface HeroSectionProps {
  variant?: "cinematic" | "split" | "video" | "map"
  heading: string
  subheading?: string
  eyebrow?: string
  image?: ImageObject
  overlay_opacity?: number
  show_scroll_indicator?: boolean
  cta_label?: string
  cta_link?: string
  cta_secondary_label?: string
  cta_secondary_link?: string
  stats?: Stat[]
  background_color?: string
  spacing?: "compact" | "normal" | "spacious"
  padding_top?: "none" | "small" | "medium" | "large"
}

export default function HeroSection({
  variant = "cinematic",
  heading,
  subheading,
  eyebrow,
  image,
  overlay_opacity = 0.4,
  show_scroll_indicator = true,
  cta_label,
  cta_link,
  cta_secondary_label,
  cta_secondary_link,
  stats = [],
  background_color = "bg-stone-950",
  spacing = "normal",
  padding_top = "medium",
}: HeroSectionProps) {
  const spacingClasses = {
    compact: "min-h-[50vh]",
    normal: "min-h-screen",
    spacious: "min-h-[120vh]",
  }

  const paddingTopClasses = {
    none: "pt-0",
    small: "pt-16",
    medium: "pt-20",
    large: "pt-28",
  }

  if (variant === "split") {
    return (
      <section className={cn("w-full", background_color, paddingTopClasses[padding_top])}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          {/* Text Content */}
          <div className="px-6 md:px-12 py-20 md:py-32 lg:py-40 flex flex-col justify-center">
            {eyebrow && (
              <p className="text-xs tracking-widest uppercase text-moss-600 mb-4">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight text-cream mb-6">
              {heading}
            </h1>
            {subheading && (
              <p className="text-lg md:text-xl text-cream/80 mb-8 max-w-xl">
                {subheading}
              </p>
            )}

            {/* CTA Buttons */}
            {(cta_label || cta_secondary_label) && (
              <div className="flex gap-4 items-center">
                {cta_label && cta_link && (
                  <Link
                    href={cta_link}
                    className={cn(
                      "px-8 py-3 rounded-lg font-semibold transition-all duration-300",
                      "bg-gold-400 text-moss-900 hover:bg-gold-500",
                      "inline-block"
                    )}
                  >
                    {cta_label}
                  </Link>
                )}
                {cta_secondary_label && cta_secondary_link && (
                  <Link
                    href={cta_secondary_link}
                    className={cn(
                      "px-8 py-3 rounded-lg font-semibold transition-all duration-300",
                      "border border-white text-white hover:bg-white/10",
                      "inline-block"
                    )}
                  >
                    {cta_secondary_label}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Image Side */}
          <div className="relative h-full min-h-[500px] lg:min-h-screen">
            {image?.filename ? (
              <Image
                src={image.filename}
                alt={image.alt || "Hero image"}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-stone-800 to-stone-900" />
            )}
          </div>
        </div>
      </section>
    )
  }

  // Cinematic variant (default)
  return (
    <section
      className={cn(spacingClasses[spacing], paddingTopClasses[padding_top], "relative w-full overflow-hidden flex items-center justify-center")}
      style={{
        backgroundImage: image?.filename
          ? `url(${image.filename})`
          : "linear-gradient(135deg, rgb(78, 67, 54) 0%, rgb(41, 37, 36) 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlay_opacity})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12">
        {eyebrow && (
          <p className="text-xs tracking-widest uppercase text-gold-400 mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-cream mb-6 max-w-5xl">
          {heading}
        </h1>
        {subheading && (
          <p className="text-lg md:text-2xl text-cream/90 mb-12 max-w-3xl">
            {subheading}
          </p>
        )}

        {/* CTA Buttons */}
        {(cta_label || cta_secondary_label) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {cta_label && cta_link && (
              <Link
                href={cta_link}
                className={cn(
                  "px-10 py-4 rounded-lg font-semibold transition-all duration-300",
                  "bg-gold-400 text-moss-900 hover:bg-gold-500 hover:shadow-lg",
                  "inline-block"
                )}
              >
                {cta_label}
              </Link>
            )}
            {cta_secondary_label && cta_secondary_link && (
              <Link
                href={cta_secondary_link}
                className={cn(
                  "px-10 py-4 rounded-lg font-semibold transition-all duration-300",
                  "border-2 border-white text-white hover:bg-white/10",
                  "inline-block"
                )}
              >
                {cta_secondary_label}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Stats Overlay */}
      {stats && stats.length > 0 && (
        <div className="absolute bottom-12 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <p className="text-2xl md:text-3xl font-display text-gold-400 mb-1">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm uppercase tracking-wide text-cream/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      {show_scroll_indicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-6 h-6 text-cream/60" />
        </div>
      )}
    </section>
  )
}
