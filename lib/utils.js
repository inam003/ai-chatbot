import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import supabase from "./supabaseClient";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const generateChatId = () => {
  return Math.random().toString(36).substring(2, 15);
};

export const userSession = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
