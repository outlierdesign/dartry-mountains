"use client";

import { render } from "storyblok-rich-text-react-renderer";

interface RichTextRendererProps {
  content: any;
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content) return null;

  return <div className="rich-text-content">{render(content)}</div>;
}
