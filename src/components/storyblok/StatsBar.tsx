"use client"

import { useEffect, useRef, useState } from "react"

interface Stat {
  value: string
  label: string
  suffix?: string
}

interface StatsBarProps {
  stats: Stat[]
  background?: "dark" | "gold"
}

export default function StatsBar({ stats, background = "dark" }: StatsBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const isGold = background === "gold"

  return (
    <section
      ref={ref}
      className={isGold
        ? "bg-gold-500 py-16 md:py-20"
        : "bg-forest-deep py-16 md:py-20"
      }
    >
      <div className="container-content grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <p className={`font-display font-light text-4xl md:text-5xl ${isGold ? 'text-forest-dark' : 'text-gold-400'}`}>
              {stat.value}{stat.suffix}
            </p>
            <p className={`mt-2 font-body text-[11px] font-semibold uppercase tracking-[2px] ${isGold ? 'text-forest-dark/70' : 'text-white/60'}`}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
