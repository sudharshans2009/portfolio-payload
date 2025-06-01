import { generateMetadata } from "@/lib/metadata";
import payloadConfig from "@/payload.config";
import { Metadata } from "next";
import { getPayload } from "payload";
import ProjectsClientPage from "./_client";

export const metadata: Metadata = generateMetadata(
  "https://sudharshans.me/projects",
  "SS.me - Projects",
);

export default async function ProjectsPage() {
  const config = await payloadConfig;
  const payload = await getPayload({ config });
  const projects = await payload.find({
    collection: "projects",
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
    <ProjectsClientPage
      projects={projects.docs}
      reviews={reviews.docs}
      faqs={faqs.docs}
    />
  );
}
