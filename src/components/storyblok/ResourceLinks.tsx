import { FileText, Shield, Flower2, Map } from "lucide-react"

interface ResourceItem {
  title: string
  description: string
  url?: string
  icon?: string
}

interface ResourceLinksProps {
  heading?: string
  resources?: ResourceItem[]
}

const defaultResources: ResourceItem[] = [
  {
    title: "Chough Survey Report",
    description: "Latest population survey and conservation status",
    icon: "file",
  },
  {
    title: "NPWS - National Parks & Wildlife",
    description: "Official site conservation information",
    url: "https://www.npws.ie",
    icon: "shield",
  },
  {
    title: "Cliff & Scree Information Sign",
    description: "Download the interpretive signage",
    icon: "map",
  },
  {
    title: "Grassland & Peatland Sign",
    description: "Luke's Bridge interpretive panel",
    icon: "flower",
  },
]

const iconMap: Record<string, React.ReactNode> = {
  file: <FileText className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  flower: <Flower2 className="w-5 h-5" />,
  map: <Map className="w-5 h-5" />,
}

function ResourceCard({ item }: { item: ResourceItem }) {
  const inner = (
    <>
      <div className="w-10 h-10 rounded-lg bg-moss-600 text-white flex items-center justify-center flex-shrink-0">
        {iconMap[item.icon || "file"] || <FileText className="w-5 h-5" />}
      </div>
      <div>
        <h3 className="text-sm font-body font-semibold text-moss-700 group-hover:text-moss-600 transition-colors">
          {item.title}
          {item.url && <span className="ml-1 text-[10px]">↗</span>}
        </h3>
        <p className="text-xs text-stone-400 mt-1">{item.description}</p>
      </div>
    </>
  )

  const className = "flex items-start gap-4 p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow group cursor-pointer"

  if (item.url) {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    )
  }

  return <div className={className}>{inner}</div>
}

export default function ResourceLinks({
  heading = "Useful Information & Links",
  resources,
}: ResourceLinksProps) {
  const items = resources && resources.length > 0 ? resources : defaultResources

  return (
    <section id="resources" className="section-cream section-padding">
      <div className="container-content max-w-3xl">
        <h2 className="heading-section text-center mb-12">{heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <ResourceCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
