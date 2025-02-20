import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidJson = (str: string) => {
  try {
    const obj = JSON.parse(str);
    return typeof obj === 'object';
  } catch (error) {
    return false;
  }
}