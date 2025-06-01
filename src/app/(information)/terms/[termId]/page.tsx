import RichText from "@/components/rich-text";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import React from "react";
import { Metadata } from "next";
import { generateMetadata as generateMetadataLib } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ termId: string }>;
}): Promise<Metadata> {
  const { termId: rawId } = await params;
  const termId = rawId.replace("/", "");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sudharshans.me";
  const config = await payloadConfig;
  const payload = await getPayload({ config });
  const term = await payload.find({
    collection: "page",
    where: { slug: { equals: termId } },
    limit: 1,
  });
  const page: any = term.docs[0];
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
  const config = await payloadConfig;
  const payload = await getPayload({ config });
  const term = await payload.find({
    collection: "page",
    where: {
      slug: {
        equals: termId.replace("/", ""),
      },
    },
    limit: 1,
  });

  if (!term.docs[0]) {
    return (
      <main className="relative flex flex-col items-center z-10">
        <div className="flex flex-col items-center justify-center w-full max-w-7xl px-4 mx-auto">
          <section
            className="relative w-full pt-28 flex flex-col item-center justify-center"
            id="home"
          >
            <div className="absolute top-1/3 left-1/4 w-10 h-10 md:w-96 md:h-96 bg-purple-600/5 dark:bg-purple-600/10 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-10 h-10 md:w-80 md:h-80 bg-indigo-600/5 dark:bg-indigo-600/10 rounded-full filter blur-3xl animate-pulse delay-700" />
            <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-purple-100/20 dark:from-purple-900/20 via-transparent to-transparent" />
            <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-purple-100/20 dark:from-purple-900/20 via-transparent to-transparent" />
            <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-purple-100/20 dark:from-purple-900/20 via-transparent to-transparent" />
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
      <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-purple-100/20 dark:from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-purple-100/20 dark:from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-purple-100/20 dark:from-purple-900/20 via-transparent to-transparent" />
      <div className="flex flex-col items-center justify-center w-full max-w-7xl px-4 mx-auto">
        <section
          className="relative w-full pt-28 flex flex-col item-center justify-center"
          id="home"
        >
          <div className="absolute top-1/3 left-1/4 w-10 h-10 md:w-96 md:h-96 bg-purple-600/5 dark:bg-purple-600/10 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-10 h-10 md:w-80 md:h-80 bg-indigo-600/5 dark:bg-indigo-600/10 rounded-full filter blur-3xl animate-pulse delay-700" />
          <div className="w-full max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col items-center lg:items-start">
              <RichText
                data={term.docs[0].content}
                className="text-gray-600 dark:text-gray-300"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
