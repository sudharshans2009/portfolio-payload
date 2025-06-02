"use client";

import Motion from "@/components/motion";
import { cn, wait } from "@/lib/utils";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import {
  AtSign,
  Check,
  Clock,
  Loader,
  MailQuestion,
  PlusCircle,
  UserRound,
} from "lucide-react";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";
import { submitEmail } from "./_action/submitEmail";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formSchema, FormSchema } from "@/forms/submitEmail";
import MessageCard from "@/components/message-card";
import Link from "next/link";
import { PaginatedDocs } from "payload";
import { Message } from "@/payload-types";
import { stringify } from "qs-esm";
import { EmailAddress } from "@clerk/nextjs/server";

interface Props {
  children?: React.ReactNode;
  clipboardText: string;
  className?: string;
  icon?: React.ReactNode;
  [key: string]: unknown;
}

export function CopyButton({
  children,
  clipboardText,
  className,
  icon,
  ...props
}: Props) {
  const [, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(clipboardText).then(() => {
      setIsCopied(true);
      wait(2000).then(() => {
        toast.info("Copied to clipboard", {
          description: `Copied ${clipboardText} to clipboard`,
          duration: 2000,
        });
      });
    });
  };

  return (
    <Motion
      element="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className={cn(
        "group relative h-14 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-purple-500/25",
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <span className="flex items-center justify-center gap-2">
        {isCopied ? <Check className="w-4 h-4" /> : icon}
        {children}
      </span>
    </Motion>
  );
}

export function ContactForm({
  email,
}: {
  email: EmailAddress["emailAddress"] | null | undefined;
}) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: email || "",
      message_content: "",
      ip: "Unknown",
    },
  });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: submitEmail,
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data?.error || "Failed to send message.", {
          id: "form-submit",
        });
        return;
      }

      toast.success("Successfully sent a message!", {
        id: "form-submit",
      });

      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });

      form.reset({
        name: "",
        email: email || "",
        message_content: "",
        ip: "Unknown",
      });
    },
    onError: (error) => {
      toast.error("Failed to send message.", {
        id: "form-submit",
      });
      console.error("Error sending message:", error);
    },
  });

  const onSubmit = useCallback(
    (values: FormSchema) => {
      if (!email) {
        toast.error("You must be logged in to send a message.", {
          id: "form-submit",
        });
        return;
      }
      toast.loading("Sending message...", {
        id: "form-submit",
      });

      mutate(values);
    },
    [mutate, email]
  );

  return (
    <Form {...form}>
      <Motion
        element="form"
        onSubmit={form.handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="h-full flex flex-col gap-6 lg:col-span-2"
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
          Got any questions? Drop me a message!
        </h2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Name</FormLabel>
              <UserRound className="absolute w-8 h-8 top-8.5 left-3 text-purple-600 dark:text-purple-400" />
              <FormControl className="relative">
                <Input
                  type="text"
                  {...field}
                  disabled={isPending}
                  placeholder="Your Name"
                  className="w-full h-14 pl-14 pr-4 py-3 text-lg placeholder:text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Email</FormLabel>
              <AtSign className="absolute w-8 h-8 top-8.5 left-3 text-purple-600 dark:text-purple-400" />
              <FormControl className="relative">
                <Input
                  type="email"
                  {...field}
                  disabled={true}
                  placeholder="Your Email"
                  className="w-full h-14 pl-14 pr-4 py-3 text-lg placeholder:text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message_content"
          render={({ field }) => (
            <FormItem className="relative flex flex-col h-[30%]">
              <FormLabel>Message</FormLabel>
              <MailQuestion className="absolute w-8 h-8 top-8.5 left-3 text-purple-600 dark:text-purple-400" />
              <FormControl className="relative h-32 lg:h-full">
                <Textarea
                  {...field}
                  disabled={isPending}
                  placeholder="Your Message"
                  className="w-full h-full pl-14 pr-4 py-3 text-lg placeholder:text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ip"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl className="">
                <Input
                  type="text"
                  {...field}
                  disabled={isPending}
                  className="hidden"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Motion
          element="button"
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending}
          className={cn(
            "group h-14 relative px-8 py-4 bg-gradient-to-r flex items-center justify-center from-purple-600 to-indigo-600 text-white rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-purple-500/25"
          )}
        >
          {!isPending ? "Submit" : <Loader className="animate-spin" />}
        </Motion>
      </Motion>
    </Form>
  );
}

export function InitialMessages({
  email,
}: {
  email: EmailAddress["emailAddress"] | null | undefined;
}) {
  const params = stringify({
    where: {
      email: {
        equals: email,
      },
    },
  });
  const query = useQuery<PaginatedDocs<Message>>({
    queryKey: ["messages"],
    queryFn: async () => {
      if (!email) return {};
      const res = await fetch(`/api/messages?${params}`);
      if (!res.ok) throw new Error("Failed to fetch messages");
      return res.json();
    },
    refetchInterval: 10000,
  });

  const messages = query.data?.docs.filter(
    (message) => message.type === "initial"
  );

  return (
    <div className="grid gap-8 auto-rows-fr">
      {messages?.map((message, index) => (
        <MessageCard
          message={message}
          index={index}
          key={message.message + message.id}
        />
      ))}
      {messages?.length == 0 && (
        <Link className="h-full" href="#contact">
          <Motion
            element="div"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group h-full relative bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="p-8 h-full flex flex-col gap-4 items-center justify-center">
              <PlusCircle className="w-10 h-10" />
              Send me a message
            </div>
          </Motion>
        </Link>
      )}
      {!messages && (
        <Link className="h-full" href="/account">
          <Motion
            element="div"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group h-full relative bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="p-8 h-full flex flex-col gap-4 items-center justify-center">
              Login to send me a message
            </div>
          </Motion>
        </Link>
      )}
    </div>
  );
}

export function ReplyMessages({
  email,
}: {
  email: EmailAddress["emailAddress"] | null | undefined;
}) {
  const params = stringify({
    where: {
      email: {
        equals: email,
      },
    },
  });
  const query = useQuery<PaginatedDocs<Message>>({
    queryKey: ["messages"],
    queryFn: async () => {
      if (!email) return {};
      const res = await fetch(`/api/messages?${params}`);
      if (!res.ok) throw new Error("Failed to fetch messages");
      return res.json();
    },
    refetchInterval: 10000,
  });

  const messages = query.data?.docs.filter(
    (message) => message.type === "reply"
  );

  return (
    <div className="grid gap-8 auto-rows-fr">
      {messages?.map((message, index) => (
        <MessageCard
          message={message}
          index={index}
          key={message.message + message.id}
        />
      ))}
      {messages?.length === 0 && (
        <Motion
          element="div"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="group h-full relative bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="p-8 h-full flex flex-col gap-4 items-center justify-center">
            <Clock className="w-10 h-10" />
            Please wait for my reply
          </div>
        </Motion>
      )}
      {!messages && (
        <Link className="h-full" href="/account">
          <Motion
            element="div"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group h-full relative bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="p-8 h-full flex flex-col gap-4 items-center justify-center">
              Login to read my replies
            </div>
          </Motion>
        </Link>
      )}
    </div>
  );
}
