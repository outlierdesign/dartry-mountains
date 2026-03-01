"use client"

import { useEffect, useRef, useState } from "react"

interface InteractiveMapProps {
  centerLat?: number
  centerLng?: number
  zoom?: number
  showSpaBoundary?: boolean
  showSacBoundary?: boolean
}

// Approximate SPA boundary polygon (Dartry Mountains SPA)
const SPA_BOUNDARY: GeoJSON.Feature = {
  type: "Feature",
  properties: { name: "Dartry Mountains SPA", designation: "Special Protection Area" },
  geometry: {
    type: "Polygon",
    coordinates: [[
      [-8.45, 54.35], [-8.42, 54.33], [-8.38, 54.32], [-8.33, 54.33],
      [-8.30, 54.35], [-8.28, 54.38], [-8.29, 54.41], [-8.32, 54.43],
      [-8.36, 54.44], [-8.40, 54.43], [-8.43, 54.41], [-8.45, 54.38],
      [-8.45, 54.35],
    ]],
  },
}

// Ben Bulben, Gleniff and Glenade Complex SAC
const SAC_BOUNDARY: GeoJSON.Feature = {
  type: "Feature",
  properties: { name: "Ben Bulben, Gleniff and Glenade Complex SAC", designation: "Special Area of Conservation" },
  geometry: {
    type: "Polygon",
    coordinates: [[
      [-8.46, 54.34], [-8.43, 54.31], [-8.37, 54.30], [-8.31, 54.32],
      [-8.27, 54.35], [-8.26, 54.39], [-8.27, 54.42], [-8.31, 54.45],
      [-8.37, 54.46], [-8.42, 54.44], [-8.45, 54.41], [-8.47, 54.37],
      [-8.46, 54.34],
    ]],
  },
}

// Load Mapbox GL CSS via <link> tag in document head
function loadMapboxCSS() {
  if (typeof document === "undefined") return
  const id = "mapbox-gl-css"
  if (document.getElementById(id)) return
  const link = document.createElement("link")
  link.id = id
  link.rel = "stylesheet"
  link.href = "https://api.mapbox.com/mapbox-gl-js/v3.19.0/mapbox-gl.css"
  document.head.appendChild(link)
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
  const [noToken, setNoToken] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) {
      console.warn("Mapbox token not configured")
      setNoToken(true)
      return
    }

    // Load the CSS first
    loadMapboxCSS()

    let isMounted = true

    async function initMap() {
      const mapboxgl = (await import("mapbox-gl")).default

      if (!isMounted || !mapContainer.current) return

      mapboxgl.accessToken = token!

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        // Outdoors base with 3D terrain overlay for mountain topography
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [centerLng, centerLat],
        zoom,
        maxZoom: 15,
        minZoom: 8,
        pitch: 60,
        bearing: -20,
        attributionControl: true,
      })

      mapRef.current = map

      map.addControl(new mapboxgl.NavigationControl(), "top-right")
      map.addControl(new mapboxgl.FullscreenControl(), "top-right")

      map.on("load", () => {
        if (!isMounted || !map) return

        // Add 3D terrain from Mapbox DEM
        try {
          if (!map.getSource("mapbox-dem")) {
            map.addSource("mapbox-dem", {
              type: "raster-dem",
              url: "mapbox://mapbox.mapbox-terrain-dem-v1",
              tileSize: 512,
              maxzoom: 14,
            })
          }
          map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 })
        } catch (e) {
          console.warn("Terrain already configured by style:", e)
        }

        // Add sky layer for atmospheric effect
        try {
          if (!map.getLayer("sky")) {
            map.addLayer({
              id: "sky",
              type: "sky",
              paint: {
                "sky-type": "atmosphere",
                "sky-atmosphere-sun": [0.0, 0.0],
                "sky-atmosphere-sun-intensity": 15,
              },
            })
          }
        } catch (e) {
          console.warn("Sky layer already configured by style:", e)
        }

        // Add SPA boundary
        if (showSpaBoundary) {
          map.addSource("spa-boundary", {
            type: "geojson",
            data: SPA_BOUNDARY,
          })
          map.addLayer({
            id: "spa-fill",
            type: "fill",
            source: "spa-boundary",
            paint: {
              "fill-color": "#2D5016",
              "fill-opacity": 0.1,
            },
          })
          map.addLayer({
            id: "spa-outline",
            type: "line",
            source: "spa-boundary",
            paint: {
              "line-color": "#2D5016",
              "line-width": 2,
              "line-dasharray": [2, 2],
            },
          })
        }

        // Add SAC boundary
        if (showSacBoundary) {
          map.addSource("sac-boundary", {
            type: "geojson",
            data: SAC_BOUNDARY,
          })
          map.addLayer({
            id: "sac-fill",
            type: "fill",
            source: "sac-boundary",
            paint: {
              "fill-color": "#C4A35A",
              "fill-opacity": 0.08,
            },
          })
          map.addLayer({
            id: "sac-outline",
            type: "line",
            source: "sac-boundary",
            paint: {
              "line-color": "#C4A35A",
              "line-width": 2,
            },
          })
        }

        setMapLoaded(true)
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
      <div ref={mapContainer} className="w-full h-full rounded-lg" />

      {/* Legend */}
      {mapLoaded && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-md text-xs z-10">
          <p className="font-semibold text-stone-800 mb-2">Legend</p>
          {showSpaBoundary && (
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-3 rounded-sm border-2 border-dashed" style={{ borderColor: "#2D5016", backgroundColor: "rgba(45,80,22,0.1)" }} />
              <span className="text-stone-600">SPA Boundary</span>
            </div>
          )}
          {showSacBoundary && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 rounded-sm border-2" style={{ borderColor: "#C4A35A", backgroundColor: "rgba(196,163,90,0.08)" }} />
              <span className="text-stone-600">SAC Boundary</span>
            </div>
          )}
        </div>
      )}

      {/* No token fallback */}
      {noToken && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-100 rounded-lg">
          <div className="text-center px-6">
            <svg className="w-12 h-12 mx-auto mb-4 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-stone-500 text-sm font-medium">3D Interactive Map</p>
            <p className="text-stone-400 text-xs mt-1">Set NEXT_PUBLIC_MAPBOX_TOKEN to enable</p>
          </div>
        </div>
      )}
    </div>
  )
}
