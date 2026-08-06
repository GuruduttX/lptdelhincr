/**
 * JsonLd — SSR-injects a <script type="application/ld+json"> block.
 * Renders in the document on the server (SOP A1: critical structured data in
 * raw HTML, no JS required). Accepts one schema object or an array.
 */
export function JsonLd({ schema }: { schema: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(schema);
  return (
    <script
      type="application/ld+json"
      // schema objects are app-controlled (no user input) — safe to inline.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
