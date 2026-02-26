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

export default function InteractiveMap({
  centerLat,
  centerLng,
  zoom,
  showSpaBoundary,
  showSacBoundary,
}: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
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
      pitch: 60,
      bearing: -20,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

    map.current.on("load", () => {
      if (!map.current) return;

      // Add 3D terrain
      map.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

      // Add sky layer for atmosphere
      map.current.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 0.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });

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

      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
    };
  }, [centerLat, centerLng, zoom, showSpaBoundary, showSacBoundary]);

  return (
    <div className="relative">
      <div
        ref={mapContainer}
        className="h-[500px] w-full rounded-lg"
        role="application"
        aria-label="Interactive map of the Dartry Mountains showing SPA and SAC protected area boundaries"
      />

      {/* Boundary Legend */}
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
          </div>
        </div>
      )}
    </div>
  );
}
