import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export interface CheckoutConfirmPageProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
