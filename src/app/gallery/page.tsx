import { Metadata } from "next";
import GalleryGrid from "@/components/storyblok/GalleryGrid";
import ScrollReveal from "@/components/shared/ScrollReveal";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Gallery | Dartry Mountains",
  description:
    "Explore our photo gallery showcasing the stunning beauty and wildlife of the Dartry Mountains, a Special Protection Area in Counties Sligo and Leitrim, Ireland.",
  openGraph: {
    title: "Gallery | Dartry Mountains",
    description:
      "Photo gallery of the Dartry Mountains landscape and wildlife",
    type: "website",
  },
};

export const revalidate = 60;

interface GalleryImage {
  image: {
    filename: string;
    alt: string;
  };
  caption?: string;
}

async function fetchGalleryImages(): Promise<GalleryImage[]> {
  const token = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories?starts_with=gallery/&sort_by=first_published_at:desc&token=${token}&version=draft`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    const stories = data?.stories ?? [];

    return stories
      .map((story: any) => ({
        image: {
          filename: story.content?.image?.filename || "",
          alt: story.content?.image?.alt || story.name || "Gallery image",
        },
        caption: story.content?.caption || story.content?.description,
      }))
      .filter((item: GalleryImage) => item.image.filename);
  } catch (e) {
    console.warn("Failed to fetch gallery images from Storyblok:", e);
    return [];
  }
}

function getLocalGalleryImages(): GalleryImage[] {
  // Scan public/images/gallery for image files
  try {
    const galleryDir = path.join(process.cwd(), "public", "images", "gallery");
    if (!fs.existsSync(galleryDir)) return [];

    const files = fs.readdirSync(galleryDir);
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

    return files
      .filter((f) =>
        imageExtensions.includes(path.extname(f).toLowerCase())
      )
      .sort()
      .map((f) => ({
        image: {
          filename: `/images/gallery/${f}`,
          alt: f
            .replace(/\.[^.]+$/, "")
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        },
        caption: undefined,
      }));
  } catch {
    return [];
  }
}

function getPlaceholderGallery(): GalleryImage[] {
  const placeholderImages = [
    {
      filename: "/images/Female Harrier on Nest.jpg",
      alt: "Female Harrier on Nest",
    },
    {
      filename: "/images/Female Hen Harrier in Flight.jpg",
      alt: "Female Hen Harrier in Flight",
    },
    {
      filename: "/images/Female Hen Harrier on the Ground.jpg",
      alt: "Female Hen Harrier on the Ground",
    },
    {
      filename: "/images/Food Pass.jpg",
      alt: "Hen Harrier Food Pass",
    },
    {
      filename: "/images/Hen Harrier Chicks.jpg",
      alt: "Hen Harrier Chicks",
    },
    {
      filename: "/images/Hen Harrier display.jpg",
      alt: "Hen Harrier Display",
    },
    {
      filename: "/images/JGTWKH (1).jpg",
      alt: "Harrier in Flight",
    },
    {
      filename: "/images/Male Harrier in Flight 2.jpg",
      alt: "Male Harrier in Flight",
    },
    {
      filename: "/images/Male Harrier in Flight.jpg",
      alt: "Male Harrier in Flight",
    },
  ];

  return placeholderImages.map((img) => ({
    image: {
      filename: img.filename,
      alt: img.alt,
    },
    caption: undefined,
  }));
}

export default async function GalleryPage() {
  // Priority: CMS images > local gallery folder > placeholder images
  const cmsImages = await fetchGalleryImages();
  const localImages = getLocalGalleryImages();
  const images =
    cmsImages.length > 0
      ? cmsImages
      : localImages.length > 0
        ? localImages
        : getPlaceholderGallery();

  return (
    <div>
      {/* Header Section */}
      <section className="section-cream pt-32 pb-12 md:pt-36 md:pb-16">
        <div className="container-content">
          <div className="mb-4">
            <p className="label-eyebrow">Visual Journey</p>
          </div>
          <h1 className="heading-section font-display">Gallery</h1>
          <p className="text-lg text-stone-600 mt-4 max-w-2xl">
            Landscapes, wildlife, and the farming heritage of the Dartry
            Mountains — a Special Protection Area in Counties Sligo and Leitrim.
          </p>
        </div>
      </section>

      {/* Bento Masonry Gallery */}
      <ScrollReveal>
        <GalleryGrid images={images} />
      </ScrollReveal>
    </div>
  );
}
