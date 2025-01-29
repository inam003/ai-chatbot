import { Card } from "@/components/ui/card";

export function MessageItem({ role, content, attachment }) {
  return (
    <div
      className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}
    >
      <Card
        className={`w-auto max-w-2xl p-4 ${
          role === "user"
            ? "bg-blue-500 dark:bg-gray-800 text-white"
            : "bg-gray-200 dark:bg-white dark:text-black text-gray-800"
        }`}
      >
        <p>{content}</p>
      </Card>
    </div>
  );
}
