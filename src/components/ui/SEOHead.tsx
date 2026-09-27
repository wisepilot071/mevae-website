/** Renders JSON-LD structured data. (Page <head> tags come from lib/seo.ts via generateMetadata.) */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify escapes quotes; additionally escape "<" so no string can close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
