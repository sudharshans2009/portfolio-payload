import { NextResponse } from "next/server";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import projects from "@/seed/projects.json";
import services from "@/seed/services.json";
import faqs from "@/seed/faqs.json";
import reviews from "@/seed/reviews.json";
import { Faq, Service } from "@/payload-types";

export async function GET() {
  try {
    const config = await payloadConfig;
    const payload = await getPayload({ config });

    // Check and seed projects
    const existingProjects = await payload.find({
      collection: "projects",
      limit: 1,
    });
    if (existingProjects.totalDocs === 0) {
      console.log("Seeding projects...");
      for (const project of projects) {
        await payload.create({ collection: "projects", data: project });
      }
    }

    // Check and seed services
    const existingServices = await payload.find({
      collection: "services",
      limit: 1,
    });
    if (existingServices.totalDocs === 0) {
      console.log("Seeding services...");
      for (const service of services) {
        await payload.create({
          collection: "services",
          data: service as Omit<Service, "id" | "createdAt" | "updatedAt"> &
            Partial<Pick<Service, "id" | "createdAt" | "updatedAt">>,
        });
      }
    }

    // Check and seed FAQs
    const existingFaqs = await payload.find({ collection: "faqs", limit: 1 });
    if (existingFaqs.totalDocs === 0) {
      console.log("Seeding FAQs...");
      for (const faq of faqs) {
        await payload.create({
          collection: "faqs",
          data: faq as Omit<Faq, "_id">,
        });
      }
    }

    // Check and seed reviews
    const existingReviews = await payload.find({
      collection: "reviews",
      limit: 1,
    });
    if (existingReviews.totalDocs === 0) {
      console.log("Seeding reviews...");
      for (const review of reviews) {
        await payload.create({ collection: "reviews", data: review });
      }
    }

    console.log("Database seeding completed.");
    return NextResponse.json({ message: "Database seeding completed." });
  } catch (err) {
    console.error("Error seeding database:", err);
    return NextResponse.json(
      { error: "Error seeding database." },
      { status: 500 },
    );
  }
}
