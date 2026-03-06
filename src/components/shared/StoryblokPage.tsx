"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";
import { useStoryblokState } from "@storyblok/react";
import { components } from "@/lib/storyblok";

interface BlokData {
  component: string;
  _uid: string;
  [key: string]: any;
}

interface Story {
  content: {
    body: BlokData[];
    [key: string]: any;
  };
  [key: string]: any;
}

interface StoryblokPageProps {
  story: Story;
}

/**
 * Renders a Storyblok page story by iterating over the body bloks
 * and mapping each to the corresponding React component.
 *
 * Uses useStoryblokState to connect to the Storyblok bridge
 * for real-time live editing in the visual editor.
 */
export default function StoryblokPage({ story: initialStory }: StoryblokPageProps) {
  // useStoryblokState subscribes to the Storyblok bridge and
  // returns the latest story data (updated in real time when editing)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const story = useStoryblokState(initialStory as any);

  const body = (story ?? initialStory)?.content?.body ?? [];

  return (
    <main className="w-full">
      {body.map((blok: BlokData) => {
        const Component = components[blok.component];
        if (!Component) {
          console.warn(`Unknown component: ${blok.component}`);
          return null;
        }

        const props = transformBlokProps(blok);

        return (
          <ScrollReveal key={blok._uid}>
            <Component {...props} />
          </ScrollReveal>
        );
      })}
    </main>
  );
}

/** Fields that should be split from newline-delimited strings into arrays */
const NEWLINE_ARRAY_FIELDS = new Set(["bullets", "facts"]);

/** Fields that are numeric */
const NUMERIC_FIELDS = new Set(["center_lat", "center_lng", "zoom", "overlay_opacity"]);

/**
 * Transform a single field value from Storyblok format to component prop format.
 */
function transformValue(key: string, value: any): any {
  // Skip Storyblok internal fields
  if (key === "_editable") return undefined;

  // Newline-delimited strings → arrays
  if (NEWLINE_ARRAY_FIELDS.has(key) && typeof value === "string") {
    return value.split("\n").filter(Boolean);
  }

  // Numeric fields
  if (NUMERIC_FIELDS.has(key)) {
    return Number(value) || undefined;
  }

  // Image/asset objects (pass through)
  if (key === "image" && value && typeof value === "object" && value.filename) {
    return value;
  }

  // Nested bloks array — transform each child recursively
  if (Array.isArray(value) && value.length > 0 && value[0]?.component) {
    return value.map((child: BlokData) => {
      const { component: _c, _uid: _u, _editable: _e, ...childRest } = child;
      const transformed: Record<string, any> = {};
      for (const [ck, cv] of Object.entries(childRest)) {
        const tv = transformValue(ck, cv);
        if (tv !== undefined) transformed[ck] = tv;
      }
      return transformed;
    });
  }

  return value;
}

/**
 * Transform Storyblok blok data into component props.
 * Handles nested bloks, newline-delimited arrays, numeric fields,
 * and strips Storyblok internal metadata.
 */
function transformBlokProps(blok: BlokData): Record<string, any> {
  const { component, _uid, _editable, ...rest } = blok;
  const props: Record<string, any> = {};

  for (const [key, value] of Object.entries(rest)) {
    const transformed = transformValue(key, value);
    if (transformed !== undefined) {
      props[key] = transformed;
    }
  }

  return props;
}
