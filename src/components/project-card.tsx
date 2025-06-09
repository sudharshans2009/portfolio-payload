"use client";

import Image from "next/image";
import Motion from "./motion";
import { ExternalLink, Github } from "lucide-react";
import { formatImage } from "@/lib/utils";
import { Project } from "@/payload-types";
import { stack } from "@/constants";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
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
          src={formatImage(project.image)}
          alt={project.title}
          loading="lazy"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 group-hover:opacity-30" />
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {project.tags?.map(({ tag }) => (
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
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8 line-clamp-3">
          {project.description}
        </p>
        <div className="flex gap-4 flex-col md:flex-row">
          <Motion
            element="a"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={project.demoUrl || "#"}
            className="px-6 py-2.5 bg-purple-600 dark:bg-purple-500 text-white rounded-lg flex items-center gap-2 hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20"
          >
            Live Demo
            <ExternalLink className="w-4 h-4" />
          </Motion>
          <Motion
            element="a"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={project.githubUrl || "#"}
            className="px-6 py-2.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors shadow-lg shadow-gray-200/20 dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700"
          >
            <Github className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            View Code
          </Motion>
        </div>
      </div>
    </Motion>
  );
}

export function ProjectsHero() {
  return (
    <Motion
      element="div"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-12 flex items-center gap-8 justify-center lg:justify-start"
    >
      <div className="flex -space-x-3">
        {stack.map((item) => (
          <div
            key={item.name}
            className="w-12 h-12 rounded-full border-2 border-purple-500/20 dark:border-purple-500/30 bg-purple-500/5 dark:bg-purple-900/30"
          >
            <Image
              src={item.image}
              className="rounded-full"
              width={48}
              height={48}
              alt={item.name}
            />
          </div>
        ))}
      </div>
      <div className="text-gray-500 dark:text-gray-400">
        <span className="text-purple-600 dark:text-purple-400 font-semibold">
          50+
        </span>{" "}
        Projects Completed
      </div>
    </Motion>
  );
}
