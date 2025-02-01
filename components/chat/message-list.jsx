import { MessageItem } from "./message-item";
import { useEffect, useRef } from "react";

export function MessageList({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="space-y-6 py-4 overflow-y-auto h-full"
      id="messages-container"
    >
      {messages.map((message, index) => (
        <MessageItem
          key={message.id}
          role={message.role}
          content={message.content}
          attachment={message.attachment}
          isLastMessage={index === messages.length - 1}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
