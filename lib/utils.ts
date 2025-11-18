import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ✅ Correctly typed version
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
