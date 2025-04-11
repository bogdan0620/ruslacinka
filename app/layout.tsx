import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { SeoSchema } from "@/components/seo-schema"

export const metadata: Metadata = {
  title: "Sovremennaä russkaä lacinka - Современная русская латинка",
  description:
    "Упрощённая и логичная система записи русского языка латиницей. Создана для ситуаций, когда кириллица — не вариант.",
  keywords:
    "русская латиница, транслитерация, кириллица, латиница, русский язык, латинский алфавит, конвертер, sovremennaä russkaä lacinka, Современная русская латинка",
  authors: [{ name: "SRL Team" }],
  creator: "SRL Team",
  publisher: "SRL Team",
  openGraph: {
    title: "Sovremennaä russkaä lacinka - Современная русская латинка",
    description: "Упрощённая и логичная система записи русского языка латиницей",
    url: "https://ruslacinka.vercel.app/",
    siteName: "Sovremennaä russkaä lacinka",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "https://ruslacinka.vercel.app/images/logo.png",
        width: 800,
        height: 600,
        alt: "Логотип Современной русской латинки",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovremennaä russkaä lacinka",
    description: "Упрощённая и логичная система записи русского языка латиницей",
    images: ["https://ruslacinka.vercel.app/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "dcterms.rights":
      "Логотип предоставлен Wikimedia Commons в соответствии с лицензией Creative Commons Attribution-Share Alike 4.0 International",
    "dcterms.source": "https://en.wikipedia.org/wiki/File:Uppercase_and_lowercase_A_with_diaeresis.svg",
    "dcterms.license": "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  verification: {
    google: "gYgzKL2VtF4qJ8SrqtgH5xf_ErwlhUn4nr9p5iy7kaU",
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <SeoSchema />
        <meta
          name="rights"
          content="Логотип предоставлен Wikimedia Commons в соответствии с лицензией Creative Commons Attribution-Share Alike 4.0 International. Оригинал: https://en.wikipedia.org/wiki/File:Uppercase_and_lowercase_A_with_diaeresis.svg"
        />
        <meta name="google-site-verification" content="gYgzKL2VtF4qJ8SrqtgH5xf_ErwlhUn4nr9p5iy7kaU" />
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}


import './globals.css'
