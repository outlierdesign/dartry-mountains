import { cn } from "@/lib/utils"
import Image from "next/image"

interface ImageObject {
  filename?: string
  alt?: string
}

interface EditorialStoryProps {
  eyebrow?: string
  heading: string
  content: string
  image?: ImageObject
  image_position?: "left" | "right" | "none"
  pull_quote?: string
  pull_quote_attribution?: string
  background_color?: string
  spacing?: "compact" | "normal" | "spacious"
}

export default function EditorialStory({
  eyebrow,
  heading,
  content,
  image,
  image_position = "none",
  pull_quote,
  pull_quote_attribution,
  background_color = "bg-cream",
  spacing = "normal",
}: EditorialStoryProps) {
  const spacingClasses = {
    compact: "py-12 md:py-16",
    normal: "py-24 md:py-32",
    spacious: "py-32 md:py-48",
  }

  const hasImage = image?.filename && image_position !== "none"

  const contentSection = (
    <div className="max-w-3xl mx-auto">
      {eyebrow && (
        <p className="text-xs tracking-widest uppercase text-moss-500 mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-stone-900 mb-8">
        {heading}
      </h2>

      <div className="prose prose-lg max-w-none text-stone-700 mb-8">
        <p className="leading-relaxed">{content}</p>
      </div>

      {pull_quote && (
        <blockquote className="border-l-4 border-gold-400 pl-6 py-4 my-12 max-w-2xl">
          <p className="font-display text-2xl md:text-3xl italic text-stone-800 mb-3">
            {pull_quote}
          </p>
          {pull_quote_attribution && (
            <p className="text-sm uppercase tracking-wide text-moss-600">
              — {pull_quote_attribution}
            </p>
          )}
        </blockquote>
      )}
    </div>
  )

  if (!hasImage) {
    return (
      <section className={cn("w-full", background_color, spacingClasses[spacing])}>
        <div className="container max-w-7xl mx-auto px-6">
          {contentSection}
        </div>
      </section>
    )
  }

  return (
    <section className={cn("w-full", background_color, spacingClasses[spacing])}>
      <div className="container max-w-7xl mx-auto px-6">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center",
          image_position === "right" && "lg:flex lg:flex-row-reverse"
        )}>
          {/* Image Side */}
          <div className="relative h-96 lg:h-full lg:min-h-[500px]">
            {image?.filename && (
              <Image
                src={image.filename}
                alt={image.alt || "Editorial image"}
                fill
                className="object-cover rounded-lg"
              />
            )}
          </div>

          {/* Content Side */}
          {contentSection}
        </div>
      </div>
    </section>
  )
}
