import { generateMetadata } from "@/lib/metadata";
import BlogClientPage from "./_client";
import payloadConfig from "@/payload.config";
import { Metadata } from "next";
import { getPayload } from "payload";

export const metadata: Metadata = generateMetadata(
  "https://sudharshans.me/blog",
  "SS.me - Blog",
);

export default async function BlogPage() {
  const config = await payloadConfig;
  const payload = await getPayload({ config });
  const blog = await payload.find({
    collection: "blog",
    sort: "createdAt",
  });

  return <BlogClientPage blog={blog.docs} />;
}
