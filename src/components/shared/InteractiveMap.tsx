"use client"
import { useEffect, useRef, useState, useCallback } from "react"

interface LayerConfig {
  id: string
  label: string
  designation: string
  geoJsonUrl: string
  fillColor: string
  fillOpacity: number
  lineColor: string
  lineWidth: number
  visible: boolean
}

interface InteractiveMapProps {
  centerLat?: number
  centerLng?: number
  zoom?: number
}

const LAYER_CONFIGS: LayerConfig[] = [
  {
    id: "ben-bulben-sac",
    label: "Ben Bulben, Gleniff & Glenade Complex SAC",
    designation: "SAC",
    geoJsonUrl: "/geo/ben-bulben-sac.json",
    fillColor: "#3B82F6",
    fillOpacity: 0.35,
    lineColor: "#1D4ED8",
    lineWidth: 3,
    visible: true,
  },
  {
    id: "arroo-mountain-sac",
    label: "Arroo Mountain SAC",
    designation: "SAC",
    geoJsonUrl: "/geo/arroo-mountain-sac.json",
    fillColor: "#3B82F6",
    fillOpacity: 0.35,
    lineColor: "#1D4ED8",
    lineWidth: 3,
    visible: true,
  },
  {
    id: "sligo-leitrim-spa",
    label: "Sligo/Leitrim Uplands SPA",
    designation: "SPA",
    geoJsonUrl: "/geo/sligo-leitrim-spa.json",
    fillColor: "#FFFFFF",
    fillOpacity: 0.45,
    lineColor: "#FFFFFF",
    lineWidth: 3,
    visible: true,
  },
  {
    id: "dartry-uplands",
    label: "Dartry Uplands (150m)",
    designation: "Uplands",
    geoJsonUrl: "/geo/dartry-uplands.json",
    fillColor: "#84CC16",
    fillOpacity: 0.25,
    lineColor: "#65A30D",
    lineWidth: 2.5,
    visible: false,
  },
]

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
  centerLat = 54.37,
  centerLng = -8.35,
  zoom = 11,
}: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [noToken, setNoToken] = useState(false)
  const [layers, setLayers] = useState<LayerConfig[]>(LAYER_CONFIGS)
  const [legendOpen, setLegendOpen] = useState(true)

  const toggleLayer = useCallback(
    (layerId: string) => {
      const map = mapRef.current
      if (!map) return
      setLayers((prev) =>
        prev.map((l) => {
          if (l.id !== layerId) return l
          const next = !l.visible
          const vis = next ? "visible" : "none"
          try { map.setLayoutProperty(l.id + "-fill", "visibility", vis) } catch {}
          try { map.setLayoutProperty(l.id + "-outline", "visibility", vis) } catch {}
          return { ...l, visible: next }
        })
      )
    },
    []
  )

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) {
      setNoToken(true)
      return
    }
    loadMapboxCSS()
    let isMounted = true

    async function initMap() {
      const mapboxgl = (await import("mapbox-gl")).default
      if (!isMounted || !mapContainer.current) return
      mapboxgl.accessToken = token!

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
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

      map.on("load", async () => {
        if (!isMounted || !map) return

        // 3D terrain
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
          console.warn("Terrain error:", e)
        }

        // Sky atmosphere
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
          console.warn("Sky error:", e)
        }

        // Create crosshatch pattern for SPA layer
        const patternSize = 16
        const canvas = document.createElement("canvas")
        canvas.width = patternSize
        canvas.height = patternSize
        const ctx = canvas.getContext("2d")!
        ctx.clearRect(0, 0, patternSize, patternSize)
        // White diagonal lines (top-left to bottom-right)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(patternSize, patternSize)
        ctx.moveTo(-patternSize, 0)
        ctx.lineTo(patternSize, patternSize * 2)
        ctx.moveTo(0, -patternSize)
        ctx.lineTo(patternSize * 2, patternSize)
        ctx.stroke()

        const imgData = ctx.getImageData(0, 0, patternSize, patternSize)
        map.addImage("spa-crosshatch", imgData, { sdf: false })

        // Load all GeoJSON layers
        for (const layer of LAYER_CONFIGS) {
          try {
            const response = await fetch(layer.geoJsonUrl)
            const data = await response.json()

            map.addSource(layer.id, { type: "geojson", data })

            // Fill layer — use crosshatch pattern for SPA, solid fill for others
            if (layer.designation === "SPA") {
              map.addLayer({
                id: layer.id + "-fill",
                type: "fill",
                source: layer.id,
                paint: {
                  "fill-pattern": "spa-crosshatch",
                  "fill-opacity": layer.fillOpacity,
                },
                layout: {
                  visibility: layer.visible ? "visible" : "none",
                },
              })
            } else {
              map.addLayer({
                id: layer.id + "-fill",
                type: "fill",
                source: layer.id,
                paint: {
                  "fill-color": layer.fillColor,
                  "fill-opacity": layer.fillOpacity,
                },
                layout: {
                  visibility: layer.visible ? "visible" : "none",
                },
              })
            }

            // Outline layer — explicitly solid lines for visibility
            map.addLayer({
              id: layer.id + "-outline",
              type: "line",
              source: layer.id,
              paint: {
                "line-color": layer.lineColor,
                "line-width": layer.lineWidth,
                "line-opacity": 1,
              },
              layout: {
                visibility: layer.visible ? "visible" : "none",
                "line-cap": "round",
                "line-join": "round",
              },
            })

            // Hover cursor
            map.on("mouseenter", layer.id + "-fill", () => {
              map.getCanvas().style.cursor = "pointer"
            })
            map.on("mouseleave", layer.id + "-fill", () => {
              map.getCanvas().style.cursor = ""
            })

            // Click popup with site info
            map.on("click", layer.id + "-fill", (e: any) => {
              const props = e.features?.[0]?.properties
              if (!props) return

              const name = props.SITE_NAME || props.Range || layer.label
              const designation = props.designation || layer.designation
              const ha = props.HA ? parseFloat(props.HA).toFixed(0) + " ha" : ""
              const url = props.URL || ""

              let badge = ""
              if (designation === "SAC") {
                badge = "background:#DBEAFE;color:#1E40AF;"
              } else if (designation === "SPA") {
                badge = "background:#F3E8FF;color:#7E22CE;"
              } else {
                badge = "background:#ECFCCB;color:#4D7C0F;"
              }

              let html = '<div style="font-family:system-ui;max-width:260px;">'
              html +=
                '<p style="font-weight:700;margin:0 0 4px;font-size:14px;color:#1a1a1a;">' +
                name +
                "</p>"
              html += '<p style="margin:0 0 4px;font-size:12px;color:#666;">'
              html +=
                '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:11px;font-weight:600;' +
                badge +
                '">'
              html += designation + "</span>"
              if (ha) html += " &middot; " + ha
              html += "</p>"
              if (url) {
                html +=
                  '<a href="' +
                  url +
                  '" target="_blank" rel="noopener" style="font-size:11px;color:#2563EB;">View on NPWS &rarr;</a>'
              }
              html += "</div>"

              new mapboxgl.Popup({ offset: 10 }).setLngLat(e.lngLat).setHTML(html).addTo(map)
            })
          } catch (err) {
            console.warn("Failed to load layer " + layer.id + ":", err)
          }
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
  }, [centerLat, centerLng, zoom])

  const designationGroups = [
    { key: "SAC", title: "Special Areas of Conservation" },
    { key: "SPA", title: "Special Protection Areas" },
    { key: "Uplands", title: "Upland Boundaries" },
  ]

  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />

      {/* Legend panel with layer toggles */}
      {mapLoaded && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg text-xs z-10 max-w-[280px]">
          <button
            onClick={() => setLegendOpen(!legendOpen)}
            className="flex items-center justify-between w-full px-3 py-2.5 hover:bg-stone-50 rounded-t-lg transition-colors"
          >
            <span className="font-semibold text-stone-800 text-[13px]">Protected Areas</span>
            <svg
              className={`w-4 h-4 text-stone-400 transition-transform ${
                legendOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {legendOpen && (
            <div className="px-3 pb-3 space-y-1 border-t border-stone-100">
              {designationGroups.map((group) => {
                const groupLayers = layers.filter((l) => l.designation === group.key)
                if (groupLayers.length === 0) return null
                return (
                  <div key={group.key}>
                    <p className="text-[10px] font-medium text-stone-400 uppercase tracking-wider pt-2 pb-0.5">
                      {group.title}
                    </p>
                    {groupLayers.map((layer) => (
                      <button
                        key={layer.id}
                        onClick={() => toggleLayer(layer.id)}
                        className="flex items-center gap-2 w-full hover:bg-stone-50 rounded px-1.5 py-1 transition-colors text-left"
                      >
                        <div
                          className={`w-4 h-3 rounded-sm flex-shrink-0 transition-opacity ${
                            layer.visible ? "" : "opacity-25"
                          }`}
                          style={{
                            borderWidth: 2,
                            borderStyle: "solid",
                            borderColor: layer.lineColor,
                            backgroundColor: layer.visible
                              ? layer.designation === "SPA"
                                ? "#e8e8e8"
                                : layer.fillColor + "26"
                              : "transparent",
                            backgroundImage:
                              layer.designation === "SPA" && layer.visible
                                ? "repeating-linear-gradient(45deg, transparent, transparent 2px, white 2px, white 4px)"
                                : "none",
                          }}
                        />
                        <span
                          className={`leading-tight transition-opacity ${
                            layer.visible
                              ? "text-stone-600"
                              : "text-stone-400 line-through"
                          }`}
                        >
                          {layer.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* No token fallback */}
      {noToken && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-100 rounded-lg">
          <div className="text-center px-6">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-stone-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <p className="text-stone-500 text-sm font-medium">3D Interactive Map</p>
            <p className="text-stone-400 text-xs mt-1">
              Set NEXT_PUBLIC_MAPBOX_TOKEN to enable
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
