import RichText from "@/components/rich-text";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import React from "react";
import { Metadata } from "next";
import { generateMetadata as generateMetadataLib } from "@/lib/metadata";
import { cache } from "@/lib/cache";
import { BackgroundAll } from "@/components/background";

const termsCache = cache(
  async () => {
    const config = await payloadConfig;
    const payload = await getPayload({ config });
    const terms = await payload.find({
      collection: "page",
      sort: "createdAt",
    });
    return terms.docs;
  },
  ["pages"],
  {
    revalidate: 60 * 60 * 24,
  },
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ termId: string }>;
}): Promise<Metadata> {
  const { termId: rawId } = await params;
  const termId = rawId.replace("/", "");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sudharshans.me";
  const terms = await termsCache();
  const term = terms.find((doc) => doc.slug === termId.replace("/", ""));
  const page: any = term;
  const title = page.metaTitle || page.title || "Page";
  const description = page.metaDescription;
  const images = page.metaImage
    ? [
        {
          url: `${baseUrl}${page.metaImage.url}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ]
    : undefined;

  return generateMetadataLib(`${baseUrl}/terms/${termId}`, title, {
    description,
    images,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ termId: string }>;
}) {
  const { termId } = await params;
  const terms = await termsCache();
  const term = terms.find((doc) => doc.slug === termId.replace("/", ""));

  if (!term) {
    return (
      <main className="relative flex flex-col items-center z-10">
        <div className="flex flex-col items-center justify-center w-full max-w-7xl px-4 mx-auto">
          <section
            className="relative w-full pt-28 flex flex-col item-center justify-center"
            id="home"
          >
            <BackgroundAll />
            <div className="w-full max-w-7xl mx-auto relative z-10">
              <div className="flex flex-col items-center lg:items-start">
                Not Found
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center z-10">
      <BackgroundAll />
      <div className="flex flex-col items-center justify-center w-full max-w-7xl px-4 mx-auto">
        <section
          className="relative w-full pt-28 flex flex-col item-center justify-center"
          id="home"
        >
          <div className="w-full max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col items-center lg:items-start">
              <RichText
                data={term.content}
                className="text-gray-600 dark:text-gray-300"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
