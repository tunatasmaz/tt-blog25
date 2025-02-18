/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "My Blog",
  description: "A blog built with Next.js and Supabase",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://your-domain.com",
    siteName: "My Blog",
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
};

export default defaultSEOConfig;
