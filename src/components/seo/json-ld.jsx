export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is trusted, server-generated structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />);

}
