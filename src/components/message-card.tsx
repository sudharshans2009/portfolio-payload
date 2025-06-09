"use client";

import { Check, Clock, MessageSquareWarning, Sparkles } from "lucide-react";
import Motion from "./motion";
import { Message } from "@/payload-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function MessageCard({
  message,
  index,
}: {
  message: Message;
  index: number;
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      toast.loading("Marking message as read...", {
        id: "mark-as-read",
      });
      const response = await fetch(`/contact/mark-as-read?id=${message.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark message as read.");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Message marked as read!", {
        id: "mark-as-read",
      });

      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },
    onError: () => {
      toast.error("Failed to mark message as read.", {
        id: "mark-as-read",
      });
    },
  });

  return (
    <Motion
      element="div"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group p-8 relative flex flex-col gap-4 bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
    >
      {message.type === "initial" ? (
        message.read ? (
          <div className="absolute top-4 right-4 p-2 rounded-full bg-green-500/10 text-green-500">
            <Sparkles className="w-6 h-6" />
          </div>
        ) : (
          <div className="absolute top-4 right-4 p-2 rounded-full bg-red-500/10 text-red-500">
            <Clock className="w-6 h-6" />
          </div>
        )
      ) : message.read ? (
        <div className="absolute top-4 right-4 p-2 rounded-full bg-violet-500/10 text-violet-500">
          <Check className="w-6 h-6" />
        </div>
      ) : (
        <button
          onClick={() => mutate()}
          disabled={isPending}
          className="absolute flex gap-2 top-4 right-4 p-2 rounded-full bg-violet-500/10 text-violet-500 hover:bg-violet-500/20 transition"
        >
          {isPending ? "Marking..." : "Mark as Read"}
          <MessageSquareWarning className="w-6 h-6" />
        </button>
      )}
      <div>
        {new Date(message.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {message.name}
        </h1>
      </div>
      <div>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {message.message}
        </p>
      </div>
    </Motion>
  );
}
