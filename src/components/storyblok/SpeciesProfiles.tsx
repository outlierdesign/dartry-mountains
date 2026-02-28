import Image from "next/image"

interface ImageObject {
  filename?: string
  alt?: string
}

interface Species {
  name: string
  irish_name?: string
  scientific_name: string
  description: string
  image?: ImageObject
  facts?: string[]
  profile_url?: string
}

interface SpeciesProfilesProps {
  heading?: string
  eyebrow?: string
  subtitle?: string
  species?: Species[]
}

const defaultSpecies: Species[] = [
  {
    name: "Red-Billed Chough",
    irish_name: "Cág cosdearg",
    scientific_name: "Pyrrhocorax pyrrhocorax",
    description: "The chough is a striking crow with a long, curved red bill and bright red legs. Irish chough make up about 60% of a distinct isolated Northwest European population, making this site of international importance.",
    facts: [
      "Known for distinctive call and aerial acrobatics",
      "Amber listed on Birds of Conservation Concern",
      "Inland population here is quite unique",
    ],
    profile_url: "https://birdwatchireland.ie/birds/chough/",
  },
  {
    name: "Peregrine Falcon",
    irish_name: "Fabhcún gorm",
    scientific_name: "Falco peregrinus",
    description: "Famous as the fastest animal on Earth, reaching speeds of 389 km/h in a hunting dive. A powerful, compact falcon with long pointed wings, dark head, and distinctive black 'moustache' stripe.",
    facts: [
      "Recovered strongly after 20th century declines",
      "Nests on cliff ledges and rocky crags",
      "Highly territorial breeding pairs",
    ],
    profile_url: "https://birdwatchireland.ie/birds/peregrine/",
  },
]

export default function SpeciesProfiles({
  heading = "Species of Conservation Interest",
  eyebrow = "PROTECTED WILDLIFE",
  subtitle = "This area is a Special Protection Area under the EU Birds Directive, of special conservation interest for the following species.",
  species,
}: SpeciesProfilesProps) {
  const items = species && species.length > 0 ? species : defaultSpecies

  return (
    <section id="species" className="section-light section-padding">
      <div className="container-content">
        <div className="text-center mb-14">
          {eyebrow && <p className="label-eyebrow mb-4">{eyebrow}</p>}
          <h2 className="heading-section">{heading}</h2>
          {subtitle && <p className="mt-4 text-sm text-stone-500 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {items.map((sp, idx) => (
            <div key={idx} className="card-rounded bg-white shadow-md overflow-hidden">
              <div className="relative h-56 bg-forest-dark flex items-center justify-center">
                {sp.image?.filename ? (
                  <Image
                    src={sp.image.filename}
                    alt={sp.image.alt || sp.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <p className="text-sm italic text-white/50 font-accent">{sp.scientific_name}</p>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display font-light text-2xl mb-1">{sp.name}</h3>
                <p className="text-xs text-stone-400 mb-1">
                  {sp.irish_name && <>{sp.irish_name} — </>}
                  <em>{sp.scientific_name}</em>
                </p>
                <p className="text-sm text-stone-500 leading-relaxed mt-3">{sp.description}</p>
                {sp.facts && sp.facts.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {sp.facts.map((fact, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone-500">
                        <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-moss-500 flex-shrink-0" />
                        {fact}
                      </li>
                    ))}
                  </ul>
                )}
                {sp.profile_url && (
                  <a
                    href={sp.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm text-moss-600 hover:text-moss-700 font-medium transition-colors"
                  >
                    Full species profile <span className="ml-1">→</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
