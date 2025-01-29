import { MessageList } from "@/components/chat/message-list";
import { ChatInput } from "@/components/chat/chat-input";

const ChatPage = () => {
  const chatMessages = [
    { id: 1, role: "user", content: "Can you explain what Generative AI is?" },
    {
      id: 2,
      role: "assistant",
      content:
        "Generative AI creates new content (text, images, music) by learning patterns from existing data. Examples include GPT for text and DALL·E for images.",
    },
    { id: 3, role: "user", content: "How does it actually work?" },
    {
      id: 4,
      role: "assistant",
      content:
        "It uses neural networks to analyze data, learn patterns, and generate new content. For instance, GPT predicts text, and GANs create visuals.",
    },
    {
      id: 5,
      role: "user",
      content: "What are some practical uses of Generative AI?",
    },
    {
      id: 6,
      role: "assistant",
      content:
        "Applications include content creation, design, drug discovery, entertainment, and personalized education.",
    },
    {
      id: 7,
      role: "user",
      content: "Are there any challenges with using Generative AI?",
    },
    {
      id: 8,
      role: "assistant",
      content:
        "Challenges include bias in data, inaccurate outputs, misuse (e.g., deepfakes), and ethical concerns like copyright issues.",
    },
    { id: 9, role: "user", content: "What’s the future of Generative AI?" },
    {
      id: 10,
      role: "assistant",
      content:
        "The future involves personalized experiences, creative advancements, scientific innovation, and frameworks for ethical use.",
    },
  ];

  return (
    <div className="flex flex-col max-w-2xl">
      <div className="flex-grow overflow-hidden">
        <MessageList messages={chatMessages} />
      </div>
      <div className="fixed bottom-0">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatPage;
