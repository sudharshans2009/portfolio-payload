"use client";

import { cn } from "@/lib/utils";
import React from "react";
import RawCountUp from "react-countup";

export default function CountUp({
  number,
  color,
  symbol,
}: {
  number: number;
  color: string;
  symbol: string;
}) {
  return (
    <span
      className={cn(
        "text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
        color,
      )}
    >
      <RawCountUp preserveValue redraw={false} end={number} />
      {symbol}
    </span>
  );
}
