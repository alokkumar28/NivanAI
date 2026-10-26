import { useState } from "react";
import { Copy, ThumbsUp, ThumbsDown, Check, User } from "lucide-react";
import Markdown from "react-markdown";
import NivanIcon from "../../public/NivanIcon";

function Message({ role, content, createdAt }) {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  // 1. Safely extract the string. If content is an object (like {response: "..."}), extract it.
  let displayContent = "";
  if (typeof content === "string") {
    displayContent = content;
  } else if (content && typeof content === "object") {
    displayContent =
      content.response ||
      content.text ||
      content.message ||
      JSON.stringify(content);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(displayContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`flex gap-3 w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex gap-3 max-w-[85%] sm:max-w-[75%] min-w-0 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 ${
            isUser
              ? "bg-[#13131D] border border-[#272735] text-[#9292A5]"
              : "bg-[#13131D] border border-[#8B5CF6]/30 shadow-[0_0_12px_rgba(139,92,246,0.4)]"
          }`}
        >
          {isUser ? <User size={15} /> : <NivanIcon size={20} />}
        </div>

        <div
          className={`flex flex-col min-w-0 ${isUser ? "items-end" : "items-start"}`}
        >
          {/* Message Bubble */}
          <div
            className={`px-4 py-3 rounded-2xl text-[14.5px] leading-relaxed wrap-break-wordbreak-word overflow-hidden ${
              isUser
                ? "bg-[#8B5CF6] text-white rounded-tr-md shadow-[0_0_20px_rgba(139,92,246,0.25)]"
                : "bg-[#13131D] border border-[#272735] text-[#F4F4F5] rounded-tl-md"
            }`}
          >
            {/* 2. Pass the safe string */}
            <Markdown>{displayContent}</Markdown>
          </div>

          {/* Footer actions */}
          <div
            className={`flex items-center gap-1 mt-1.5 px-1 ${isUser ? "flex-row-reverse" : "flex-row"}`}
          >
            <span className="text-[11px] text-[#9292A5]">
              {createdAt
                ? new Date(createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </span>

            {!isUser && (
              <>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-md text-[#9292A5] hover:text-[#A78BFA] hover:bg-[#13131D] transition-colors"
                  title="Copy"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                </button>
                <button
                  className="p-1.5 rounded-md text-[#9292A5] hover:text-[#A78BFA] hover:bg-[#13131D] transition-colors"
                  title="Good"
                >
                  <ThumbsUp size={13} />
                </button>
                <button
                  className="p-1.5 rounded-md text-[#9292A5] hover:text-[#A78BFA] hover:bg-[#13131D] transition-colors"
                  title="Bad"
                >
                  <ThumbsDown size={13} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
