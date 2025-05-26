import { generateMetadata } from "@/lib/metadata";
import BlogClientPage from "./_client";
import payloadConfig from "@/payload.config";
import { Metadata } from "next";
import { getPayload } from "payload";

export const metadata: Metadata = generateMetadata(
  "https://sudharshans2009.live/blog",
  "SS.live - Blog",
);

export default async function BlogPage() {
  const config = await payloadConfig;
  const payload = await getPayload({ config });
  const services = await payload.find({
    collection: "services",
    sort: "createdAt",
  });
  const reviews = await payload.find({
    collection: "reviews",
    sort: "createdAt",
  });
  const faqs = await payload.find({
    collection: "faqs",
    sort: "createdAt",
  });

  return (
    <BlogClientPage
      services={services.docs}
      reviews={reviews.docs}
      faqs={faqs.docs}
    />
  );
}
