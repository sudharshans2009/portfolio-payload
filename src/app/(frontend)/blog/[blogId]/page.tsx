import RichText from "@/components/rich-text";
import { Separator } from "@/components/ui/separator";
import payloadConfig from "@/payload.config";
import Image from "next/image";
import { getPayload } from "payload";
import React from "react";
import Comments from "@/components/comments";
import { cache } from "@/lib/cache";
import { formatImage } from "@/lib/utils";
import BlogCard from "@/components/blog-card";
import { BackgroundAll } from "@/components/background";

const blogCache = cache(
  async () => {
    const config = await payloadConfig;
    const payload = await getPayload({ config });
    const blog = await payload.find({
      collection: "blog",
      sort: "createdAt",
    });
    return blog.docs;
  },
  ["blog"],
  {
    revalidate: 60 * 60 * 24 * 2,
  },
);

export default async function PostPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const blog = await blogCache();
  const post = blog.find((doc) => doc.slug === blogId.replace("/", ""));

  if (!post) {
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
          <div className="w-full max-w-4xl mx-auto relative z-10">
            <div className="flex flex-col items-center lg:items-start">
              <div className="mb-8">
                <div>
                  {post.categories?.map((category) => (
                    <span
                      key={category.tag}
                      className="inline-block px-3 py-1 text-base font-bold bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 rounded-full mr-2 mb-4"
                    >
                      {category.tag}
                    </span>
                  ))}
                </div>
                <div className="group relative flex justify-center items-center w-full max-w-4xl mb-6">
                  <Image
                    src={formatImage(post.image)}
                    alt={post.title}
                    loading="lazy"
                    width={922}
                    height={512}
                    className="transition-transform object-cover w-full rounded-2xl aspect-[16/6] duration-700 group-hover:scale-105"
                  />
                </div>
                <h1 className="text-4xl max-w-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {post.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {post.description}
                </p>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {post.authors?.map((author) => {
                    if (typeof author === "number") return null;

                    return (
                      <span
                        key={author.email}
                        className="text-gray-500 dark:text-gray-400 flex items-center gap-2"
                      >
                        <Image
                          src="/images/madlad-logo.png"
                          width={32}
                          height={32}
                          className="rounded-full"
                          alt="Madlad Logo"
                        />{" "}
                        {author.firstName} {author.lastName}
                      </span>
                    );
                  })}
                </p>
                <div>
                  {post.tags?.map((tag) => (
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
                data={post.content}
                className="text-gray-600 dark:text-gray-300 mb-8"
              />
              <Comments
                repo="sudharshans2009/utterances"
                issueTerm={`title:${post.slug}`}
                label="Blog Comment"
              />
            </div>
          </div>
        </section>
        <section
          className="relative w-full pt-24 flex flex-col item-center justify-center"
          id="home"
        >
          <div className="w-full mx-auto relative z-10">
            <div className="mt-10 mb-15">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  More Blogs
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  Explore more articles from our blog.
                </p>
              </div>
              <div className="grid gap-8 auto-rows-fr lg:grid-cols-2">
                {blog.map((blog, index) => (
                  <BlogCard blog={blog} index={index} key={blog.title} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
