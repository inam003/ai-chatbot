"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import supabase from "@/lib/supabaseClient";
import { useState } from "react";
import toast from "react-hot-toast";
import { formatDate, generateChatId } from "@/lib/utils";
import { UpdateChatName } from "./update-chat-name";

export default function CreateChat() {
  const { open } = useSidebar();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateChat = async (chatName) => {
    const chatId = generateChatId();
    console.log(chatId);
    const createdAt = formatDate(new Date());

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("chats")
        .insert({
          chat_id: chatId,
          created_at: createdAt,
          name: chatName,
        })
        .select();

      console.log(data[0]);

      if (error) throw error;

      toast.success("Chat created successfully");
      setIsOpen(false);
      router.push(`/chat/${data[0].chat_id}`);
    } catch (error) {
      console.error("Error creating chat:", error);
      toast.error("Error creating chat");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div className="flex aspect-square cursor-pointer size-8 w-full items-center justify-center rounded-lg bg-blue-700 hover:bg-blue-600 gap-2 text-sm text-white">
              <Plus className="size-4" />
              {open ? "New Chat" : ""}
            </div>
          </DialogTrigger>
          <UpdateChatName
            open={isOpen}
            onOpenChange={setIsOpen}
            onSubmit={handleCreateChat}
            isLoading={isLoading}
          />
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
