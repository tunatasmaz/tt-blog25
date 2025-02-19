/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Tuna Taşmaz | Portfolyo ve Makaleler",
  titleTemplate: "%s | Tuna Taşmaz",
  description: "Tuna Taşmaz'ın ürün tasarımı portfolyosu ve UX/UI tasarımı üzerine makaleleri. Kullanıcı deneyimi ve dijital ürün tasarımı üzerine içerikler.",
  canonical: "https://tunatasmaz.com",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://tunatasmaz.com",
    siteName: "Tuna Taşmaz Portfolio",
    title: "Tuna Taşmaz | Product Designer Portfolio",
    description: "Tuna Taşmaz'ın ürün tasarımı portfolyosu. UI/UX tasarımı, kullanıcı deneyimi ve dijital ürün tasarımı üzerine çalışmalar.",
    images: [
      {
        url: '/image/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tuna Taşmaz Portfolio',
      },
    ],
  },
  twitter: {
    handle: "@tunatasmaz",
    site: "@tunatasmaz",
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/image/favicon.png",
      type: "image/png",
    },
    {
      rel: "alternate",
      hrefLang: "tr",
      href: "https://tunatasmaz.com",
    }
  ],
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'ürün tasarımı, UI tasarım, UX tasarım, kullanıcı deneyimi, dijital ürün, portfolyo, Tuna Taşmaz'
    },
    {
      name: 'author',
      content: 'Tuna Taşmaz'
    }
  ],
};

export default defaultSEOConfig;
