import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import supabase from "./supabaseClient";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const userSession = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
