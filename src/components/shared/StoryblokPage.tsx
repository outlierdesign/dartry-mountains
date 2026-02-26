import ScrollReveal from "@/components/shared/ScrollReveal";
import { components } from "@/lib/storyblok";

interface BlokData {
  component: string;
  _uid: string;
  [key: string]: any;
}

interface StoryblokPageProps {
  story: {
    content: {
      body: BlokData[];
      [key: string]: any;
    };
    [key: string]: any;
  };
}

/**
 * Renders a Storyblok page story by iterating over the body bloks
 * and mapping each to the corresponding React component.
 */
export default function StoryblokPage({ story }: StoryblokPageProps) {
  const body = story.content?.body ?? [];

  return (
    <main className="w-full">
      {body.map((blok: BlokData) => {
        const Component = components[blok.component];
        if (!Component) {
          console.warn(`Unknown component: ${blok.component}`);
          return null;
        }

        // Transform nested bloks for components that expect arrays
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

/**
 * Transform Storyblok blok data into component props.
 * Handles nested bloks (stats, partners, items, milestones) by
 * converting them from Storyblok's blok format to the prop format
 * expected by each React component.
 */
function transformBlokProps(blok: BlokData): Record<string, any> {
  const { component, _uid, ...rest } = blok;
  const props: Record<string, any> = {};

  for (const [key, value] of Object.entries(rest)) {
    if (Array.isArray(value) && value.length > 0 && value[0]?.component) {
      // This is a nested bloks array — transform each child
      props[key] = value.map((child: BlokData) => {
        const { component: _c, _uid: _u, ...childRest } = child;
        return childRest;
      });
    } else if (key === "center_lat" || key === "center_lng" || key === "zoom") {
      // Convert number strings to actual numbers
      props[key] = Number(value) || undefined;
    } else if (key === "image" && value && typeof value === "object" && value.filename) {
      // Storyblok asset format — pass through
      props[key] = value;
    } else {
      props[key] = value;
    }
  }

  return props;
}
