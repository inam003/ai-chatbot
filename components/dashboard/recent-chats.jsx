import { Card, CardContent } from "@/components/ui/card";
import ChatCard from "./chat-card";

const recentChats = [
  {
    id: "1",
    name: "Random",
    message: "Generating random ideas about any topic or subject.",
  },
  { id: "2", name: "GenAi", message: "AI-powered responses at your service!" },
  {
    id: "3",
    name: "Learning Web Development",
    message: "Exploring React and Next.js!",
  },
  {
    id: "4",
    name: "Blog Post Generator",
    message: "Crafting engaging articles...",
  },
  { id: "5", name: "Research", message: "Diving deep into data analysis!" },
  { id: 6, name: "Code Debugger", message: "Finding and fixing bugs..." },
  { id: 7, name: "Task Manager", message: "Keeping track of your progress!" },
  { id: 8, name: "UI/UX Design", message: "Enhancing user experience..." },
  { id: 9, name: "Tech News", message: "Bringing you the latest trends!" },
];

export default function RecentChats() {
  return (
    <div className="w-full max-w-4xl">
      <CardContent className="pl-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recentChats.map((chat) => (
            <ChatCard key={chat.id} name={chat.name} message={chat.message} />
          ))}
        </div>
      </CardContent>
    </div>
  );
}
