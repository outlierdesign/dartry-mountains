"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface ImageObject {
  filename?: string
  alt?: string
}

interface GalleryImage {
  image: ImageObject
  caption?: string
}

interface GalleryGridProps {
  heading?: string
  eyebrow?: string
  images: GalleryImage[]
  columns?: 2 | 3 | 4
}

// Bento size patterns: each image gets a column span and row span
// Pattern repeats every 8 images for visual rhythm
const BENTO_PATTERNS = [
  { colSpan: 2, rowSpan: 2 }, // Large feature
  { colSpan: 1, rowSpan: 1 }, // Small
  { colSpan: 1, rowSpan: 1 }, // Small
  { colSpan: 1, rowSpan: 2 }, // Tall
  { colSpan: 1, rowSpan: 1 }, // Small
  { colSpan: 2, rowSpan: 1 }, // Wide
  { colSpan: 1, rowSpan: 1 }, // Small
  { colSpan: 1, rowSpan: 1 }, // Small
]

export default function GalleryGrid({
  heading,
  eyebrow,
  images,
}: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const navigateLightbox = (direction: number) => {
    if (lightboxIndex === null) return
    const next = lightboxIndex + direction
    if (next >= 0 && next < images.length) setLightboxIndex(next)
  }

  // Handle keyboard navigation in lightbox
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setLightboxIndex(null)
    if (e.key === "ArrowLeft") navigateLightbox(-1)
    if (e.key === "ArrowRight") navigateLightbox(1)
  }

  // Assign bento sizes to each image
  const bentoImages = useMemo(
    () =>
      images.map((img, i) => ({
        ...img,
        ...BENTO_PATTERNS[i % BENTO_PATTERNS.length],
      })),
    [images]
  )

  return (
    <section className="section-cream section-padding">
      <div className="container-content">
        {(heading || eyebrow) && (
          <div className="text-center mb-12">
            {eyebrow && <p className="label-eyebrow mb-4">{eyebrow}</p>}
            {heading && <h2 className="heading-section">{heading}</h2>}
          </div>
        )}

        {/* Bento Masonry Grid */}
        <div
          className="grid gap-3 md:gap-4"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "minmax(140px, 1fr)",
          }}
        >
          {bentoImages.map(
            (item, idx) =>
              item.image?.filename && (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="relative rounded-xl overflow-hidden group cursor-pointer"
                  style={{
                    gridColumn: `span ${item.colSpan}`,
                    gridRow: `span ${item.rowSpan}`,
                  }}
                  aria-label={`View ${item.caption || item.image.alt || "image"}`}
                >
                  <Image
                    src={item.image.filename}
                    alt={item.image.alt || ""}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes={
                      item.colSpan === 2
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 50vw, 25vw"
                    }
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs md:text-sm text-white font-medium">
                        {item.caption}
                      </p>
                    </div>
                  )}
                </button>
              )
          )}
        </div>

        {/* Mobile fallback: stack on very small screens */}
        <style jsx>{`
          @media (max-width: 639px) {
            .grid {
              grid-template-columns: repeat(2, 1fr) !important;
              grid-auto-rows: minmax(120px, 1fr) !important;
            }
          }
        `}</style>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && images[lightboxIndex]?.image?.filename && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-label="Image lightbox"
          tabIndex={0}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex(null)
            }}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 text-white/50 text-sm z-10">
            {lightboxIndex + 1} / {images.length}
          </div>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateLightbox(-1)
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {lightboxIndex < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateLightbox(1)
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div
            className="relative max-w-6xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].image.filename!}
              alt={images[lightboxIndex].image.alt || ""}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {images[lightboxIndex].caption && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/70 text-center max-w-md">
              {images[lightboxIndex].caption}
            </p>
          )}
        </div>
      )}
    </section>
  )
}
