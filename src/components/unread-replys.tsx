"use client";

import { useHydrate } from "@/hooks/use-hydrate";
import { Message } from "@/payload-types";
import { EmailAddress } from "@clerk/nextjs/server";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PaginatedDocs } from "payload";
import { stringify } from "qs-esm";

export default function UnreadReplys({
  email,
}: {
  email: EmailAddress["emailAddress"] | null | undefined;
}) {
  const pathname = useHydrate<string>(usePathname, ["/"], ({ fn }) => [fn]);
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
      const res = await fetch(`/api/messages?${params}`);
      if (!res.ok) throw new Error("Failed to fetch unread messages");
      return res.json();
    },
    refetchInterval: 1000 * 60 * 5,
  });
  const unreadReplys = query.data?.docs.filter(
    (message) => message.type === "reply" && message.read === false,
  ).length;

  return pathname !== "/" && pathname !== "/contact" && unreadReplys ? (
    <Link
      href="/contact#message"
      className="fixed w-12 h-12 z-20 flex items-center justify-center bottom-4 right-4 p-2 rounded-full bg-red-950 border border-red-500 text-red-500"
    >
      <span className="font-medium">
        {unreadReplys > 9 ? "9+" : unreadReplys}
      </span>
    </Link>
  ) : null;
}

export function UnreadReplysBadge({
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
    <div className="absolute w-4 h-4 z-20 flex items-center justify-center -top-2 -right-2 p-2 rounded-full bg-red-950 border border-red-500 text-red-500"></div>
  ) : null;
}
