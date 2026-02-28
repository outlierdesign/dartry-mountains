"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

interface ImageObject {
  filename?: string
  alt?: string
}

interface VideoEmbedProps {
  heading?: string
  eyebrow?: string
  description?: string
  video_url: string
  poster?: ImageObject
  background?: "dark" | "light"
}

export default function VideoEmbed({
  heading,
  eyebrow,
  description,
  video_url,
  poster,
  background = "dark",
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const isDark = background === "dark"

  return (
    <section className={isDark ? "section-dark section-padding" : "section-light section-padding"}>
      <div className="container-content">
        {(heading || eyebrow) && (
          <div className="text-center mb-12">
            {eyebrow && <p className="label-eyebrow mb-4">{eyebrow}</p>}
            {heading && <h2 className={`heading-section ${isDark ? 'text-white' : ''}`}>{heading}</h2>}
            {description && <p className={`mt-4 max-w-2xl mx-auto text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-stone-500'}`}>{description}</p>}
          </div>
        )}

        <div className="relative aspect-video rounded-2xl overflow-hidden max-w-4xl mx-auto shadow-xl">
          {!isPlaying ? (
            <>
              {poster?.filename ? (
                <Image
                  src={poster.filename}
                  alt={poster.alt || "Video thumbnail"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-forest-dark to-forest-deep" />
              )}
              <div className="absolute inset-0 bg-black/30" />
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Play video"
              >
                <div className="w-20 h-20 rounded-full bg-gold-500/90 group-hover:bg-gold-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </button>
            </>
          ) : (
            <iframe
              src={`${video_url}?autoplay=1`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Video"
            />
          )}
        </div>
      </div>
    </section>
  )
}
