"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Overview", href: "#overview" },
  { label: "Protected Areas", href: "#protected-areas" },
  { label: "Habitats", href: "#habitats" },
  { label: "Species", href: "#species" },
  { label: "Farming", href: "#farming" },
  { label: "Map", href: "#map" },
  { label: "Visit Responsibly", href: "#visit" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled
          ? "bg-forest-dark/95 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="container-content flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl md:text-2xl font-light italic text-white transition-colors hover:text-gold-400 tracking-tight"
        >
          Dartry Mountains
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "font-body text-[13px] font-medium uppercase tracking-[1.5px]",
                "text-white/70 transition-colors duration-200 hover:text-white",
                "relative after:absolute after:bottom-[-4px] after:left-0 after:right-0",
                "after:h-[1.5px] after:bg-gold-400 after:scale-x-0 after:transition-transform",
                "after:duration-300 hover:after:scale-x-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-gold-400 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Slide-out Panel */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 lg:hidden transition-all duration-500",
          isMobileMenuOpen ? "visible" : "invisible"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-500",
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[280px] bg-forest-dark/98 backdrop-blur-xl",
            "flex flex-col pt-24 px-8 transition-transform duration-500 ease-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {navigation.map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "font-body text-[14px] font-medium uppercase tracking-[1.5px]",
                "text-white/70 hover:text-gold-400 transition-all duration-300",
                "py-4 border-b border-white/10",
                isMobileMenuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              )}
              style={{
                transitionDelay: isMobileMenuOpen ? `${idx * 50 + 200}ms` : "0ms",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
