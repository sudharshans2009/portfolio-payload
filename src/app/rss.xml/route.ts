import { NextResponse } from "next/server";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import type { Blog as BlogType } from "@/payload-types";

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const revalidate = 86400; // Rebuild RSS feed every 24 hours

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sudharshans.me";
  const config = await payloadConfig;
  const payload = await getPayload({ config });

  const { docs: posts } = await payload.find({
    collection: "blog",
    where: { status: { equals: "published" } },
    sort: "-publishedDate",
    limit: 20,
  });

  const itemsXml = posts
    .map(
      (post: BlogType) => `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid>${siteUrl}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.publishedDate || "").toUTCString()}</pubDate>
        <description>${escapeXml(post.description || "")}</description>
      </item>
    `,
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>SS.me Blog</title>
    <link>${siteUrl}</link>
    <description>Latest posts from SS.me</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=UTF-8",
    },
  });
}
