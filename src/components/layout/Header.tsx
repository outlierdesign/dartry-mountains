"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Overview", href: "/#overview" },
  { label: "Protected Areas", href: "/#protected-areas" },
  { label: "Habitats", href: "/#habitats" },
  { label: "Species", href: "/#species" },
  { label: "Farming", href: "/#farming" },
  { label: "Map", href: "/#map" },
  { label: "Visit Responsibly", href: "/#visit" },
  { label: "Gallery", href: "/gallery" },
  { label: "News", href: "/news" },
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close menu on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled
          ? "bg-forest-dark/95 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="container-content flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl md:text-2xl font-light italic text-white transition-colors hover:text-gold-400 tracking-tight z-50"
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

        {/* Hamburger / Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden relative z-50 p-2 text-white hover:text-gold-400 transition-colors"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">{isMobileMenuOpen ? "Close" : "Menu"}</span>
          <div className="relative w-6 h-5 flex flex-col justify-between">
            <span
              className={cn(
                "block h-[2px] w-6 bg-current rounded-full transition-all duration-300 origin-center",
                isMobileMenuOpen ? "rotate-45 translate-y-[9px]" : ""
              )}
            />
            <span
              className={cn(
                "block h-[2px] w-6 bg-current rounded-full transition-all duration-200",
                isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "block h-[2px] w-6 bg-current rounded-full transition-all duration-300 origin-center",
                isMobileMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Full-screen Overlay Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-400",
          isMobileMenuOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        )}
        style={{ backgroundColor: "#122017" }}
      >
        {/* Menu content */}
        <div
          className={cn(
            "relative h-full flex flex-col justify-center px-10 transition-all duration-500",
            isMobileMenuOpen ? "opacity-100" : "opacity-0 translate-y-4"
          )}
        >
          {navigation.map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "font-display text-2xl font-light text-white/80 hover:text-gold-400",
                "py-3 transition-all duration-300 border-b border-white/5",
                isMobileMenuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-6"
              )}
              style={{
                transitionDelay: isMobileMenuOpen
                  ? `${idx * 60 + 150}ms`
                  : "0ms",
              }}
            >
              {item.label}
            </Link>
          ))}

          {/* Footer info in mobile menu */}
          <div
            className={cn(
              "mt-10 pt-6 border-t border-white/10 transition-all duration-300",
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: isMobileMenuOpen ? "700ms" : "0ms" }}
          >
            <p className="font-body text-xs text-white/40 uppercase tracking-wider">
              Sligo &amp; Leitrim, Ireland
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
