"use client";

import { Message } from "@/payload-types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { PaginatedDocs } from "payload";
import { stringify } from "qs-esm";

export default function UnreadReplys({ ip }: { ip: string }) {
  const params = stringify({
    where: {
      ip: {
        equals: ip,
      },
    },
  });
  const query = useQuery<PaginatedDocs<Message>>({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await fetch(`/api/messages?${params}`);
      if (!res.ok) throw new Error("Failed to fetch unread messages");
      return res.json();
    },
    refetchInterval: 10000,
  });
  const unreadReplys = query.data?.docs.filter(
    (message) => message.type === "reply" && message.read === false,
  ).length;

  return unreadReplys ? (
    <Link
      href="/contact#message"
      className="fixed w-12 h-12 z-20 flex items-center justify-center bottom-24 right-4 p-2 rounded-full bg-red-950 border border-red-500 text-red-500"
    >
      <span className="font-medium">
        {unreadReplys > 9 ? "9+" : unreadReplys}
      </span>
    </Link>
  ) : null;
}
