export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dartry Mountains Conservation",
    url: "https://dartrymountains.ie",
    logo: "https://dartrymountains.ie/images/landscapes/benbulben.jpg",
    description:
      "Preserving and promoting responsible tourism in the Dartry Mountains, a Special Protection Area and Special Area of Conservation in Counties Sligo and Leitrim, Ireland.",
    sameAs: [
      "https://www.npws.ie",
      "https://birdwatchireland.ie",
    ],
    areaServed: {
      "@type": "Place",
      name: "Dartry Mountains, Counties Sligo and Leitrim, Ireland",
      geo: {
        "@type": "GeoCoordinates",
        latitude: 54.35,
        longitude: -8.35,
      },
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dartry Mountains",
    url: "https://dartrymountains.ie",
    description:
      "Conservation and responsible tourism information for the Dartry Mountains SPA and SAC.",
    publisher: {
      "@type": "Organization",
      name: "Dartry Mountains Conservation",
    },
  };

  const touristDestinationSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Dartry Mountains",
    description:
      "An iconic mountain range in northwest Ireland, designated as both a Special Protection Area (SPA) under the EU Birds Directive and a Special Area of Conservation (SAC) under the EU Habitats Directive. Home to protected chough and peregrine falcon populations, rare species-rich grasslands, peatlands, and a centuries-old hill-farming tradition.",
    url: "https://dartrymountains.ie",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 54.35,
      longitude: -8.35,
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Counties Sligo and Leitrim, Ireland",
    },
    touristType: [
      "Ecotourist",
      "Nature enthusiast",
      "Birdwatcher",
      "Hill walker",
    ],
    includesAttraction: [
      {
        "@type": "NaturalFeature",
        name: "Benbulben",
        description: "Iconic flat-topped limestone mountain and part of the Dartry Mountains SAC.",
      },
      {
        "@type": "NaturalFeature",
        name: "Species-Rich Grassland",
        description: "Limestone slopes supporting grasslands of exceptional floristic diversity with rare Arctic-Alpine plant species.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(touristDestinationSchema),
        }}
      />
    </>
  );
}
