import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(err: any): string {
  if (err?.response?.data?.message) return err.response.data.message
  if (err?.message) return err.message
  return 'Ooops! Something went wrong.'
}