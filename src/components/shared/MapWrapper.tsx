"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] w-full items-center justify-center rounded-lg bg-stone-100">
      <div className="text-center">
        <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-moss-300 border-t-moss-700" />
        <p className="text-sm text-muted-foreground">Loading interactive map&hellip;</p>
      </div>
    </div>
  ),
});

interface MapWrapperProps {
  className?: string;
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  showSpaBoundary?: boolean;
  showSacBoundary?: boolean;
}

export default function MapWrapper({
  className,
  centerLat = 54.3833,
  centerLng = -8.3667,
  zoom = 11,
  showSpaBoundary = true,
  showSacBoundary = true,
}: MapWrapperProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      <InteractiveMap
        centerLat={centerLat}
        centerLng={centerLng}
        zoom={zoom}
        showSpaBoundary={showSpaBoundary}
        showSacBoundary={showSacBoundary}
      />
      {/* Accessible fallback */}
      <noscript>
        <div className="flex h-[500px] items-center justify-center bg-stone-100 p-8 text-center">
          <div>
            <h3 className="mb-2 font-display text-lg font-semibold">
              Dartry Mountains Interactive Map
            </h3>
            <p className="text-sm text-muted-foreground">
              This interactive map requires JavaScript to display. The Dartry
              Mountains are located in Counties Sligo and Leitrim, Ireland,
              centered approximately at 54.38°N, 8.37°W.
            </p>
          </div>
        </div>
      </noscript>
    </div>
  );
}
