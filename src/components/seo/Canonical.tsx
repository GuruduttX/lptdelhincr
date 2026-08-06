import { canonical } from "@/config/site";

/**
 * Canonical — emits exactly one self-referencing <link rel="canonical"> (SOP
 * A1.2). React 19 hoists this <link> into <head> during SSR, so it ships in the
 * static HTML. Pass the route's own path.
 */
export function Canonical({ path }: { path: string }) {
  return <link rel="canonical" href={canonical(path)} />;
}
