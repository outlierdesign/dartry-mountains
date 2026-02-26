"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface InteractiveMapProps {
  centerLat: number;
  centerLng: number;
  zoom: number;
  showSpaBoundary: boolean;
  showSacBoundary: boolean;
}

// Approximate SPA boundary polygon (simplified for demo)
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
};

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
};

// Environmental markers
const MARKERS = [
  { lng: -8.35, lat: 54.37, title: "Ben Bulben", type: "geology", description: "Iconic table-top mountain, 526m. Carboniferous limestone plateau." },
  { lng: -8.38, lat: 54.40, title: "Kings Mountain", type: "geology", description: "Part of the Dartry limestone formation." },
  { lng: -8.33, lat: 54.39, title: "Chough Nesting Site", type: "fauna", description: "Red-billed Chough (Pyrrhocorax pyrrhocorax) breeding area." },
  { lng: -8.36, lat: 54.36, title: "Peregrine Falcon Territory", type: "fauna", description: "Falco peregrinus nesting cliffs." },
  { lng: -8.40, lat: 54.37, title: "Alpine Flora Zone", type: "flora", description: "St. Patrick's Cabbage (Saxifraga spathularis) and arctic-alpine species." },
  { lng: -8.34, lat: 54.42, title: "Gleniff Horseshoe", type: "heritage", description: "Glacial valley with archaeological significance." },
];

const LAYER_COLORS: Record<string, string> = {
  flora: "#4A7C23",
  fauna: "#C4A35A",
  heritage: "#8B6F4A",
  geology: "#8B8B7A",
};

export default function InteractiveMap({
  centerLat,
  centerLng,
  zoom,
  showSpaBoundary,
  showSacBoundary,
}: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [activeLayer, setActiveLayer] = useState<string>("all");
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.warn("Mapbox token not set. Map will not render.");
      return;
    }

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [centerLng, centerLat],
      zoom,
      maxZoom: 15,
      minZoom: 8,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

    map.current.on("load", () => {
      if (!map.current) return;

      // Add SPA boundary
      if (showSpaBoundary) {
        map.current.addSource("spa-boundary", {
          type: "geojson",
          data: SPA_BOUNDARY,
        });
        map.current.addLayer({
          id: "spa-boundary-fill",
          type: "fill",
          source: "spa-boundary",
          paint: {
            "fill-color": "#2D5016",
            "fill-opacity": 0.1,
          },
        });
        map.current.addLayer({
          id: "spa-boundary-line",
          type: "line",
          source: "spa-boundary",
          paint: {
            "line-color": "#2D5016",
            "line-width": 2,
            "line-dasharray": [2, 2],
          },
        });
      }

      // Add SAC boundary
      if (showSacBoundary) {
        map.current.addSource("sac-boundary", {
          type: "geojson",
          data: SAC_BOUNDARY,
        });
        map.current.addLayer({
          id: "sac-boundary-fill",
          type: "fill",
          source: "sac-boundary",
          paint: {
            "fill-color": "#C4A35A",
            "fill-opacity": 0.08,
          },
        });
        map.current.addLayer({
          id: "sac-boundary-line",
          type: "line",
          source: "sac-boundary",
          paint: {
            "line-color": "#C4A35A",
            "line-width": 2,
          },
        });
      }

      // Add markers
      MARKERS.forEach((marker) => {
        const el = document.createElement("div");
        el.className = "map-marker";
        el.style.width = "14px";
        el.style.height = "14px";
        el.style.borderRadius = "50%";
        el.style.backgroundColor = LAYER_COLORS[marker.type] || "#2D5016";
        el.style.border = "2px solid white";
        el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
        el.style.cursor = "pointer";
        el.dataset.layerType = marker.type;

        new mapboxgl.Marker(el)
          .setLngLat([marker.lng, marker.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 15, maxWidth: "280px" }).setHTML(`
              <div style="font-family: 'Source Sans Pro', sans-serif;">
                <h4 style="font-family: 'Playfair Display', serif; margin: 0 0 4px; font-size: 14px; color: #2c2c2c;">${marker.title}</h4>
                <span style="display: inline-block; padding: 1px 8px; font-size: 11px; border-radius: 12px; background: ${LAYER_COLORS[marker.type]}20; color: ${LAYER_COLORS[marker.type]}; margin-bottom: 6px; text-transform: capitalize;">${marker.type}</span>
                <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #5a5a5a;">${marker.description}</p>
              </div>
            `)
          )
          .addTo(map.current!);
      });

      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
    };
  }, [centerLat, centerLng, zoom, showSpaBoundary, showSacBoundary]);

  // Layer filtering
  useEffect(() => {
    if (!mapLoaded) return;
    const markers = document.querySelectorAll(".map-marker");
    markers.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const type = htmlEl.dataset.layerType;
      htmlEl.style.display =
        activeLayer === "all" || type === activeLayer ? "block" : "none";
    });
  }, [activeLayer, mapLoaded]);

  return (
    <div className="relative">
      <div
        ref={mapContainer}
        className="h-[500px] w-full rounded-lg"
        role="application"
        aria-label="Interactive map of the Dartry Mountains showing protected area boundaries and points of interest"
      />

      {/* Layer toggle controls */}
      {mapLoaded && (
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 rounded-lg bg-white/95 p-2 shadow-lg backdrop-blur-sm">
          {["all", "flora", "fauna", "heritage", "geology"].map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                activeLayer === layer
                  ? "bg-moss-700 text-white"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
              aria-pressed={activeLayer === layer}
            >
              {layer === "all" ? "All Layers" : layer}
            </button>
          ))}
        </div>
      )}

      {/* Legend */}
      {mapLoaded && (
        <div className="absolute right-4 top-20 rounded-lg bg-white/95 p-3 shadow-lg backdrop-blur-sm">
          <p className="mb-2 text-xs font-semibold text-stone-700">Legend</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-block h-0.5 w-4 border-t-2 border-dashed border-moss-700" />
              <span className="text-xs text-stone-600">SPA Boundary</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-0.5 w-4 border-t-2 border-gold-400" />
              <span className="text-xs text-stone-600">SAC Boundary</span>
            </div>
            {Object.entries(LAYER_COLORS).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs capitalize text-stone-600">{type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
