"use client";

import { useEffect, useState } from "react";
import Motion from "@/components/motion";
import ReviewCard from "@/components/review-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Faq, Review, Project } from "@/payload-types";
import RichText from "@/components/rich-text";
import ProjectCard, { ProjectsHero } from "@/components/project-card";
import {
  BackgroundHigh,
  BackgroundLow,
  HeroBackground,
} from "@/components/background";
import { FullstackDev, Intro } from "@/components/hero";
import { useSearch } from "@/hooks/use-search";

export default function ProjectsClientPage({
  projects,
  reviews,
  faqs,
}: {
  projects: Project[];
  reviews: Review[];
  faqs: Faq[];
}) {
  const { filtered, query } = useSearch<Project>(
    projects,
    (project, query) =>
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase()) ||
      project.tags
        ?.map(({ tag }) => tag)
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
                    placeholder="Search for services..."
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
                Projects I have Worked on
              </Motion>
              <Motion
                element="p"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-lg text-gray-600 dark:text-gray-300"
              >
                Here are some of the projects I have worked on.
              </Motion>
            </div>
            <div className="grid gap-8 auto-rows-fr lg:grid-cols-2">
              {filtered.map((project, index) => (
                <ProjectCard
                  project={project}
                  index={index}
                  key={project.title}
                />
              ))}
            </div>
          </div>
        </section>
        <section
          className="w-full pt-24 flex flex-col item-center justify-center"
          id="reviews"
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
                Client Reviews
              </Motion>
              <Motion
                element="p"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-lg text-gray-600 dark:text-gray-300"
              >
                I have worked with many clients and have received positive
                feedback from them. Here are some of the reviews I have
                received.
              </Motion>
            </div>
            <div className="grid gap-8 auto-rows-fr lg:grid-cols-2">
              {reviews.map((review, index) => (
                <ReviewCard review={review} index={index} key={review.name} />
              ))}
            </div>
          </div>
        </section>
        <section
          className="w-full pt-24 pb-12 flex flex-col item-center justify-center"
          id="faqs"
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
                Client Reviews
              </Motion>
              <Motion
                element="p"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-lg text-gray-600 dark:text-gray-300"
              >
                I have worked with many clients and have received positive
                feedback from them. Here are some of the reviews I have
                received.
              </Motion>
            </div>
            <div className="w-full">
              <Accordion
                type="single"
                collapsible
                className="relative flex w-full flex-col items-center justify-center gap-5"
              >
                {faqs.map((faq, index) => (
                  <AccordionItem
                    className="w-full"
                    value={`accord-${index}`}
                    key={faq.question}
                  >
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <RichText
                        data={faq.answer}
                        className="text-gray-600 dark:text-gray-300"
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
