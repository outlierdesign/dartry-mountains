"use client"

import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface Milestone {
  date: string
  title: string
  description: string
  detail?: string
}

interface TimelineProps {
  heading: string
  description?: string
  milestones: Milestone[]
  background_color?: string
  spacing?: "compact" | "normal" | "spacious"
}

export default function Timeline({
  heading,
  description,
  milestones = [],
  background_color = "bg-cream",
  spacing = "normal",
}: TimelineProps) {
  const spacingClasses = {
    compact: "py-12 md:py-16",
    normal: "py-24 md:py-32",
    spacious: "py-32 md:py-48",
  }

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

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

        {milestones.length > 0 && (
          <>
            {/* Desktop: Horizontal Timeline */}
            <div className="hidden md:block overflow-x-auto pb-6">
              <div className="inline-flex gap-8 min-w-full">
                {milestones.map((milestone, idx) => (
                  <div key={idx} className="flex-shrink-0 w-72">
                    <div className="flex flex-col">
                      {/* Date Badge */}
                      <div className="mb-4">
                        <span className={cn(
                          "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                          "bg-moss-700 text-white"
                        )}>
                          {milestone.date}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="font-display text-xl font-semibold text-stone-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-stone-700 mb-3">
                        {milestone.description}
                      </p>

                      {/* Expandable Detail */}
                      {milestone.detail && (
                        <button
                          onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                          className={cn(
                            "text-sm font-medium text-moss-600 hover:text-moss-700",
                            "transition-colors flex items-center gap-1"
                          )}
                        >
                          Read more
                          <ChevronDown
                            className={cn(
                              "w-3 h-3 transition-transform",
                              expandedIndex === idx && "rotate-180"
                            )}
                          />
                        </button>
                      )}

                      {expandedIndex === idx && milestone.detail && (
                        <div className="mt-3 pt-3 border-t border-stone-200">
                          <p className="text-sm text-stone-600">
                            {milestone.detail}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Vertical Timeline */}
            <div className="md:hidden space-y-8 relative pl-6">
              {/* Timeline Line */}
              <div className="absolute left-2 top-0 bottom-0 w-1 bg-stone-300" />

              {milestones.map((milestone, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-6 top-2 w-4 h-4 rounded-full bg-moss-700 border-4 border-cream" />

                  {/* Content */}
                  <div>
                    {/* Date Badge */}
                    <div className="mb-2">
                      <span className={cn(
                        "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                        "bg-moss-700 text-white"
                      )}>
                        {milestone.date}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-stone-900 mb-1">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-stone-700 mb-3">
                      {milestone.description}
                    </p>

                    {/* Expandable Detail */}
                    {milestone.detail && (
                      <button
                        onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                        className={cn(
                          "text-sm font-medium text-moss-600 hover:text-moss-700",
                          "transition-colors flex items-center gap-1"
                        )}
                      >
                        Read more
                        <ChevronDown
                          className={cn(
                            "w-3 h-3 transition-transform",
                            expandedIndex === idx && "rotate-180"
                          )}
                        />
                      </button>
                    )}

                    {expandedIndex === idx && milestone.detail && (
                      <div className="mt-3 pt-3 border-t border-stone-200">
                        <p className="text-sm text-stone-600">
                          {milestone.detail}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {milestones.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-500">No milestones to display</p>
          </div>
        )}
      </div>
    </section>
  )
}
