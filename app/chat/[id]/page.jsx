"use client";

import { useEffect, useState, useRef } from "react";
import { MessageList } from "@/components/chat/message-list";
import { ChatInput } from "@/components/chat/chat-input";
import supabase from "@/lib/supabaseClient";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { SidebarInset } from "@/components/ui/sidebar";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY
);

const ChatPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesRef = useRef(new Set()); // To track message IDs we've already seen

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

      // Update our messages cache with new IDs
      data?.forEach((msg) => messagesRef.current.add(msg.id));
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset messages when chat ID changes
  useEffect(() => {
    messagesRef.current.clear(); // Clear message cache
    setMessages([]); // Clear messages
    setIsLoading(true); // Reset loading state
    fetchMessages(); // Fetch messages for new chat

    // Subscribe to NEW messages
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
        (payload) => {
          const newMessage = payload.new;
          // Only add message if we haven't seen it before
          if (!messagesRef.current.has(newMessage.id)) {
            messagesRef.current.add(newMessage.id);
            setMessages((prev) => [...prev, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]); // Only re-run when chat ID changes

  const handleSendMessage = async (content, attachment = null) => {
    try {
      // Add user message
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

      // Only add message if we haven't seen it before
      if (!messagesRef.current.has(userMessage.id)) {
        messagesRef.current.add(userMessage.id);
        setMessages((prev) => [...prev, userMessage]);
      }

      // Add temporary loading message
      const loadingMessage = {
        id: "loading",
        role: "assistant",
        content: "●●●",
        attachment,
        created_at: formatDate(new Date()),
      };
      setMessages((prev) => [...prev, loadingMessage]);

      // Get AI response
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const formattedPrompt = `Please provide your response in markdown format with:
- Use "**" for bold headings
- Proper bullet points or numbered lists where applicable
- Clear section breaks where needed
- Highlight key terms with bold or italics where appropriate

Here's the user's question: ${content}`;
      const result = await model.generateContent(formattedPrompt);
      const response = await result.response;
      const aiResponse = response.text();

      // Remove loading message
      setMessages((prev) => prev.filter((msg) => msg.id !== "loading"));

      // Insert AI response to database
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

      // Only add AI message if we haven't seen it before
      if (!messagesRef.current.has(aiMessage.id)) {
        messagesRef.current.add(aiMessage.id);
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove loading message in case of error
      setMessages((prev) => prev.filter((msg) => msg.id !== "loading"));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center bg-background">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!messages?.length) {
    return (
      <div className="flex flex-col bg-background">
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
