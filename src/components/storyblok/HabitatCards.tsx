import Image from "next/image"

interface ImageObject {
  filename?: string
  alt?: string
}

interface Habitat {
  title: string
  scientific_name?: string
  description: string
  image?: ImageObject
  color?: string
}

interface HabitatCardsProps {
  heading?: string
  eyebrow?: string
  subtitle?: string
  habitats?: Habitat[]
  external_link_url?: string
  external_link_label?: string
}

const defaultHabitats: Habitat[] = [
  {
    title: "Species-Rich Grassland",
    description: "The limestone slopes support grasslands of exceptional floristic diversity. Rare flowering plants have been recorded here, including Yellow saxifrage and Mossy saxifrage — some with their only known Irish stations at this site.",
    image: { filename: "/images/habitats/species-rich-grassland.jpg", alt: "Species-rich grassland in the Dartry Mountains" },
    color: "bg-moss-500",
  },
  {
    title: "Wet Grassland",
    description: "Rough wet grassland at lower elevations provides vital habitat for wildlife including skylark, meadow pipit, frogs, and a diverse range of invertebrates that form the base of the food chain.",
    image: { filename: "/images/habitats/wet-grassland.jpg", alt: "Wet grassland habitat in the Dartry Mountains" },
    color: "bg-sky-500",
  },
  {
    title: "Peatland",
    description: "Blanket bog and heath ecosystems cap the higher elevations. These carbon-rich habitats support specialised plant communities and play a crucial role in water regulation and carbon storage.",
    image: { filename: "/images/habitats/peatland.jpg", alt: "Peatland habitat in the Dartry Mountains" },
    color: "bg-earth-500",
  },
]

export default function HabitatCards({
  heading = "Habitats",
  eyebrow = "DIVERSE ECOSYSTEMS",
  subtitle = "From species-rich grasslands to blanket bog, the Dartry Mountains support a remarkable variety of habitats and rare plant communities.",
  habitats,
  external_link_url = "https://www.wildflowersofireland.net",
  external_link_label = "Explore Wildflowers of Ireland",
}: HabitatCardsProps) {
  const items = habitats && habitats.length > 0 ? habitats : defaultHabitats

  return (
    <section id="habitats" className="section-cream section-padding">
      <div className="container-content">
        <div className="text-center mb-14">
          {eyebrow && <p className="label-eyebrow mb-4">{eyebrow}</p>}
          <h2 className="heading-section">{heading}</h2>
          {subtitle && (
            <p className="mt-4 text-sm text-stone-500 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((habitat, idx) => (
            <div key={idx} className="card-rounded bg-white shadow-md overflow-hidden group">
              <div className={`relative h-48 ${habitat.color || 'bg-moss-500'} flex items-center justify-center`}>
                {habitat.image?.filename ? (
                  <Image
                    src={habitat.image.filename}
                    alt={habitat.image.alt || habitat.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display font-light text-xl mb-1">{habitat.title}</h3>
                {habitat.scientific_name && (
                  <p className="text-xs text-stone-400 italic mb-3">({habitat.scientific_name})</p>
                )}
                <p className="text-sm text-stone-500 leading-relaxed">{habitat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {external_link_url && (
          <div className="text-center mt-10">
            <a
              href={external_link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-moss-600 hover:text-moss-700 font-medium transition-colors"
            >
              {external_link_label} <span className="ml-1">↗</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
