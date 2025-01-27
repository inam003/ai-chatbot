"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { MessageList } from "@/components/chat/message-list";
import { ChatInput } from "@/components/chat/chat-input";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: "user", content: "Can you tell me about React?" },
    { id: 2, role: "assistant", content: "Hello! How can I assist you today?" },
    {
      id: 3,
      role: "assistant",
      content:
        "React is a popular JavaScript library for building user interfaces. It was developed by Facebook and is widely used for creating interactive, efficient, and reusable UI components. React uses a virtual DOM (Document Object Model) to improve performance by minimizing direct manipulation of the actual DOM. It also introduces JSX, a syntax extension that allows you to write HTML-like code within JavaScript.",
    },
    {
      id: 4,
      role: "user",
      content:
        "React is a popular JavaScript library for building user interfaces. It was developed by Facebook and is widely used for creating interactive, efficient, and reusable UI components. React uses a virtual DOM (Document Object Model) to improve performance by minimizing direct manipulation of the actual DOM. It also introduces JSX, a syntax extension that allows you to write HTML-like code within JavaScript.",
    },
    {
      id: 5,
      role: "assistant",
      content:
        "React is a popular JavaScript library for building user interfaces. It was developed by Facebook and is widely used for creating interactive, efficient, and reusable UI components. React uses a virtual DOM (Document Object Model) to improve performance by minimizing direct manipulation of the actual DOM. It also introduces JSX, a syntax extension that allows you to write HTML-like code within JavaScript.",
    },
  ]);

  const handleSendMessage = (content, file) => {
    const newMessage = {
      id: messages.length + 1,
      role: "user",
      content: content,
      attachment: file ? file.name : null,
    };
    setMessages([...messages, newMessage]);

    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: "assistant",
        content:
          "This is a mock AI response. In a real application, this would be the response from your AI model.",
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }, 1000);
  };
  return (
    <div className="flex flex-col h-full w-full px-32">
      <Card className="flex-grow overflow-hidden flex flex-col m-2 border-none shadow-none">
        <MessageList messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </Card>
    </div>
  );
};

export default ChatInterface;
