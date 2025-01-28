import { Button } from "@/components/ui/button";
import { PaperclipIcon, SendIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";

export function ChatInput() {
  return (
    <form className="p-6 fixed bottom-0 left-96 right-32">
      <div className="relative">
        <Textarea
          placeholder="Ask a question..."
          className="pr-24 resize-none rounded-xl overflow-hidden bg-slate-100
 dark:bg-[#2f2f2f] text-black dark:text-white"
          rows={1}
        />
        <div className="absolute right-2 bottom-2 flex space-x-2">
          <input type="file" className="hidden" aria-label="Attach file" />
          <Button type="button" variant="ghost" size="icon" className="size-8">
            <PaperclipIcon className="size-5" />
          </Button>
          <Button
            type="submit"
            size="icon"
            className="size-8 bg-blue-500 hover:bg-blue-600"
          >
            <SendIcon className="size-5" />
          </Button>
        </div>
      </div>
    </form>
  );
}
