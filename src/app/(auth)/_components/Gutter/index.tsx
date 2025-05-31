import React from "react";

import classes from "./index.module.scss";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  left?: boolean;
  ref?: React.Ref<HTMLDivElement>;
  right?: boolean;
};

export const Gutter: React.FC<Props & { ref?: React.Ref<HTMLDivElement> }> = (
  props,
) => {
  const { children, className, left = true, right = true, ref } = props;

  return (
    <div
      className={cn(
        classes.gutter,
        left && classes.gutterLeft,
        right && classes.gutterRight,
        className,
      )}
      ref={ref}
    >
      {children}
    </div>
  );
};
