"use client";

import { useEffect, useState } from "react";
import Motion from "@/components/motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Blog } from "@/payload-types";
import BlogCard from "@/components/blog-card";
import {
  BackgroundHigh,
  BackgroundLow,
  HeroBackground,
} from "@/components/background";
import { ProjectsHero } from "@/components/project-card";
import { FullstackDev, Intro } from "@/components/hero";
import { useSearch } from "@/hooks/use-search";

export default function ServicesClientPage({ blog }: { blog: Blog[] }) {
  const { filtered, query } = useSearch<Blog>(
    blog,
    (post, query) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      (post.description ?? "").toLowerCase().includes(query.toLowerCase()) ||
      post.tags
        ?.map((t) => t.tag)
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
  );

  return (
    <main className="relative flex min-h-screen flex-col items-center z-10">
      <div className="flex flex-col items-center justify-center w-full max-w-7xl px-4 mx-auto">
        <section
          className="relative w-full pt-28 flex flex-col item-center justify-center"
          id="home"
        >
          <HeroBackground />
          <div className="w-full max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col items-center lg:items-start">
              <Motion
                element="div"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-4xl text-center lg:text-left"
              >
                <FullstackDev />
                <Intro />
                <div className="relative mt-6 w-full lg:max-w-lg">
                  <Search className="absolute w-8 h-8 top-3 left-3 text-purple-600 dark:text-purple-400" />
                  <Input
                    type="text"
                    placeholder="Search for posts..."
                    value={query.get}
                    onChange={(e) => query.set(e.target.value)}
                    className="w-full h-14 pl-14 pr-4 py-3 text-lg placeholder:text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <ProjectsHero />
              </Motion>
            </div>
          </div>
        </section>
        <section
          className="w-full pt-24 flex flex-col item-center justify-center"
          id="blog"
        >
          <BackgroundLow />
          <div className="w-full max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <Motion
                element="h2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400"
              >
                My Recent Posts
              </Motion>
              <Motion
                element="p"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-lg text-gray-600 dark:text-gray-300"
              >
                Here are some of my latest blog posts. Feel free to explore and
                read more about my thoughts, experiences, and insights.
              </Motion>
            </div>
            <div className="grid gap-8 auto-rows-fr lg:grid-cols-2">
              {filtered.map((blog, index) => (
                <BlogCard blog={blog} index={index} key={blog.title} />
              ))}
            </div>
          </div>
        </section>
        <section
          className="w-full pt-24 flex flex-col item-center justify-center"
          id="articles"
        >
          <BackgroundHigh />
          <div className="w-full max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <Motion
                element="h2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400"
              >
                Articles & Insights
              </Motion>
              <Motion
                element="p"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-lg text-gray-600 dark:text-gray-300"
              >
                Explore my articles and insights on various topics, including
                web development, technology, and more. I share my experiences,
                tips, and tricks to help you navigate the tech world.
              </Motion>
            </div>
            <div className="grid gap-8 auto-rows-fr lg:grid-cols-2">
              {filtered.map((blog, index) => (
                <BlogCard blog={blog} index={index} key={blog.title} />
              ))}
            </div>
          </div>
        </section>
        <section
          className="w-full pt-24 pb-12 flex flex-col item-center justify-center"
          id="tips"
        >
          <BackgroundLow />
          <div className="w-full max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <Motion
                element="h2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400"
              >
                Tips & Tricks
              </Motion>
              <Motion
                element="p"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-lg text-gray-600 dark:text-gray-300"
              >
                Discover helpful tips and tricks to enhance your skills and stay
                ahead in the tech world. These insights are curated to help you
                navigate challenges and improve your workflow.
              </Motion>
            </div>
            <div className="grid gap-8 auto-rows-fr lg:grid-cols-2">
              {filtered.map((blog, index) => (
                <BlogCard blog={blog} index={index} key={blog.title} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
