"use client"

import { cn } from "@/lib/utils"
import { ChevronDown, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

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
  variant?: "cinematic" | "split" | "video"
  heading: string
  subheading?: string
  eyebrow?: string
  image?: ImageObject
  video_url?: string
  video_bg?: string
  overlay_opacity?: number
  show_scroll_indicator?: boolean
  cta_label?: string
  cta_link?: string
  cta_secondary_label?: string
  cta_secondary_link?: string
  stats?: Stat[]
  padding_top?: "none" | "small" | "medium" | "large"
}

export default function HeroSection({
  variant = "cinematic",
  heading,
  subheading,
  eyebrow,
  image,
  video_url,
  video_bg,
  overlay_opacity = 0.45,
  show_scroll_indicator = true,
  cta_label,
  cta_link,
  cta_secondary_label,
  cta_secondary_link,
  stats = [],
  padding_top = "medium",
}: HeroSectionProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [youtubeId, setYoutubeId] = useState<string | null>(null)

  useEffect(() => {
    // Extract YouTube video ID from video_bg if it's a YouTube URL
    if (video_bg) {
      const ytMatch = video_bg.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      )
      if (ytMatch) {
        setYoutubeId(ytMatch[1])
      }
    }
  }, [video_bg])

  useEffect(() => {
    // Attempt to play the background video on mount (for local .mp4 files)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const paddingTopClasses = {
    none: "pt-0",
    small: "pt-16",
    medium: "pt-20",
    large: "pt-28",
  }

  if (variant === "split") {
    return (
      <section className={cn("w-full bg-forest-dark", paddingTopClasses[padding_top])}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[80vh]">
          <div className="px-8 md:px-16 py-20 md:py-32 flex flex-col justify-center">
            {eyebrow && (
              <p className="label-eyebrow mb-6">{eyebrow}</p>
            )}
            <h1 className="heading-display text-white mb-6 max-w-xl">
              {heading}
            </h1>
            {subheading && (
              <p className="text-lg text-white/65 mb-10 max-w-lg leading-relaxed">
                {subheading}
              </p>
            )}
            {(cta_label || cta_secondary_label) && (
              <div className="flex flex-wrap gap-4">
                {cta_label && cta_link && (
                  <Link href={cta_link} className="btn-primary">{cta_label}</Link>
                )}
                {cta_secondary_label && cta_secondary_link && (
                  <Link href={cta_secondary_link} className="btn-outline text-white/80 border-white/30 hover:bg-white/10 hover:border-white/50 hover:text-white">{cta_secondary_label}</Link>
                )}
              </div>
            )}
          </div>
          <div className="relative min-h-[400px] lg:min-h-full">
            {image?.filename ? (
              <Image
                src={image.filename}
                alt={image.alt || "Hero image"}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-forest-dark to-forest-deep" />
            )}
          </div>
        </div>
      </section>
    )
  }

  // Cinematic (default)
  return (
    <section
      className={cn(
        "relative w-full min-h-screen overflow-hidden flex items-center justify-center",
        paddingTopClasses[padding_top]
      )}
    >
      {/* Background Video — YouTube embed or local .mp4 */}
      {video_bg && youtubeId && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full min-h-full h-[56.25vw]"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Background video"
            style={{ border: "none" }}
          />
        </div>
      )}
      {video_bg && !youtubeId && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          poster={image?.filename || undefined}
        >
          <source src={video_bg} type="video/mp4" />
        </video>
      )}

      {/* Background Image (fallback when no video, or poster frame) */}
      {!video_bg && image?.filename && (
        <Image
          src={image.filename}
          alt={image.alt || ""}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ objectPosition: "center" }}
        />
      )}
      {!video_bg && !image?.filename && (
        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark to-moss-900" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(18, 32, 23, ${overlay_opacity})` }} />

      {/* Video Play Button */}
      {video_url && !isVideoPlaying && (
        <button
          onClick={() => setIsVideoPlaying(true)}
          className="absolute z-20 w-20 h-20 rounded-full bg-gold-500/90 hover:bg-gold-500 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          aria-label="Play video"
        >
          <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Video Iframe */}
      {video_url && isVideoPlaying && (
        <div className="absolute inset-0 z-30 bg-black">
          <iframe
            src={`${video_url}?autoplay=1`}
            className="w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Video"
          />
          <button
            onClick={() => setIsVideoPlaying(false)}
            className="absolute top-6 right-6 z-40 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            aria-label="Close video"
          >
            ✕
          </button>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12">
        {eyebrow && (
          <p className="label-eyebrow text-gold-400 mb-6">{eyebrow}</p>
        )}
        <h1 className="heading-display text-white mb-6 max-w-5xl">
          {heading}
        </h1>
        {subheading && (
          <p className="text-lg md:text-xl text-white/75 mb-12 max-w-3xl leading-relaxed">
            {subheading}
          </p>
        )}

        {(cta_label || cta_secondary_label) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {cta_label && cta_link && (
              <Link href={cta_link} className="btn-primary">{cta_label}</Link>
            )}
            {cta_secondary_label && cta_secondary_link && (
              <Link href={cta_secondary_link} className="btn-outline text-white/80 border-white/30 hover:bg-white/10 hover:border-white/50 hover:text-white">{cta_secondary_label}</Link>
            )}
          </div>
        )}
      </div>

      {/* Stats Overlay */}
      {stats && stats.length > 0 && (
        <div className="absolute bottom-16 left-0 right-0 z-20">
          <div className="container-content grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <p className="stat-number">{stat.value}{stat.suffix}</p>
                <p className="stat-label text-white/60 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      {show_scroll_indicator && !isVideoPlaying && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-5 h-5 text-white/40" />
        </div>
      )}
    </section>
  )
}
