interface QuoteBlockProps {
  quote: string
  attribution?: string
  role?: string
  background?: "dark" | "light"
}

export default function QuoteBlock({
  quote,
  attribution,
  role,
  background = "dark",
}: QuoteBlockProps) {
  const isDark = background === "dark"

  return (
    <section className={isDark ? "section-deep section-padding" : "section-muted section-padding"}>
      <div className="container-narrow text-center">
        <div className="divider-gold mx-auto mb-8" />
        <blockquote className={`quote-accent ${isDark ? 'text-white' : 'text-foreground'}`}>
          &ldquo;{quote}&rdquo;
        </blockquote>
        {attribution && (
          <div className="mt-8">
            <p className={`text-sm font-body font-medium ${isDark ? 'text-white/80' : 'text-foreground'}`}>
              {attribution}
            </p>
            {role && (
              <p className={`text-xs font-body mt-1 ${isDark ? 'text-white/40' : 'text-stone-400'}`}>
                {role}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
