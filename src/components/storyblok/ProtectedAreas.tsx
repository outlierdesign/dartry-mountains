import Image from "next/image"

interface ImageObject {
  filename?: string
  alt?: string
}

interface ProtectedAreasProps {
  heading?: string
  body?: string
  image?: ImageObject
}

export default function ProtectedAreas({
  heading = "Protected Areas",
  body,
  image,
}: ProtectedAreasProps) {
  const defaultBody = `This area is part of the Sligo/Leitrim Uplands Special Protection Area (SPA) and Special Area of Conservation (SAC), recognised on a European scale for the protection of the red-billed chough and the peregrine falcon.

It straddles the border between counties Sligo and Leitrim, encompassing areas around Benbulben, Glencar Valley, the Gleniff Horseshoe, Luke's Bridge, the Glenade Valley, and Arroo.

The protected area is characterised by dramatic limestone cliffs and their associated steep scree and grassland slopes, but also contains other habitats such as peatland, scrub, woodland, and streams. These rise up to 450m above the surrounding countryside.`

  const text = body || defaultBody

  return (
    <section id="protected-areas" className="section-deep section-padding">
      <div className="container-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="heading-section text-white mb-8">{heading}</h2>
            <div className="prose-dartry">
              {text.split('\n\n').map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-moss-600/30 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-gold-400" />
              <span className="text-xs text-white/70 font-body font-medium">EU Birds Directive & Habitats Directive Protected Area</span>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-forest-dark/50">
            {image?.filename ? (
              <Image
                src={image.filename}
                alt={image.alt || "Protected area map"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white/30">
                <svg className="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-sm italic">Interactive Map</p>
                <p className="text-xs mt-1">Explore the SPA & SAC boundaries</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
