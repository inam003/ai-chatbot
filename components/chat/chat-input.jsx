"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PaperclipIcon, SendIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

export function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && !attachment) return;

    setIsLoading(true);
    try {
      await onSendMessage(message, attachment);
      setMessage("");
      setAttachment(null);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // You can add file type validation here
      setAttachment(file);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="relative flex items-center">
        <Textarea
          placeholder="Type a message..."
          className={cn(
            "min-h-[48px] w-full resize-none rounded-full bg-muted px-4 py-3 text-sm focus-visible:ring-1",
            attachment && "pr-24"
          )}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={1}
        />
        <div className="absolute right-1 flex items-center gap-2">
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            aria-label="Attach file"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 rounded-full"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            <PaperclipIcon className="size-5 text-muted-foreground" />
          </Button>
          <Button
            type="submit"
            size="icon"
            className={cn(
              "size-9 rounded-full bg-blue-700 hover:bg-blue-600",
              !message.trim() && !attachment && "opacity-50"
            )}
            disabled={isLoading || (!message.trim() && !attachment)}
          >
            <SendIcon className="size-5" />
          </Button>
        </div>
      </div>
      {attachment && (
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <PaperclipIcon className="size-3.5" />
            <span>{attachment.name}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-auto px-1.5 py-0.5 text-xs"
            onClick={() => setAttachment(null)}
          >
            Remove
          </Button>
        </div>
      )}
    </form>
  );
}
