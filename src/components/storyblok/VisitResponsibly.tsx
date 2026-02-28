import { Home, PawPrint, Trash2 } from "lucide-react"

interface GuidelineItem {
  title: string
  description: string
  icon?: string
}

interface VisitResponsiblyProps {
  heading?: string
  subtitle?: string
  guidelines?: GuidelineItem[]
  external_link_url?: string
  external_link_label?: string
}

const defaultGuidelines: GuidelineItem[] = [
  {
    title: "Respect Private Land",
    description: "This landscape is working farmland. Please do not cross field boundaries.",
    icon: "home",
  },
  {
    title: "No Dogs",
    description: "Keep dogs away from this area. Please leave them at home or in your vehicle as they can disturb wildlife and livestock.",
    icon: "paw",
  },
  {
    title: "Leave No Trace",
    description: "Take all litter home and stay in public areas.",
    icon: "trash",
  },
]

const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="w-6 h-6" />,
  paw: <PawPrint className="w-6 h-6" />,
  trash: <Trash2 className="w-6 h-6" />,
}

export default function VisitResponsibly({
  heading = "Visit Responsibly",
  subtitle = "The habitats and wildlife found here are sensitive to disturbance and need careful farming management practices to continue. You can make a positive impact by following these guidelines.",
  guidelines,
  external_link_url = "https://www.leavenotraceireland.org/",
  external_link_label = "Learn More at Leave No Trace Ireland",
}: VisitResponsiblyProps) {
  const items = guidelines && guidelines.length > 0 ? guidelines : defaultGuidelines

  return (
    <section id="visit" className="section-muted section-padding">
      <div className="container-content">
        <div className="text-center mb-12">
          <h2 className="heading-section">{heading}</h2>
          {subtitle && (
            <p className="mt-4 text-sm text-stone-500 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {items.map((item, idx) => (
            <div key={idx} className="card-rounded bg-white shadow-md p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-moss-600 text-white flex items-center justify-center mx-auto mb-5">
                {iconMap[item.icon || "home"] || <Home className="w-6 h-6" />}
              </div>
              <h3 className="font-display font-light text-lg mb-3">{item.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {external_link_url && (
          <div className="text-center mt-10">
            <a
              href={external_link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              {external_link_label}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
