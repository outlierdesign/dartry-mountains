"use client";

import { cn } from "@/lib/utils";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

interface StatsHighlightProps {
  heading?: string;
  stats: Stat[];
  background_color?: string;
  spacing?: "compact" | "normal" | "generous";
}

export default function StatsHighlight({
  heading,
  stats,
  background_color = "transparent",
  spacing = "normal",
}: StatsHighlightProps) {
  const spacingClasses = {
    compact: "py-12 md:py-16",
    normal: "py-16 md:py-24",
    generous: "py-24 md:py-32",
  };

  const bgClasses = {
    cream: "bg-cream",
    "cream-light": "bg-cream-light",
    stone: "bg-stone-50",
    transparent: "bg-transparent",
  };

  // Parse numeric value from string (e.g., "500+" -> 500)
  const parseNumericValue = (value: string): number => {
    const match = value.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  return (
    <section
      className={cn(
        "w-full",
        spacingClasses[spacing as keyof typeof spacingClasses],
        bgClasses[background_color as keyof typeof bgClasses] || bgClasses.transparent
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Optional Heading */}
        {heading && (
          <div className="text-center mb-16 md:mb-20">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-moss-900">
              {heading}
            </h2>
          </div>
        )}

        {/* Stats Grid */}
        <div className="flex flex-col sm:flex-row justify-center gap-12 md:gap-16 flex-wrap">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              {/* Value with Animated Counter */}
              <div className="flex items-baseline justify-center gap-1">
                <div className="font-display text-4xl md:text-5xl font-bold text-moss-700">
                  <AnimatedCounter
                    end={parseNumericValue(stat.value)}
                    duration={2000}
                  />
                </div>
                {stat.suffix && (
                  <span className="font-display text-4xl md:text-5xl font-bold text-moss-700">
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wider font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
