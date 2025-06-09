import Motion from "@/components/motion";
import { socialLinks, stack } from "@/constants";
import { Clipboard, Sparkles } from "lucide-react";
import Image from "next/image";
import {
  ContactForm,
  CopyButton,
  InitialMessages,
  ReplyMessages,
} from "./_client";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { currentUser } from "@clerk/nextjs/server";
import {
  BackgroundHigh,
  BackgroundLow,
  HeroBackground,
} from "@/components/background";
import { Projects } from "@/schemas/Projects";
import { ProjectsHero } from "@/components/project-card";
import { FullstackDev, Intro } from "@/components/hero";

export const metadata: Metadata = generateMetadata(
  "https://sudharshans.me/contact",
  "SS.me - Contact",
);

export default async function ContactPage() {
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
                  <CopyButton
                    icon={<Clipboard className="w-4 h-4" />}
                    clipboardText="contact@sudharshans.me"
                  >
                    contact@sudharshans.me
                  </CopyButton>
                  <div className="flex items-center justify-center gap-4">
                    {socialLinks.map((social) => (
                      <Motion
                        element="a"
                        key={social.name}
                        href={social.url}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 w-14 aspect-square flex items-center justify-center rounded-lg bg-purple-800/10 text-purple-500 hover:bg-purple-500/20 dark:hover:bg-purple-500/30 border-purple-500/20 dark:border-purple-500/30 hover:border-purple-500 transition-colors"
                      >
                        {social.icon}
                      </Motion>
                    ))}
                  </div>
                </div>
                <ProjectsHero />
              </Motion>
            </div>
          </div>
        </section>
        <section
          className="w-full pt-24 flex flex-col item-center justify-center"
          id="contact"
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
              <ContactForm email={user?.primaryEmailAddress?.emailAddress} />
            </div>
          </div>
        </section>
        <section
          className="w-full pt-24 flex flex-col item-center justify-center"
          id="messages"
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
                Let&apos;s Collaborate
              </Motion>
              <Motion
                element="p"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-lg text-gray-600 dark:text-gray-300"
              >
                Whether you have a project in mind or just want to say hello,
                feel free to reach out. I&apos;m always open to discussing new
                ideas and opportunities.
              </Motion>
            </div>
            <InitialMessages email={user?.primaryEmailAddress?.emailAddress} />
          </div>
        </section>
        <section
          className="w-full pt-24 pb-12 flex flex-col item-center justify-center"
          id="replys"
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
                My Replies
              </Motion>
              <Motion
                element="p"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-lg text-gray-600 dark:text-gray-300"
              >
                Here is the reply to the messages I received. You can view the
                messages and their status. If you have any questions or
                feedback, feel free to reach out.
              </Motion>
            </div>
            <ReplyMessages email={user?.primaryEmailAddress?.emailAddress} />
          </div>
        </section>
      </div>
    </main>
  );
}
