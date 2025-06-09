import React from "react";
import Category from "@/components/category";
import CountUp from "@/components/countup";
import Motion from "@/components/motion";
import ProjectCard, { ProjectsHero } from "@/components/project-card";
import { skillCategories, skills, stats } from "@/constants";
import { LinkIcon, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import { generateMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { UnreadReplysBadge } from "@/components/unread-replys";
import { currentUser } from "@clerk/nextjs/server";
import { cache } from "@/lib/cache";
import {
  BackgroundHigh,
  BackgroundLow,
  HeroBackground,
} from "@/components/background";
import { FullstackDev, Intro } from "@/components/hero";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = generateMetadata(
  "https://sudharshans.me",
  "SS.me - Home",
);

const projectsCache = cache(
  async () => {
    const config = await payloadConfig;
    const payload = await getPayload({ config });
    const projects = await payload.find({
      collection: "projects",
      limit: 6,
      sort: "-createdAt",
    });
    return projects.docs;
  },
  ["projects", "/"],
  {
    revalidate: 60 * 60 * 24,
  },
);

export default async function HomePage() {
  const projects = await projectsCache();
  const user = await currentUser();

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
                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                  <Link href="/projects" className="h-14">
                    <Motion
                      element="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={buttonVariants({
                        variant: "primary",
                        size: "base",
                        width: "full",
                      })}
                    >
                      <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative flex items-center justify-center gap-2">
                        View Projects
                        <LinkIcon className="w-4 h-4" />
                      </span>
                    </Motion>
                  </Link>
                  <Link href="/contact" className="h-14">
                    <Motion
                      element="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={buttonVariants({
                        variant: "secondary",
                        size: "base",
                        width: "full",
                      })}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Contact Me
                        <Phone className="w-4 h-4" />
                      </span>
                      <UnreadReplysBadge
                        email={user?.primaryEmailAddress?.emailAddress}
                      />
                    </Motion>
                  </Link>
                </div>
                <ProjectsHero />
              </Motion>
            </div>
          </div>
        </section>
        <section
          className="w-full pt-24 flex flex-col item-center justify-center"
          id="about"
        >
          <BackgroundLow />
          <div className="w-full max-w-7xl mx-auto relative z-10">
            <div className="grid grid-rows-1 lg:grid-cols-3 items-start gap-16">
              <Motion
                element="div"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative mx-auto max-w-sm lg:max-w-full group">
                  <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600">
                    <Image
                      src="/images/me.png"
                      alt="Sudharshan S"
                      width={600}
                      height={700}
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </Motion>
              <Motion
                element="div"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                  About Me
                </h2>
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <p>
                    Hello! I&apos;m Sudharshan, a passionate fullstack developer
                    with a knack for creating dynamic and responsive web
                    applications. I specialize in building user-friendly
                    interfaces and robust backend systems that deliver seamless
                    experiences.
                  </p>
                  <p>
                    Based in India, I have a strong background in web
                    development, with expertise in technologies like React,
                    Next.js, Node.js, and MongoDB. I love turning complex
                    problems into simple, beautiful, and intuitive designs.
                  </p>
                  <p>
                    When I&apos;m not coding, I explore new technologies and
                    frameworks, contribute to open-source projects, and engage
                    with the developer community. I believe in continuous
                    learning and always strive to stay updated with the latest
                    trends in the tech world.
                  </p>
                </div>
                <div className="mt-12">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
                    Technologies I Work With
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <Motion
                        element="span"
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-white dark:bg-gray-800 ring-1 ring-purple-500/20 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:ring-purple-500/40 shadow-sm hover:shadow transition-all duration-300"
                      >
                        {skill}
                      </Motion>
                    ))}
                  </div>
                </div>
              </Motion>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-12">
              {stats.map((stat) => (
                <Motion
                  element="div"
                  key={stat.label}
                  whileHover={{ y: -5 }}
                  className="p-4 rounded-lg bg-white dark:bg-gray-800 ring-1 ring-gray-200/50 dark:ring-gray-800/50 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <CountUp
                    number={stat.number}
                    color={stat.color}
                    symbol={stat.symbol}
                  ></CountUp>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </Motion>
              ))}
            </div>
          </div>
        </section>
        <section
          className="w-full pt-24 flex flex-col item-center justify-center"
          id="skills"
        >
          <BackgroundHigh />
          <div className="w-full max-w-7xl mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <Motion
                element="h2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400"
              >
                Technical Expertise
              </Motion>
              <Motion
                element="p"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-lg text-gray-600 dark:text-gray-300"
              >
                A showcase of my technical skills and proficiency levels across
                different domains
              </Motion>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {skillCategories.map((category, categoryIndex) => (
                <Category
                  key={category.title}
                  category={category}
                  categoryIndex={categoryIndex}
                />
              ))}
            </div>
          </div>
        </section>
        <section
          className="w-full pt-24 pb-12 flex flex-col item-center justify-center"
          id="projects"
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
                Featured Projects
              </Motion>
              <Motion
                element="p"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-lg text-gray-600 dark:text-gray-300"
              >
                Showcasing some of my recent work and passion projects
              </Motion>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectCard
                  project={project}
                  index={index}
                  key={project.title}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
