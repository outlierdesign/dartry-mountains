"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react";
import { type ReactNode } from "react";
import { components } from "@/lib/storyblok";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
  bridge: true,
});

export default function StoryblokProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
