import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CircleUser, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

export function MessageItem({ role, content, attachment, isLastMessage }) {
  const isUser = role === "user";
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isUser && isLastMessage) {
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index < content.length) {
          setDisplayedContent((prev) => prev + content.charAt(index));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, 1);

      return () => clearInterval(interval);
    } else {
      setDisplayedContent(content);
    }
  }, [content, isUser, isLastMessage]);

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
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{content}</p>
          ) : (
            <>
              <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:p-0">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-lg font-bold mb-2">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-base font-bold mb-2">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-sm font-bold mb-2">{children}</h3>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-4 space-y-1">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-4 space-y-1">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="marker:text-current">{children}</li>
                    ),
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0">{children}</p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                    code: ({ children }) => (
                      <code className="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5">
                        {children}
                      </code>
                    ),
                  }}
                >
                  {displayedContent}
                </ReactMarkdown>
              </div>
              {isTyping && (
                <div className="flex gap-1 mt-2 h-4">
                  <span className="size-1 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="size-1 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="size-1 bg-current rounded-full animate-bounce" />
                </div>
              )}
            </>
          )}
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
