import { generateMetadata } from "@/lib/metadata";
import BlogClientPage from "./_client";
import payloadConfig from "@/payload.config";
import { Metadata } from "next";
import { getPayload } from "payload";
import { cache } from "@/lib/cache";

export const metadata: Metadata = generateMetadata(
  "https://sudharshans.me/blog",
  "SS.me - Blog",
);

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

export default async function BlogPage() {
  const blog = await blogCache();

  return <BlogClientPage blog={blog} />;
}
