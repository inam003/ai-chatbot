"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function RecentChats() {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentChats = async () => {
      try {
        const { data, error } = await supabase
          .from("chats")
          .select()
          .order("created_at", { ascending: false })
          .limit(6);

        console.log(data);

        if (error) throw error;
        setChats(data);
      } catch (error) {
        console.error("Error fetching recent chats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentChats();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (chats.length == 0) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-3">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-lg text-muted-foreground">No chats yet</p>
            <p className="text-sm text-muted-foreground">
              Create a new chat to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto w-96 space-y-3">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/chat/${chat.chat_id}`}
            className="group flex items-center justify-between rounded-lg border p-3 hover:bg-sidebar-accent"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-primary">
                {chat.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
