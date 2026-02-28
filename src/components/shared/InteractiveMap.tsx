"use client"

import { useEffect, useRef, useState } from "react"

interface InteractiveMapProps {
  centerLat?: number
  centerLng?: number
  zoom?: number
  showSpaBoundary?: boolean
  showSacBoundary?: boolean
}

export default function InteractiveMap({
  centerLat = 54.3833,
  centerLng = -8.3667,
  zoom = 11,
  showSpaBoundary = true,
  showSacBoundary = true,
}: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) {
      console.warn("Mapbox token not configured")
      return
    }

    let isMounted = true

    async function initMap() {
      const mapboxgl = (await import("mapbox-gl")).default
      // @ts-ignore - CSS import for mapbox styles
      await import("mapbox-gl/dist/mapbox-gl.css").catch(() => {})

      if (!isMounted || !mapContainer.current) return

      mapboxgl.accessToken = token!

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [centerLng, centerLat],
        zoom,
        attributionControl: true,
        pitchWithRotate: false,
      })

      mapRef.current = map

      map.addControl(new mapboxgl.NavigationControl(), "top-right")
      map.addControl(new mapboxgl.FullscreenControl(), "top-right")

      map.on("load", () => {
        if (!isMounted) return
        setMapLoaded(true)

        // SPA boundary (approximate polygon for Dartry Mountains SPA)
        if (showSpaBoundary) {
          map.addSource("spa-boundary", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: { name: "Dartry Mountains SPA" },
              geometry: {
                type: "Polygon",
                coordinates: [[
                  [-8.45, 54.35],
                  [-8.45, 54.42],
                  [-8.35, 54.44],
                  [-8.25, 54.42],
                  [-8.25, 54.38],
                  [-8.30, 54.35],
                  [-8.45, 54.35],
                ]],
              },
            },
          })

          map.addLayer({
            id: "spa-fill",
            type: "fill",
            source: "spa-boundary",
            paint: {
              "fill-color": "#4a7c23",
              "fill-opacity": 0.15,
            },
          })

          map.addLayer({
            id: "spa-outline",
            type: "line",
            source: "spa-boundary",
            paint: {
              "line-color": "#4a7c23",
              "line-width": 2,
              "line-dasharray": [2, 2],
            },
          })
        }

        // SAC boundary
        if (showSacBoundary) {
          map.addSource("sac-boundary", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: { name: "Dartry Mountains SAC" },
              geometry: {
                type: "Polygon",
                coordinates: [[
                  [-8.46, 54.34],
                  [-8.46, 54.43],
                  [-8.36, 54.45],
                  [-8.24, 54.43],
                  [-8.24, 54.37],
                  [-8.29, 54.34],
                  [-8.46, 54.34],
                ]],
              },
            },
          })

          map.addLayer({
            id: "sac-fill",
            type: "fill",
            source: "sac-boundary",
            paint: {
              "fill-color": "#b08f42",
              "fill-opacity": 0.1,
            },
          })

          map.addLayer({
            id: "sac-outline",
            type: "line",
            source: "sac-boundary",
            paint: {
              "line-color": "#b08f42",
              "line-width": 2,
            },
          })
        }
      })
    }

    initMap()

    return () => {
      isMounted = false
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [centerLat, centerLng, zoom, showSpaBoundary, showSacBoundary])

  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Legend */}
      {mapLoaded && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-md text-xs z-10">
          <p className="font-semibold text-stone-800 mb-2">Legend</p>
          {showSpaBoundary && (
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-3 rounded-sm border-2 border-dashed" style={{ borderColor: "#4a7c23", backgroundColor: "rgba(74,124,35,0.15)" }} />
              <span className="text-stone-600">SPA Boundary</span>
            </div>
          )}
          {showSacBoundary && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 rounded-sm border-2" style={{ borderColor: "#b08f42", backgroundColor: "rgba(176,143,66,0.1)" }} />
              <span className="text-stone-600">SAC Boundary</span>
            </div>
          )}
        </div>
      )}

      {/* No token fallback */}
      {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-100 rounded-lg">
          <div className="text-center">
            <p className="text-stone-500 text-sm">Map requires Mapbox configuration</p>
            <p className="text-stone-400 text-xs mt-1">Set NEXT_PUBLIC_MAPBOX_TOKEN in your environment</p>
          </div>
        </div>
      )}
    </div>
  )
}
