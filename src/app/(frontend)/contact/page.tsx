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
import { headers } from "next/headers";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";

export const metadata: Metadata = generateMetadata(
  "https://sudharshans.me/contact",
  "SS.me - Contact"
);

export default async function ContactPage() {
  const request = await headers();
  const ip =
    request.get("x-forwarded-for") || request.get("x-real-ip") || "Unknown IP";
  const config = await payloadConfig;
  const payload = await getPayload({ config });
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
          id="contact"
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
              <ContactForm user={user} ip={ip} />
            </div>
          </div>
        </section>
        <section
          className="w-full pt-24 flex flex-col item-center justify-center"
          id="messages"
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
            <InitialMessages user={user} />
          </div>
        </section>
        <section
          className="w-full pt-24 pb-12 flex flex-col item-center justify-center"
          id="replys"
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
            <ReplyMessages user={user} />
          </div>
        </section>
      </div>
    </main>
  );
}
