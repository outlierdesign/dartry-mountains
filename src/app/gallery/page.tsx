import { Metadata } from "next";
import { getStoryblokApi } from "@storyblok/react/rsc";
import GalleryGrid from "@/components/storyblok/GalleryGrid";
import ScrollReveal from "@/components/shared/ScrollReveal";

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

export const revalidate = 60; // ISR: revalidate every 60 seconds

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
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "draft",
      starts_with: "gallery/",
      sort_by: "first_published_at:desc",
    });

    const stories = data?.stories ?? [];
    return stories.map((story: any) => ({
      image: {
        filename: story.content?.image?.filename || "",
        alt: story.content?.image?.alt || story.name || "Gallery image",
      },
      caption: story.content?.caption || story.content?.description,
    })).filter((item: GalleryImage) => item.image.filename);
  } catch (e) {
    console.warn("Failed to fetch gallery images from Storyblok:", e);
    return [];
  }
}

function getPlaceholderGallery(): GalleryImage[] {
  const placeholderImages = [
    { filename: "/images/Female Harrier on Nest.jpg", alt: "Female Harrier on Nest" },
    { filename: "/images/Female Hen Harrier in Flight.jpg", alt: "Female Hen Harrier in Flight" },
    { filename: "/images/Female Hen Harrier on the Ground.jpg", alt: "Female Hen Harrier on the Ground" },
    { filename: "/images/Food Pass.jpg", alt: "Hen Harrier Food Pass" },
    { filename: "/images/Hen Harrier Chicks.jpg", alt: "Hen Harrier Chicks" },
    { filename: "/images/Hen Harrier display.jpg", alt: "Hen Harrier Display" },
    { filename: "/images/JGTWKH (1).jpg", alt: "Harrier in Flight" },
    { filename: "/images/Male Harrier in Flight 2.jpg", alt: "Male Harrier in Flight" },
    { filename: "/images/Male Harrier in Flight.jpg", alt: "Male Harrier in Flight" },
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
  const cmsImages = await fetchGalleryImages();
  const images = cmsImages.length > 0 ? cmsImages : getPlaceholderGallery();

  return (
    <main>
      {/* Header Section */}
      <section className="section-cream section-padding">
        <div className="container-content">
          <div className="mb-4">
            <p className="label-eyebrow">Visual Journey</p>
          </div>
          <h1 className="heading-section font-display">Gallery</h1>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <ScrollReveal>
        <GalleryGrid images={images} columns={4} />
      </ScrollReveal>
    </main>
  );
}
