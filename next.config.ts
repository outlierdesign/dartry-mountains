import type { NextConfig } from "next";

const securityHeaders = [
  {
    // Prevent clickjacking — only allow framing from same origin
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    // Prevent MIME type sniffing
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Control referrer information sent with requests
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Enable HSTS — force HTTPS for 1 year, include subdomains
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    // Restrict browser features the site can use
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  {
    // XSS protection fallback for older browsers
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    // Content Security Policy — allow YouTube embeds, Mapbox, Storyblok, Google Fonts
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.mapbox.com https://www.youtube.com https://s.ytimg.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.mapbox.com",
      "img-src 'self' data: blob: https://a.storyblok.com https://images.unsplash.com https://*.mapbox.com https://i.ytimg.com https://img.youtube.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://api.storyblok.com https://*.mapbox.com https://events.mapbox.com https://www.youtube.com",
      "frame-src 'self' https://www.youtube.com https://youtube.com",
      "media-src 'self' https://www.youtube.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Vercel deployment optimizations
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Security headers applied to all routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
