import { cn } from "@/lib/utils"

interface MapSectionProps {
  heading: string
  description?: string
  center_lat?: number
  center_lng?: number
  zoom?: number
  show_spa_boundary?: boolean
  show_sac_boundary?: boolean
  background_color?: string
  spacing?: "compact" | "normal" | "spacious"
}

// MapWrapper component would be imported from @/components/shared/MapWrapper
// For now, we create a placeholder/stub
function MapWrapper({ 
  lat, 
  lng, 
  zoom, 
  showSpaBoundary, 
  showSacBoundary 
}: { 
  lat?: number
  lng?: number
  zoom?: number
  showSpaBoundary?: boolean
  showSacBoundary?: boolean
}) {
  return (
    <div className="w-full h-96 md:h-[600px] bg-gradient-to-br from-sky-100 to-sky-200 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <p className="text-stone-600 font-semibold mb-2">Interactive Map</p>
        <p className="text-sm text-stone-500">
          Center: {lat?.toFixed(2) || "0.00"}, {lng?.toFixed(2) || "0.00"} | Zoom: {zoom || 10}
        </p>
        {(showSpaBoundary || showSacBoundary) && (
          <p className="text-xs text-stone-400 mt-2">
            {showSpaBoundary && "SPA Boundary"} {showSpaBoundary && showSacBoundary && "·"} {showSacBoundary && "SAC Boundary"}
          </p>
        )}
      </div>
    </div>
  )
}

export default function MapSection({
  heading,
  description,
  center_lat = 54.2,
  center_lng = -8.3,
  zoom = 10,
  show_spa_boundary = false,
  show_sac_boundary = false,
  background_color = "bg-cream",
  spacing = "normal",
}: MapSectionProps) {
  const spacingClasses = {
    compact: "py-12 md:py-16",
    normal: "py-24 md:py-32",
    spacious: "py-32 md:py-48",
  }

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
              <p className="text-lg text-stone-700">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Map Container */}
        <div className="mb-8">
          <MapWrapper
            lat={center_lat}
            lng={center_lng}
            zoom={zoom}
            showSpaBoundary={show_spa_boundary}
            showSacBoundary={show_sac_boundary}
          />
        </div>

        {/* Legend/Note */}
        {(show_spa_boundary || show_sac_boundary) && (
          <div className="bg-sky-50 rounded-lg p-4 border border-sky-200">
            <p className="text-sm text-stone-700">
              <span className="font-semibold">Map Legend:</span>
              {show_spa_boundary && " • SPA (Special Protection Area) boundary"}
              {show_spa_boundary && show_sac_boundary && " •"}
              {show_sac_boundary && " SAC (Special Area of Conservation) boundary"}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
