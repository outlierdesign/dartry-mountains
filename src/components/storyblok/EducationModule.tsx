"use client";

import { cn } from "@/lib/utils";

interface EducationItem {
  title: string;
  scientific_name: string;
  description: string;
  image?: {
    filename: string;
    alt: string;
  };
  type: "species" | "habitat" | "geology" | "heritage" | "flora";
}

interface EducationModuleProps {
  heading: string;
  description: string;
  items: EducationItem[];
  background_color?: string;
  spacing?: "compact" | "normal" | "generous";
}

const typeColors = {
  species: "bg-gold-50 text-gold-700",
  habitat: "bg-moss-50 text-moss-700",
  geology: "bg-stone-50 text-stone-700",
  heritage: "bg-earth-50 text-earth-700",
  flora: "bg-sky-50 text-sky-600",
};

const typeLabels = {
  species: "Species",
  habitat: "Habitat",
  geology: "Geology",
  heritage: "Heritage",
  flora: "Flora",
};

export default function EducationModule({
  heading,
  description,
  items,
  background_color = "cream",
  spacing = "normal",
}: EducationModuleProps) {
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
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-moss-900 mb-4">
            {heading}
          </h2>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-stone-100 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image.filename}
                    alt={item.image.alt || item.title}
                    className="w-full h-full object-cover"
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
              <div className="p-6">
                {/* Title */}
                <h3 className="font-display font-semibold text-lg text-moss-900 mb-1">
                  {item.title}
                </h3>

                {/* Scientific Name */}
                {item.scientific_name && (
                  <p className="italic text-sm text-stone-500 mb-4">
                    {item.scientific_name}
                  </p>
                )}

                {/* Type Badge */}
                <div className="mb-4">
                  <span
                    className={cn(
                      "inline-block text-xs font-medium px-2.5 py-1 rounded-full",
                      typeColors[item.type]
                    )}
                  >
                    {typeLabels[item.type]}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
