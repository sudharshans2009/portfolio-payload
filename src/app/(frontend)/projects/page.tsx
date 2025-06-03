import { generateMetadata } from "@/lib/metadata";
import payloadConfig from "@/payload.config";
import { Metadata } from "next";
import { getPayload } from "payload";
import ProjectsClientPage from "./_client";
import { cache } from "@/lib/cache";

export const metadata: Metadata = generateMetadata(
  "https://sudharshans.me/projects",
  "SS.me - Projects",
);

const projectsCache = cache(
  async () => {
    const config = await payloadConfig;
    const payload = await getPayload({ config });
    const projects = await payload.find({
      collection: "projects",
      sort: "createdAt"
    });
    return projects.docs;
  },
  ["projects"],
  {
    revalidate: 60 * 60 * 24,
  }
);

const reviewsCache = cache(
  async () => {
    const config = await payloadConfig;
    const payload = await getPayload({ config });
    const reviews = await payload.find({
      collection: "reviews",
      sort: "createdAt"
    });
    return reviews.docs;
  },
  ["reviews"],
  {
    revalidate: 60 * 60 * 24,
  }
);

const faqsCache = cache(
  async () => {
    const config = await payloadConfig;
    const payload = await getPayload({ config });
    const faqs = await payload.find({
      collection: "faqs",
      sort: "createdAt"
    });
    return faqs.docs;
  },
  ["faqs"],
  {
    revalidate: 60 * 60 * 24,
  }
);

export default async function ProjectsPage() {
  const projects = await projectsCache();
  const reviews = await reviewsCache()
  const faqs = await faqsCache();

  return (
    <ProjectsClientPage
      projects={projects}
      reviews={reviews}
      faqs={faqs}
    />
  );
}
