import { useRef, useEffect } from "react";
import { MessageItem } from "./message-item";

export function MessageList({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex-grow overflow-y-auto w-full p-4 space-y-4">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          role={message.role}
          content={message.content}
          attachment={message.attachment}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
