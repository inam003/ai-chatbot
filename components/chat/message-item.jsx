import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CircleUser, Bot } from "lucide-react";

export function MessageItem({ role, content, attachment, isLastMessage }) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 w-full max-w-4xl mx-auto",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
          <Bot className="size-5 text-blue-700 dark:text-blue-400" />
        </div>
      )}

      <div
        className={cn(
          "flex flex-col gap-2 max-w-[80%] min-w-[100px]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <Card
          className={cn(
            "w-fit px-4 py-2.5 rounded-2xl text-sm shadow-sm",
            isUser
              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white dark:from-blue-600 dark:to-blue-700 border-0"
              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
            isLastMessage && "animate-slide-in-up"
          )}
        >
          <p className="whitespace-pre-wrap break-words">{content}</p>
        </Card>

        {attachment && (
          <div
            className={cn(
              "w-fit px-4 py-2 rounded-lg text-xs",
              isUser
                ? "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            )}
          >
            📎 {attachment.name}
          </div>
        )}
      </div>

      {isUser && (
        <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center text-white shadow-sm shrink-0">
          <CircleUser className="size-5" />
        </div>
      )}
    </div>
  );
}
