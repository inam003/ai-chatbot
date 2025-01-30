"use client";

import { useEffect, useState } from "react";
import { MessageList } from "@/components/chat/message-list";
import { ChatInput } from "@/components/chat/chat-input";
import supabase from "@/lib/supabaseClient";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/utils";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY
);

const ChatPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", id)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`messages:${id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${id}`,
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [id]);

  const handleSendMessage = async (content, attachment = null) => {
    try {
      const { data: userMessage, error: userError } = await supabase
        .from("messages")
        .insert({
          chat_id: id,
          role: "user",
          content,
          attachment,
          created_at: formatDate(new Date()),
        })
        .select()
        .single();

      if (userError) throw userError;

      setMessages((prev) => [...prev, userMessage]);

      // Get AI response
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(content);
      const response = await result.response;
      const aiResponse = response.text();

      // Insert AI response
      const { data: aiMessage, error: aiError } = await supabase
        .from("messages")
        .insert({
          chat_id: id,
          role: "assistant",
          content: aiResponse,
          created_at: formatDate(new Date()),
        })
        .select()
        .single();

      if (aiError) throw aiError;

      // Update UI with AI response
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!messages?.length) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-2">
            <p className="text-lg text-muted-foreground">No messages yet</p>
            <p className="text-sm text-muted-foreground">
              Send a message to start the conversation
            </p>
          </div>
        </main>
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-3xl mx-auto">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4">
          <MessageList messages={messages} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
