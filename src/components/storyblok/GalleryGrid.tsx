"use client"

import { useState } from "react"
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

export default function GalleryGrid({
  heading,
  eyebrow,
  images,
  columns = 3,
}: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  }

  const navigateLightbox = (direction: number) => {
    if (lightboxIndex === null) return
    const next = lightboxIndex + direction
    if (next >= 0 && next < images.length) setLightboxIndex(next)
  }

  return (
    <section className="section-cream section-padding">
      <div className="container-content">
        {(heading || eyebrow) && (
          <div className="text-center mb-12">
            {eyebrow && <p className="label-eyebrow mb-4">{eyebrow}</p>}
            {heading && <h2 className="heading-section">{heading}</h2>}
          </div>
        )}

        <div className={`grid ${gridCols[columns]} gap-4`}>
          {images.map((item, idx) => (
            item.image?.filename && (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                aria-label={`View ${item.caption || item.image.alt || 'image'}`}
              >
                <Image
                  src={item.image.filename}
                  alt={item.image.alt || ""}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${Math.round(100/columns)}vw`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white">{item.caption}</p>
                  </div>
                )}
              </button>
            )
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && images[lightboxIndex]?.image?.filename && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null) }}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1) }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {lightboxIndex < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div className="relative max-w-5xl max-h-[85vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
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
