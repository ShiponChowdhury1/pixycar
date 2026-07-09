import { SendHorizontal } from "lucide-react";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
};

export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-[#E5E7EB] bg-white px-4 py-3">
      <div className="mx-auto flex max-w-4xl items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="min-w-0 flex-1 rounded-full border border-[#E5E7EB] bg-white px-4 py-2.5 font-navbar text-sm text-[#1E1E1E] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFA51F] focus:ring-2 focus:ring-[#FFA51F]/20 sm:text-base"
          aria-label="Message"
        />
        <button
          type="button"
          onClick={onSend}
          className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#FFA51F] text-white shadow-sm transition hover:bg-[#e8940f]"
          aria-label="Send message"
        >
          <SendHorizontal className="size-5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
