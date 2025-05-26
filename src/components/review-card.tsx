"use client";

import Image from "next/image";
import Motion from "./motion";
import { Review } from "@/payload-types";

export default function ReviewCard({
  review,
  index,
}: {
  review: Review;
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
      <div className="p-8">
        <Motion
          element="div"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.2 + 1 * 0.1,
          }}
          className="w-full mb-8"
        >
          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <Motion
              element="div"
              initial={{ width: 0 }}
              whileInView={{ width: `${(review.rating / 5) * 100}%` }}
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
              {(review.rating / 5) * 100}%
            </span>
          </div>
        </Motion>
        <p className="text-gray-600 dark:text-gray-300 mb-8 line-clamp-3">
          {review.review}
        </p>
        <div className="flex items-center justify-start gap-4">
          <Image
            src="/images/madlad-logo.png"
            width={50}
            height={50}
            className="rounded-full"
            alt="Logo"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {review.name}
            </h3>
            <h3 className="text-lg text-gray-600 dark:text-gray-300 line-clamp-3">
              {review.position}
            </h3>
          </div>
        </div>
      </div>
    </Motion>
  );
}
