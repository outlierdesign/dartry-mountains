import Link from "next/link";

const footerLinks = {
  explore: [
    { label: "Overview", href: "#overview" },
    { label: "Protected Areas", href: "#protected-areas" },
    { label: "Habitats", href: "#habitats" },
    { label: "Species", href: "#species" },
  ],
  visit: [
    { label: "Interactive Map", href: "#map" },
    { label: "Farming", href: "#farming" },
    { label: "Visit Responsibly", href: "#visit" },
    { label: "Leave No Trace", href: "https://www.leavenotraceireland.org/", external: true },
  ],
  resources: [
    { label: "BirdWatch Ireland", href: "https://birdwatchireland.ie", external: true },
    { label: "NPWS", href: "https://www.npws.ie", external: true },
    { label: "Wildflowers of Ireland", href: "https://www.wildflowersofireland.net", external: true },
    { label: "Information Signs", href: "#resources" },
  ],
};

const partners = ["NPWS", "Sligo County Council", "Leitrim County Council"];

export default function Footer() {
  return (
    <footer className="bg-forest-darkest text-white/80">
      {/* Main Footer */}
      <div className="container-content py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-xl font-light italic text-white mb-4">
              The Dartry Mountains
            </h3>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Preserving and celebrating one of Ireland&apos;s most iconic and
              ecologically important mountain ranges for future generations.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-[2px] text-gold-400 mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-[2px] text-gold-400 mb-6">
              Visit
            </h4>
            <ul className="space-y-3">
              {footerLinks.visit.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                      <span className="ml-1 text-[10px]">↗</span>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-[2px] text-gold-400 mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                      <span className="ml-1 text-[10px]">↗</span>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-content py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} dartrymountains.ie — All rights reserved
          </p>
          <div className="flex items-center gap-6">
            {partners.map((partner) => (
              <span
                key={partner}
                className="text-xs text-white/30 font-medium uppercase tracking-wider"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
