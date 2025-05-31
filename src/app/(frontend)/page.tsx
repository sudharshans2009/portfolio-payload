import React from "react";
import Category from "@/components/category";
import CountUp from "@/components/countup";
import Motion from "@/components/motion";
import ProjectCard from "@/components/project-card";
import { skillCategories, skills, stack, stats } from "@/constants";
import { Link, Phone, Sparkles } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import { generateMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { UnreadReplysBadge } from "@/components/unread-replys";
import { headers } from "next/headers";

export const metadata: Metadata = generateMetadata(
  "https://sudharshans.me",
  "SS.live - Home",
);

export default async function HomePage() {
  const config = await payloadConfig;
  const payload = await getPayload({ config });
  const projects = await payload.find({
    collection: "projects",
    sort: "-createdAt",
    limit: 6,
  });
  const request = await headers();
  const { user } = await payload.auth({ headers: request });

  return (
    <main className="relative flex min-h-screen flex-col items-center z-10">
      <div className="flex flex-col items-center justify-center w-full max-w-7xl px-4 mx-auto">
        <section
          className="relative w-full pt-28 flex flex-col item-center justify-center"
          id="home"
        >
          <div className="absolute top-1/3 left-1/4 w-10 h-10 md:w-96 md:h-96 bg-purple-600/5 dark:bg-purple-600/10 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-10 h-10 md:w-80 md:h-80 bg-indigo-600/5 dark:bg-indigo-600/10 rounded-full filter blur-3xl animate-pulse delay-700" />
          <div className="w-full max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col items-center lg:items-start">
              <Motion
                element="div"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-4xl text-center lg:text-left"
              >
                <Motion
                  element="span"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-4 px-4 py-1.5 bg-purple-500/5 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-6"
                >
                  <span>
                    <Sparkles className="w-4 h-4" />
                  </span>{" "}
                  Fullstack Developer
                </Motion>
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 dark:text-white leading-tight">
                    Hi, I&apos;m{" "}
                    <span className="text-transparent text-nowrap bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                      Sudharshan S
                    </span>
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg lg:text-xl mt-8 mb-10 leading-relaxed max-w-2xl">
                  I am a fullstack developer with a passion for creating
                  beautiful and functional web applications. I am always looking
                  for new challenges and opportunities to learn and grow.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                  <NextLink href="/projects" className="h-14">
                    <Motion
                      element="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group w-full h-14 relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-purple-500/25"
                    >
                      <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative flex items-center justify-center gap-2">
                        View Projects
                        <Link className="w-4 h-4" />
                      </span>
                    </Motion>
                  </NextLink>
                  <NextLink href="/contact" className="h-14">
                    <Motion
                      element="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative w-full h-14 px-8 py-4 bg-transparent border border-purple-500/20 dark:border-purple-500/30 hover:border-purple-500 text-purple-600 dark:text-purple-400 rounded-xl transition-all duration-300 hover:bg-purple-500/5 dark:hover:bg-purple-500/10"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Contact Me
                        <Phone className="w-4 h-4" />
                      </span>
                      <UnreadReplysBadge user={user} />
                    </Motion>
                  </NextLink>
                </div>
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
              </Motion>
            </div>
          </div>
        </section>
        <section
          className="w-full pt-24 flex flex-col item-center justify-center"
          id="about"
        >
          <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-purple-100/20 dark:from-purple-900/20 via-transparent to-transparent" />
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
          <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-purple-100/20 dark:from-purple-900/20 via-transparent to-transparent" />
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
          <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-purple-100/20 dark:from-purple-900/20 via-transparent to-transparent" />
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
              {projects.docs.map((project, index) => (
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
