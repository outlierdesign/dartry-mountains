import Image from "next/image"

interface ImageObject {
  filename?: string
  alt?: string
}

interface FarmingSectionProps {
  heading?: string
  body?: string
  image?: ImageObject
}

export default function FarmingSection({
  heading = "Hill Farming & Conservation",
  body,
  image,
}: FarmingSectionProps) {
  const defaultBody = `Sheep grazing in this area is vital to maintain the habitats that sensitive species call home. For generations, the farmers here have protected unique grasslands with rare plants.

Grazing maintains short grassland and allows protected birds like chough to feed easily near their nest sites. The short swards created by grazing sheep provide the ideal conditions for chough to probe the soil for insects.

This relationship between traditional farming practices and conservation is essential for the future of this remarkable landscape.`

  const text = body || defaultBody || ''

  return (
    <section id="farming" className="section-dark section-padding">
      <div className="container-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="heading-section text-white mb-8">{heading}</h2>
            <div className="prose-dartry">
              {text.split('\n\n').map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            {image?.filename ? (
              <Image
                src={image.filename}
                alt={image.alt || "Hill farming in the Dartry Mountains"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-earth-700 flex items-center justify-center">
                <p className="text-white/30 text-sm italic">Image: Hill farming in the Dartry Mountains</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
