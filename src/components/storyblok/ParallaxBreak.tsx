import Image from "next/image"

interface ImageObject {
  filename?: string
  alt?: string
}

interface ParallaxBreakProps {
  image?: ImageObject
  quote?: string
  attribution?: string
  overlay_opacity?: number
}

export default function ParallaxBreak({
  image,
  quote,
  attribution,
  overlay_opacity = 0.55,
}: ParallaxBreakProps) {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {image?.filename && (
        <Image
          src={image.filename}
          alt={image.alt || ""}
          fill
          className="object-cover"
          style={{ objectPosition: "center" }}
          sizes="100vw"
        />
      )}
      {!image?.filename && (
        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark to-moss-900" />
      )}
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(18, 32, 23, ${overlay_opacity})` }} />
      
      {quote && (
        <div className="relative z-10 text-center px-8 max-w-3xl">
          <blockquote className="quote-accent text-white">
            &ldquo;{quote}&rdquo;
          </blockquote>
          {attribution && (
            <p className="mt-4 text-sm text-white/50 uppercase tracking-wider font-body">{attribution}</p>
          )}
        </div>
      )}
    </section>
  )
}
