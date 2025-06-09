import { Metadata } from "next";

export interface MetadataOverrides {
  description?: string;
  images?: NonNullable<Metadata["openGraph"]>["images"];
}
export function generateMetadata(
  pageUrl: string,
  pageTitle: string,
  overrides: MetadataOverrides = {},
): Metadata {
  const defaultDescription = "Providing the best project experience";
  const description = overrides.description || defaultDescription;
  const ogImages = overrides.images || [
    {
      url: `${pageUrl}/og.png`,
      width: 1200,
      height: 630,
      alt: pageTitle,
    },
  ];
  return {
    title: pageTitle,
    description,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      title: pageTitle,
      description,
      url: pageUrl,
      siteName: pageTitle,
      images: ogImages,
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: (Array.isArray(ogImages) ? ogImages : [ogImages]).map((img) =>
        typeof img === "string" ? img : (img as any).url,
      ),
      creator: "@sudharshans2009",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      noarchive: false,
    },
    manifest: "/site.webmanifest",
    appleWebApp: {
      capable: true,
      title: pageTitle,
      statusBarStyle: "default",
      startupImage: [
        "/apple-touch-startup-image-640x1136.png",
        "/apple-touch-startup-image-750x1294.png",
        "/apple-touch-startup-image-1242x2148.png",
        "/apple-touch-startup-image-1536x2048.png",
        "/apple-touch-startup-image-1668x2388.png",
        "/apple-touch-startup-image-2048x2732.png",
      ],
    },
    verification: {
      google:
        "google-site-verification=8a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
      yandex: "yandex-verification: 1234567890abcdef",
      other: {
        "example.com": "example-verification-code",
      },
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-US": pageUrl,
      },
    },
  };
}
