import { Media } from "@/payload-types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRandomNumber(
  min: number,
  max: number,
  isFloat?: boolean,
): number {
  if (isFloat) {
    return Math.random() * (max - min) + min;
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export function formatImage(image: number | Media) {
  return typeof image === "number" ? "./images/404.png" : (image.url as string);
}
