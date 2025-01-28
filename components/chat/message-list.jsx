import { MessageItem } from "./message-item";

export function MessageList({ messages }) {
  return (
    <div className="p-4 space-y-4">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          role={message.role}
          content={message.content}
          attachment={message.attachment}
        />
      ))}
    </div>
  );
}
