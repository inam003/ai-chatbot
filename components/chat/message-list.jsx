import { MessageItem } from "./message-item";

export function MessageList({ messages }) {
  return (
    <div className="space-y-6 py-4">
      {messages.map((message, index) => (
        <MessageItem
          key={message.id}
          role={message.role}
          content={message.content}
          attachment={message.attachment}
          isLastMessage={index === messages.length - 1}
        />
      ))}
    </div>
  );
}
