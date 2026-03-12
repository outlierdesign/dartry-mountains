"use client"

import { useState, useEffect } from "react"
import GalleryGrid from "@/components/storyblok/GalleryGrid"

interface GalleryImage {
  image: {
    filename: string
    alt: string
  }
  caption?: string
}

// Known local gallery images as fallback
const LOCAL_GALLERY_IMAGES: GalleryImage[] = [
  { image: { filename: "/images/gallery/Eagles Rock.JPG", alt: "Eagles Rock" } },
  { image: { filename: "/images/gallery/Benbulben.JPG", alt: "Benbulben" } },
  { image: { filename: "/images/gallery/Glenade_Valley.JPG", alt: "Glenade Valley" } },
  { image: { filename: "/images/gallery/Tievebaun_cliff.JPG", alt: "Tievebaun Cliff" } },
  { image: { filename: "/images/gallery/Dartry orchid.jpg", alt: "Dartry Orchid" } },
  { image: { filename: "/images/gallery/Glencar_Valley1.jpg", alt: "Glencar Valley" } },
  { image: { filename: "/images/gallery/Devils Chimney.JPG", alt: "Devils Chimney" } },
  { image: { filename: "/images/gallery/Lukes Bridge.JPG", alt: "Lukes Bridge" } },
  { image: { filename: "/images/gallery/Eagles rock crags.JPG", alt: "Eagles Rock Crags" } },
  { image: { filename: "/images/gallery/Benbulben_1.JPG", alt: "Benbulben" } },
  { image: { filename: "/images/gallery/Tievebaun wet grassland.jpg", alt: "Tievebaun Wet Grassland" } },
  { image: { filename: "/images/gallery/Dartry_mountain.jpeg", alt: "Dartry Mountain" } },
  { image: { filename: "/images/gallery/benbulben from southeast.jpg", alt: "Benbulben From Southeast" } },
  { image: { filename: "/images/gallery/Eagles_Rock.jpeg", alt: "Eagles Rock" } },
  { image: { filename: "/images/gallery/Hag's Leap.jpg", alt: "Hag's Leap" } },
]

/**
 * Client-side gallery component for use within the Storyblok page renderer.
 * Attempts to fetch gallery images from Storyblok CMS, falls back to local images.
 */
export default function ClientHomeGallery() {
  const [images, setImages] = useState<GalleryImage[]>(LOCAL_GALLERY_IMAGES)

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN
    if (!token) return

    fetch(
      `https://api.storyblok.com/v2/cdn/stories?starts_with=gallery/&sort_by=first_published_at:desc&token=${token}&version=draft`
    )
      .then((res) => res.json())
      .then((data) => {
        const stories = data?.stories ?? []
        const cmsImages: GalleryImage[] = stories
          .map((story: any) => ({
            image: {
              filename: story.content?.image?.filename || "",
              alt: story.content?.image?.alt || story.name || "Gallery image",
            },
            caption: story.content?.caption || story.content?.description,
          }))
          .filter((item: GalleryImage) => item.image.filename)
        if (cmsImages.length > 0) setImages(cmsImages)
      })
      .catch(() => {
        // Keep local gallery images as fallback
      })
  }, [])

  return (
    <div id="gallery">
      <GalleryGrid eyebrow="Visual Journey" heading="Gallery" images={images} />
    </div>
  )
}
