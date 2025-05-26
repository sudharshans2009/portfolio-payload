"use client";

import { useEffect, useState } from "react";
import Motion from "@/components/motion";
import ReviewCard from "@/components/review-card";
import ServiceCard from "@/components/service-card";
import Image from "next/image";
import { stack } from "@/constants";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Faq, Review, Service } from "@/payload-types";
import RichText from "@/components/rich-text";

export default function ServicesClientPage({
  services,
  reviews,
  faqs,
}: {
  services: Service[];
  reviews: Review[];
  faqs: Faq[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState(services);

  useEffect(() => {
    setFilteredServices(
      services.filter(
        (service) =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          service.tags
            ?.map(({ tag }) => tag)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      ),
    );
  }, [searchQuery, services]);

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
                <div className="relative mt-6 w-full max-w-lg">
                  <Search className="absolute w-8 h-8 top-3 left-3 text-purple-600 dark:text-purple-400" />
                  <Input
                    type="text"
                    placeholder="Search for posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-14 pr-4 py-3 text-lg placeholder:text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
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
          id="blog"
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
              {filteredServices.map((service, index) => (
                <ServiceCard
                  service={service}
                  index={index}
                  key={service.title}
                />
              ))}
            </div>
          </div>
        </section>
        <section
          className="w-full pt-24 flex flex-col item-center justify-center"
          id="articles"
        >
          <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-purple-100/20 dark:from-purple-900/20 via-transparent to-transparent" />{" "}
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
              {reviews.map((review, index) => (
                <ReviewCard review={review} index={index} key={review.name} />
              ))}
            </div>
          </div>
        </section>
        <section
          className="w-full pt-24 pb-12 flex flex-col item-center justify-center"
          id="tips"
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
