import { NextResponse } from "next/server";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import projects from "@/seed/projects.json";
import faqs from "@/seed/faqs.json";
import reviews from "@/seed/reviews.json";
import blog from "@/seed/blog.json";
import page from "@/seed/page.json";
import media from "@/seed/media.json";

export async function GET() {
  try {
    const config = await payloadConfig;
    const payload = await getPayload({ config });

    const existingMedia = await payload.find({
      collection: "media",
      limit: 1,
    });
    // Check and seed media
    if (existingMedia.totalDocs === 0) {
      console.log("Seeding media...");
      for (const m of media) {
        await payload.create({
          collection: "media",
          data: m as any,
        });
      }
    }

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

    // Check and seed FAQs
    const existingFaqs = await payload.find({ collection: "faqs", limit: 1 });
    if (existingFaqs.totalDocs === 0) {
      console.log("Seeding FAQs...");
      for (const faq of faqs) {
        await payload.create({
          collection: "faqs",
          data: faq as any,
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

    const existingBlog = await payload.find({
      collection: "blog",
      limit: 1,
    });
    // Check and seed blog posts
    if (existingBlog.totalDocs === 0) {
      console.log("Seeding blog posts...");
      for (const post of blog) {
        await payload.create({
          collection: "blog",
          data: post as any,
        });
      }
    }
    // Check and seed page
    const existingPage = await payload.find({
      collection: "page",
      limit: 1,
    });
    if (existingPage.totalDocs === 0) {
      console.log("Seeding page...");
      for (const p of page) {
        await payload.create({
          collection: "page",
          data: p as any,
        });
      }
    }
    // Check and seed rate limits

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
