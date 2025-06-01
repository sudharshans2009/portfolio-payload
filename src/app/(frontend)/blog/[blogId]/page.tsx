import RichText from "@/components/rich-text";
import { Separator } from "@/components/ui/separator";
import payloadConfig from "@/payload.config";
import Image from "next/image";
import { getPayload } from "payload";
import React from "react";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const config = await payloadConfig;
  const payload = await getPayload({ config });
  const blog = await payload.find({
    collection: "blog",
    where: {
      slug: {
        equals: blogId.replace("/", ""),
      },
    },
    limit: 1,
  });

  if (!blog.docs[0]) {
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
              <div className="mb-8">
                <div>
                  {blog.docs[0].categories?.map((category) => (
                    <span
                      key={category.tag}
                      className="inline-block px-3 py-1 text-base font-bold bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 rounded-full mr-2 mb-4"
                    >
                      {category.tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl max-w-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {blog.docs[0].title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {blog.docs[0].description}
                </p>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {blog.docs[0].authors?.map((author) => {
                    if (typeof author === "number") return null;

                    return (
                    <span
                      key={author.email}
                      className="text-gray-500 dark:text-gray-400 flex items-center gap-2"
                    >
                        <Image src="/images/madlad-logo.png" width={32} height={32} className="rounded-full" alt="Madlad Logo" /> {author.firstName}{" "}{author.lastName}
                    </span>
                  )
                  })}
                </p>
                <div>
                  {blog.docs[0].tags?.map((tag) => (
                    <span
                      key={tag.tag}
                      className="inline-block px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg mr-2 mb-2"
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>
              </div>
              <Separator className="w-full" />
              <RichText
                data={blog.docs[0].content}
                className="text-gray-600 dark:text-gray-300 mb-8"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
