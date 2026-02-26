import { cn } from "@/lib/utils"
import Image from "next/image"

interface ImageObject {
  filename?: string
  alt?: string
}

interface ImageTextSplitProps {
  heading: string
  content: string
  image?: ImageObject
  image_position?: "left" | "right"
  caption?: string
  eyebrow?: string
  background_color?: string
  spacing?: "compact" | "normal" | "spacious"
}

export default function ImageTextSplit({
  heading,
  content,
  image,
  image_position = "left",
  caption,
  eyebrow,
  background_color = "bg-cream",
  spacing = "normal",
}: ImageTextSplitProps) {
  const spacingClasses = {
    compact: "py-12 md:py-16",
    normal: "py-24 md:py-32",
    spacious: "py-32 md:py-48",
  }

  const imageSection = (
    <div className="flex flex-col">
      <div className="relative h-96 md:h-[500px] lg:h-full lg:min-h-[600px] rounded-lg overflow-hidden">
        {image?.filename ? (
          <Image
            src={image.filename}
            alt={image.alt || "Section image"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-moss-100 to-stone-200 flex items-center justify-center">
            <svg className="w-16 h-16 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      {caption && (
        <p className="text-sm text-stone-600 mt-4 italic">
          {caption}
        </p>
      )}
    </div>
  )

  const textSection = (
    <div className="flex flex-col justify-center">
      {eyebrow && (
        <p className="text-xs tracking-widest uppercase text-moss-600 mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl md:text-5xl leading-tight text-stone-900 mb-6">
        {heading}
      </h2>
      <p className="text-lg text-stone-700 leading-relaxed">
        {content}
      </p>
    </div>
  )

  return (
    <section className={cn("w-full", background_color, spacingClasses[spacing])}>
      <div className="container max-w-7xl mx-auto px-6">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center",
          image_position === "right" && "lg:[&>div:first-child]:order-last"
        )}>
          {imageSection}
          {textSection}
        </div>
      </div>
    </section>
  )
}
