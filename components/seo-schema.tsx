import Script from "next/script"

export function SeoSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sovremennaä russkaä lacinka",
    alternateName: "Современная русская латинка",
    url: "https://ruslacinka.vercel.app/",
    description: "Упрощённая и логичная система записи русского языка латиницей",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ruslacinka.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    image: {
      "@type": "ImageObject",
      url: "https://ruslacinka.vercel.app/images/logo.png",
      width: "800",
      height: "600",
      license: "https://creativecommons.org/licenses/by-sa/4.0/",
      acquireLicensePage: "https://en.wikipedia.org/wiki/File:Uppercase_and_lowercase_A_with_diaeresis.svg",
      creditText:
        "Изображение предоставлено Wikimedia Commons в соответствии с лицензией Creative Commons Attribution-Share Alike 4.0 International",
    },
  }

  return (
    <Script id="schema-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  )
}
