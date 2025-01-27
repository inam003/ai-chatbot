import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PaperclipIcon, SendIcon } from "lucide-react";

export function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileClear = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() || file) {
      onSendMessage(input, file);
      setInput("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaRef]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 fixed bottom-0 left-96 right-32"
    >
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          className="pr-24 resize-none rounded-xl overflow-hidden bg-gray-200
 dark:bg-[#2f2f2f] text-black dark:text-white"
          rows={1}
        />
        <div className="absolute right-2 bottom-2 flex space-x-2">
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
            aria-label="Attach file"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => fileInputRef.current?.click()}
          >
            <PaperclipIcon className="h-5 w-5" />
          </Button>
          <Button
            type="submit"
            size="icon"
            className="h-8 w-8 bg-blue-500 hover:bg-blue-600"
            disabled={!input.trim() && !file}
          >
            <SendIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {file && (
        <div className="mt-2 text-sm text-gray-500 flex items-center justify-between">
          <span className="truncate max-w-[calc(100%-4rem)]">{file.name}</span>
          <Button variant="ghost" size="sm" onClick={handleFileClear}>
            Clear
          </Button>
        </div>
      )}
    </form>
  );
}
