"use client";

import { useEffect, useState } from "react";
import { MessageSquare, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import supabase from "@/lib/supabaseClient";
import Link from "next/link";
import toast from "react-hot-toast";
import { ChatNameDialog } from "./update-chat-name";

export function AllChats() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const [chats, setChats] = useState([]);
  const [isRenaming, setIsRenaming] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchChats = async () => {
    try {
      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching chats:", error);
        return;
      }

      setChats(data || []);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChats();

    const chats = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chats" },
        (payload) => {
          console.log("Change received!", payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(chats);
    };
  }, [router]);

  const handleDeleteChat = async (chatId) => {
    try {
      const { error } = await supabase.from("chats").delete().eq("id", chatId);

      if (error) throw error;

      toast.success("Chat deleted successfully.");
      router.refresh();
      if (pathname === `/chat/${chatId}`) {
        router.push("/chat");
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("Failed to delete chat.");
    }
  };

  const handleRenameClick = (chat) => {
    setSelectedChat(chat);
    setIsRenaming(true);
  };

  const handleRename = async (newName) => {
    if (!selectedChat) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("chats")
        .update({ name: newName })
        .eq("id", selectedChat.id);

      if (error) throw error;

      toast.success("Chat renamed successfully.");
      router.refresh();
      setIsRenaming(false);
      setSelectedChat(null);
    } catch (error) {
      console.error("Error renaming chat:", error);
      toast.error("Failed to rename chat.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
        <SidebarMenu>
          {chats.map((chat) => (
            <SidebarMenuItem key={chat.id}>
              <SidebarMenuButton
                asChild
                className={
                  pathname === `/chat/${chat.chat_id}`
                    ? "bg-sidebar-accent"
                    : ""
                }
              >
                <Link href={`/chat/${chat.chat_id}`}>
                  <MessageSquare className="size-5" />
                  <span>{chat.name}</span>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem onClick={() => handleRenameClick(chat)}>
                    <Pencil className="text-gray-500" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDeleteChat(chat.id)}>
                    <Trash2 className="text-red-500" />
                    <span>Delete Chat</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <ChatNameDialog
        open={isRenaming}
        onOpenChange={(open) => {
          setIsRenaming(open);
          if (!open) setSelectedChat(null);
        }}
        defaultValue={selectedChat?.name || ""}
        onSubmit={handleRename}
        isLoading={isLoading}
        title="Rename Chat"
      />
    </>
  );
}
