"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "The Project", href: "/the-project" },
  { label: "Stewardship", href: "/environmental-stewardship" },
  { label: "Partners", href: "#partners" },
  { label: "Education", href: "#education" },
  { label: "Map", href: "#map" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-moss-700/95 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-2xl font-bold text-white transition-colors hover:text-gold-400"
          >
            The Dartry Mountains
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-white transition-colors hover:text-gold-400"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold-400 transition-all duration-300 group-hover:w-full hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-gold-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full mt-0 flex flex-col bg-moss-700/95 backdrop-blur-md md:hidden">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
                className="px-6 py-3 text-white transition-colors hover:bg-moss-600 hover:text-gold-400 border-b border-white/10 last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
