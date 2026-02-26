import { cn } from "@/lib/utils";

interface QuoteBlockProps {
  quote: string;
  attribution: string;
  role?: string;
  show_texture?: boolean;
  background_color?: "dark" | "light";
  spacing?: "compact" | "normal" | "generous";
}

export default function QuoteBlock({
  quote,
  attribution,
  role,
  show_texture = false,
  background_color = "dark",
  spacing = "normal",
}: QuoteBlockProps) {
  const spacingClasses = {
    compact: "py-16 md:py-20",
    normal: "py-20 md:py-28",
    generous: "py-28 md:py-36",
  };

  const isDark = background_color === "dark";
  const bgClass = isDark ? "bg-moss-800" : "bg-cream-dark";
  const textClass = isDark ? "text-white" : "text-moss-800";
  const attributionClass = isDark ? "text-cream" : "text-moss-700";

  return (
    <section
      className={cn(
        "w-full",
        spacingClasses[spacing as keyof typeof spacingClasses],
        bgClass,
        show_texture && "relative overflow-hidden"
      )}
    >
      {/* Subtle texture background */}
      {show_texture && (
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Opening quote mark */}
        <div className="text-gold-400 text-6xl opacity-50 leading-none mb-6">
          "
        </div>

        {/* Quote text */}
        <blockquote
          className={cn(
            "font-display text-2xl md:text-4xl italic text-center leading-relaxed mb-8",
            textClass
          )}
        >
          {quote}
        </blockquote>

        {/* Attribution */}
        <div className="text-center">
          <p className={cn("text-sm font-medium", attributionClass)}>
            — {attribution}
          </p>
          {role && (
            <p className="text-sm text-muted-foreground mt-2">{role}</p>
          )}
        </div>
      </div>
    </section>
  );
}
