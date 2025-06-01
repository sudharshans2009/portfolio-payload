"use client";

import Image from "next/image";
import Motion from "./motion";
import { Book } from "lucide-react";
import { formatImage } from "@/lib/utils";
import { Blog } from "@/payload-types";

export default function BlogCard({
  blog,
  index,
}: {
  blog: Blog;
  index: number;
}) {
  return (
    <Motion
      element="div"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group relative bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={formatImage(blog.image)}
          alt={blog.title}
          loading="lazy"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 group-hover:opacity-30" />
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {blog.tags?.map(({ tag }) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-transparent text-white rounded-lg 
                  backdrop-blur-sm border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {blog.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8 line-clamp-3">
          {blog.description}
        </p>
        <div className="flex gap-4 flex-col md:flex-row">
          <Motion
            element="a"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={`/blog/${blog.slug}` || "#"}
            className="px-6 py-2.5 bg-purple-600 dark:bg-purple-500 text-white rounded-lg flex items-center gap-2 hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20"
          >
            Read Now
            <Book className="w-4 h-4" />
          </Motion>
        </div>
      </div>
    </Motion>
  );
}
