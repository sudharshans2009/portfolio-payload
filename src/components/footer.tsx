"use client";

import { siteNavLinks, socialLinks } from "@/constants";
import { MapPin, Mail } from "lucide-react";
import * as Lucide from "lucide-react";
import Link from "next/link";
import Motion from "./motion";
import { useQuery } from "@tanstack/react-query";
import { PaginatedDocs } from "payload";
import { Page } from "@/payload-types";
import { stringify } from "qs-esm";

export default function Footer() {
  const params = stringify({
    sort: "createdAt",
  });

  const query = useQuery<PaginatedDocs<Page>>({
    queryKey: ["pages"],
    queryFn: async () => {
      const res = await fetch(`/api/page?${params}`);
      if (!res.ok) throw new Error("Failed to fetch unread messages");
      return res.json();
    },
  });

  return (
    <footer className="relative bg-[#101010] dark:bg-black text-white">
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                SS.me
              </span>
            </Link>
            <p className="text-gray-300 max-w-sm">
              Creating digital experiences that combine creativity with
              technical excellence.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Motion
                  element="a"
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-purple-800/10 text-purple-500 hover:bg-purple-500/20 dark:hover:bg-purple-500/30 transition-colors"
                >
                  {social.icon}
                </Motion>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {siteNavLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex gap-2 items-center text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <link.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />{" "}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-6">
              Information
            </h3>
            <ul className="space-y-4">
              {query.data?.docs.map((link) => (
                <li key={link.title}>
                  <Link
                    href={`/terms/${link.slug}`}
                    className="flex gap-2 items-center text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    {(() => {
                      const Icon =
                        (Lucide?.[
                          link.icon as keyof typeof Lucide
                        ] as Lucide.LucideIcon) || Lucide.HelpCircle;
                      return Icon ? (
                        <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      ) : null;
                    })()}
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-6">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <p className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-purple-400" />
                contact@sudharshans.me
              </p>
              <p className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-purple-400" />
                TN, India
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Sudharshan S. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
