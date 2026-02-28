"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageObject {
  filename?: string
  alt?: string
}

interface EditorialStoryProps {
  heading?: string
  eyebrow?: string
  body?: string
  image?: ImageObject
  image_position?: "left" | "right"
  background?: "dark" | "light" | "cream"
  bullets?: string[]
}

export default function EditorialStory({
  heading,
  eyebrow,
  body,
  image,
  image_position = "right",
  background = "light",
  bullets = [],
}: EditorialStoryProps) {
  const bgClass = {
    dark: "section-dark",
    light: "section-light",
    cream: "section-cream",
  }[background]

  const textColor = background === "dark" ? "text-white/65" : "text-stone-600"
  const headingColor = background === "dark" ? "text-white" : "text-foreground"

  return (
    <section className={cn(bgClass, "section-padding")}>
      <div className="container-content">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
          image_position === "left" && "lg:[&>*:first-child]:order-2"
        )}>
          {/* Text */}
          <div>
            {eyebrow && (
              <p className="label-eyebrow mb-4">{eyebrow}</p>
            )}
            {heading && (
              <h2 className={cn("heading-section mb-8", headingColor)}>
                {heading}
              </h2>
            )}
            <div className={cn("prose-dartry", background !== "dark" && "!text-stone-600")}>
              {(body || '').split('\n\n').filter(Boolean).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            {bullets.length > 0 && (
              <ul className="mt-6 space-y-3">
                {bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1.5 w-5 h-5 rounded-full bg-moss-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className={cn("text-sm leading-relaxed", textColor)}>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Image */}
          {image?.filename && (
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={image.filename}
                alt={image.alt || ""}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
