"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({});

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="right" />
    </QueryClientProvider>
  );
}
