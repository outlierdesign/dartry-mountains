"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Dynamically import the InteractiveMap with SSR disabled (Mapbox requires browser APIs)
const InteractiveMap = dynamic(
  () => import("@/components/shared/InteractiveMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse mb-3">
            <div className="h-8 w-8 mx-auto rounded-full bg-moss-300" />
          </div>
          <p className="text-sm text-stone-500">Loading map…</p>
        </div>
      </div>
    ),
  }
);

interface MapSectionProps {
  heading: string;
  description?: string;
  center_lat?: number;
  center_lng?: number;
  zoom?: number;
  background_color?: string;
  spacing?: "compact" | "normal" | "spacious";
}

export default function MapSection({
  heading,
  description,
  center_lat = 54.37,
  center_lng = -8.35,
  zoom = 11,
  background_color = "bg-cream",
  spacing = "normal",
}: MapSectionProps) {
  const spacingClasses = {
    compact: "py-12 md:py-16",
    normal: "py-24 md:py-32",
    spacious: "py-32 md:py-48",
  };

  return (
    <section className={cn("w-full", background_color, spacingClasses[spacing])}>
      <div className="container max-w-7xl mx-auto px-6">
        {/* Header */}
        {(heading || description) && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            {heading && (
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-stone-900 mb-6">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-lg text-stone-700">{description}</p>
            )}
          </div>
        )}

        {/* Map Container */}
        <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
          <InteractiveMap
            centerLat={center_lat}
            centerLng={center_lng}
            zoom={zoom}
          />
        </div>
      </div>
    </section>
  );
}
