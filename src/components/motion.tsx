"use client";

import { motion, MotionProps } from "framer-motion";
import React from "react";

type Props = MotionProps &
  React.HTMLProps<HTMLElement> & {
    children?: React.ReactNode;
    element: any;
  };

export default function Motion({
  children,
  className,
  element = "div",
  ...props
}: Props) {
  const MotionComponent =
    typeof element === "string"
      ? motion[element as keyof typeof motion]
      : motion.create(element);
  return (
    <MotionComponent className={className} {...props}>
      {children}
    </MotionComponent>
  );
}
