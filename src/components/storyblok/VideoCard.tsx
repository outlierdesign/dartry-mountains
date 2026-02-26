"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Play, X } from "lucide-react";

interface VideoPreview {
  filename: string;
  alt: string;
}

interface VideoCardProps {
  title: string;
  description: string;
  video_url: string;
  preview_image?: VideoPreview;
  transcript?: string;
  background_color?: string;
  spacing?: "compact" | "normal" | "generous";
}

export default function VideoCard({
  title,
  description,
  video_url,
  preview_image,
  transcript,
  background_color = "cream",
  spacing = "normal",
}: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

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

  // Determine if URL is YouTube or Vimeo for iframe
  const isYouTube = video_url.includes("youtube.com") || video_url.includes("youtu.be");
  const isVimeo = video_url.includes("vimeo.com");

  let iframeUrl = video_url;
  if (isYouTube && !video_url.includes("embed")) {
    const videoId = video_url.split("v=")[1] || video_url.split("/").pop();
    iframeUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (isVimeo && !video_url.includes("player")) {
    const videoId = video_url.split("/").pop();
    iframeUrl = `https://player.vimeo.com/video/${videoId}`;
  }

  return (
    <section
      className={cn(
        "w-full",
        spacingClasses[spacing as keyof typeof spacingClasses],
        bgClasses[background_color as keyof typeof bgClasses] || bgClasses.cream
      )}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Video Card */}
        <div className="bg-card rounded-lg overflow-hidden border border-border">
          {/* Preview Area */}
          <div className="relative h-64 bg-stone-100 overflow-hidden group cursor-pointer" onClick={() => setIsOpen(true)}>
            {preview_image ? (
              <img
                src={preview_image.filename}
                alt={preview_image.alt || title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-400">
                <svg
                  className="w-20 h-20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            )}

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
              <button
                onClick={() => setIsOpen(true)}
                className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group/button"
                aria-label="Play video"
              >
                <Play className="w-6 h-6 text-moss-700 ml-1 group-hover/button:text-moss-800" fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <h3 className="font-display font-semibold text-xl text-moss-900 mb-2">
              {title}
            </h3>

            {/* Description */}
            {description && (
              <p className="text-sm text-muted-foreground mb-4">
                {description}
              </p>
            )}

            {/* Transcript Toggle */}
            {transcript && (
              <div className="mt-4 border-t border-border pt-4">
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="text-sm font-medium text-moss-600 hover:text-moss-700 transition-colors inline-flex items-center gap-2"
                >
                  {showTranscript ? "Hide" : "Show"} transcript
                  <svg
                    className={cn(
                      "w-4 h-4 transition-transform",
                      showTranscript && "rotate-180"
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>

                {/* Transcript Content */}
                {showTranscript && (
                  <div className="mt-4 p-4 bg-stone-50 rounded-md border border-stone-200">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {transcript}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal/Dialog */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5 text-moss-700" />
            </button>

            {/* Video Player */}
            {(isYouTube || isVimeo) ? (
              <iframe
                src={iframeUrl}
                title={title}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full rounded-lg"
              />
            ) : (
              <video
                src={video_url}
                title={title}
                controls
                autoPlay
                className="w-full h-full rounded-lg bg-black"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
