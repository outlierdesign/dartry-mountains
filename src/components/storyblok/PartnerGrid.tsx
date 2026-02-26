import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

interface Partner {
  name: string
  logo?: string
  description: string
  website?: string
  detail?: string
}

interface PartnerGridProps {
  heading: string
  description?: string
  partners: Partner[]
  background_color?: string
  spacing?: "compact" | "normal" | "spacious"
}

export default function PartnerGrid({
  heading,
  description,
  partners = [],
  background_color = "bg-cream",
  spacing = "normal",
}: PartnerGridProps) {
  const spacingClasses = {
    compact: "py-12 md:py-16",
    normal: "py-24 md:py-32",
    spacious: "py-32 md:py-48",
  }

  return (
    <section className={cn("w-full", background_color, spacingClasses[spacing])}>
      <div className="container max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-stone-900 mb-6">
            {heading}
          </h2>
          {description && (
            <p className="text-lg text-stone-700">
              {description}
            </p>
          )}
        </div>

        {/* Partner Grid */}
        {partners.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className={cn(
                  "bg-white rounded-lg p-6 border border-stone-200",
                  "hover:shadow-lg hover:border-gold-400/30 transition-all duration-300"
                )}
              >
                {/* Logo Placeholder */}
                {partner.logo ? (
                  <div className="mb-4">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-stone-100 rounded-lg mb-4" />
                )}

                {/* Partner Info */}
                <h3 className="font-semibold text-lg text-stone-900 mb-2">
                  {partner.name}
                </h3>
                <p className="text-sm text-stone-600 mb-4">
                  {partner.description}
                </p>

                {/* Detail (if provided) */}
                {partner.detail && (
                  <p className="text-xs text-stone-500 mb-4 italic">
                    {partner.detail}
                  </p>
                )}

                {/* Website Link */}
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "text-sm font-medium text-moss-600 hover:text-moss-700",
                      "flex items-center gap-1 transition-colors"
                    )}
                  >
                    Visit website
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {partners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-500">No partners to display</p>
          </div>
        )}
      </div>
    </section>
  )
}
