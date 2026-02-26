import { cn } from "@/lib/utils";
import Link from "next/link";

interface NewsCard {
  title: string;
  image?: {
    filename: string;
    alt: string;
  };
  tag?: string;
  date?: string;
  excerpt: string;
  link?: {
    cached_url?: string;
    url?: string;
  };
}

interface NewsCardsProps {
  heading: string;
  cards: NewsCard[];
  background_color?: string;
  spacing?: "compact" | "normal" | "generous";
}

export default function NewsCards({
  heading,
  cards,
  background_color = "cream",
  spacing = "normal",
}: NewsCardsProps) {
  const spacingClasses = {
    compact: "py-16 md:py-20",
    normal: "py-24 md:py-32",
    generous: "py-32 md:py-40",
  };

  const bgClasses = {
    cream: "bg-cream",
    "cream-light": "bg-cream-light",
    stone: "bg-stone-50",
    transparent: "bg-transparent",
  };

  return (
    <section
      className={cn(
        "w-full",
        spacingClasses[spacing as keyof typeof spacingClasses],
        bgClasses[background_color as keyof typeof bgClasses] || bgClasses.cream
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-moss-900">
            {heading}
          </h2>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const cardLink = card.link?.cached_url || card.link?.url || "#";
            return (
              <div
                key={index}
                className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group flex flex-col"
              >
                {/* Image Area */}
                <div className="h-48 bg-stone-100 overflow-hidden">
                  {card.image ? (
                    <img
                      src={card.image.filename}
                      alt={card.image.alt || card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400">
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Tag */}
                  {card.tag && (
                    <div>
                      <span className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-moss-50 text-moss-700">
                        {card.tag}
                      </span>
                    </div>
                  )}

                  {/* Date */}
                  {card.date && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {card.date}
                    </p>
                  )}

                  {/* Title */}
                  <h3 className="font-display text-lg font-semibold mt-2 text-moss-900 group-hover:text-moss-700 transition-colors duration-300">
                    {card.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-grow">
                    {card.excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={cardLink}
                    className="text-sm font-medium text-moss-600 hover:text-moss-700 mt-4 inline-block transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
