import Link from "next/link"

interface CTABlockProps {
  heading: string
  subheading?: string
  cta_label: string
  cta_link: string
  cta_secondary_label?: string
  cta_secondary_link?: string
  background?: "dark" | "gold"
}

export default function CTABlock({
  heading,
  subheading,
  cta_label,
  cta_link,
  cta_secondary_label,
  cta_secondary_link,
  background = "dark",
}: CTABlockProps) {
  const isGold = background === "gold"

  return (
    <section className={isGold ? "bg-gold-500 section-padding" : "section-dark section-padding"}>
      <div className="container-narrow text-center">
        <h2 className={`heading-section mb-4 ${isGold ? 'text-forest-dark' : 'text-white'}`}>
          {heading}
        </h2>
        {subheading && (
          <p className={`text-base mb-10 max-w-xl mx-auto ${isGold ? 'text-forest-dark/70' : 'text-white/60'}`}>
            {subheading}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={cta_link}
            className={isGold
              ? "btn-primary !bg-forest-dark !text-white hover:!bg-forest-deep"
              : "btn-primary"
            }
          >
            {cta_label}
          </Link>
          {cta_secondary_label && cta_secondary_link && (
            <Link
              href={cta_secondary_link}
              className={isGold
                ? "btn-outline !border-forest-dark/30 !text-forest-dark hover:!bg-forest-dark/10"
                : "btn-outline"
              }
            >
              {cta_secondary_label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
