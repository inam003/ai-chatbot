import { Card } from "@/components/ui/card";

export function MessageItem({ role, content, attachment }) {
  return (
    <div
      className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}
    >
      <Card
        className={`w-full max-w-lg p-4 ${
          role === "user"
            ? "bg-blue-500 dark:bg-gray-800 text-white"
            : "bg-gray-200 dark:bg-white dark:text-black text-gray-800"
        }`}
      >
        <p>{content}</p>
        {attachment && (
          <div className="text-xs mt-1">Attachment: {attachment}</div>
        )}
      </Card>
    </div>
  );
}
