"use client";

import Image from "next/image";
import Motion from "./motion";
import { Cog, ExternalLink } from "lucide-react";
import { formatImage } from "@/lib/utils";
import { Service } from "@/payload-types";

export default function ServiceCard({
  service,
  index,
}: {
  service: Service;
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
          src={formatImage(service.image)}
          alt={service.title}
          loading="lazy"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 group-hover:opacity-30" />
        <div className="absolute w-[50vw] lg:w-[25vw] top-4 left-4 flex flex-wrap gap-2">
          <Motion
            element="div"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.2 + 1 * 0.1,
            }}
            className="w-full bg-transparent backdrop-blur-sm border border-white/10 px-3 py-2 rounded-lg"
          >
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <Motion
                element="div"
                initial={{ width: 0 }}
                whileInView={{ width: `${(service.rating / 5) * 100}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.5,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: index * 0.2 + 1 * 0.1,
                }}
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer" />
              </Motion>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Rating
              </span>
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                {(service.rating / 5) * 100}%
              </span>
            </div>
          </Motion>
        </div>
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {service.tags?.map(({ tag }) => (
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
          {service.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8 line-clamp-3">
          {service.description}
        </p>
        <div className="flex gap-4 flex-col md:flex-row">
          <Motion
            element="a"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={service.exampleUrl || "#"}
            className="px-6 py-2.5 bg-purple-600 dark:bg-purple-500 text-white rounded-lg flex items-center gap-2 hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20"
          >
            Service Demo
            <ExternalLink className="w-4 h-4" />
          </Motion>
          <Motion
            element="a"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={service.learnMoreUrl || "#"}
            className="px-6 py-2.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors shadow-lg shadow-gray-200/20 dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700"
          >
            <Cog className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            View Details
          </Motion>
        </div>
      </div>
    </Motion>
  );
}
