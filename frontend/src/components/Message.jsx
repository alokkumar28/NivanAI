import { useState } from "react";
import {
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Check,
  User,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import NivanIcon from "../../public/NivanIcon";

function Message({ role, content, createdAt }) {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
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
          <div
            // ✅ ADDED overflow-hidden here to clip anything that tries to break out
            className={`px-4 py-3 rounded-2xl text-[14.5px] leading-relaxed break-words overflow-hidden ${
              isUser
                ? "bg-[#8B5CF6] text-white rounded-tr-md shadow-[0_0_20px_rgba(139,92,246,0.25)]"
                : "bg-[#13131D] border border-[#272735] text-[#F4F4F5] rounded-tl-md"
            }`}
          >
            <ReactMarkdown
              components={{
                // ✅ Added proper styling for code blocks
                pre: ({ node, ...props }) => (
                  <pre
                    className="my-3 bg-[#09090F] border border-[#272735] rounded-lg p-3 overflow-x-auto text-[13px] leading-relaxed max-w-full"
                    {...props}
                  />
                ),
                // ✅ Added styling for inline code and block code
                code: ({ node, inline, className, children, ...props }) => {
                  if (inline) {
                    return (
                      <code
                        className="bg-[#09090F] border border-[#272735] text-[#A78BFA] px-1.5 py-0.5 rounded text-[13px] font-mono break-all"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="text-[#A78BFA] font-mono whitespace-pre" {...props}>
                      {children}
                    </code>
                  );
                },
                // ✅ FIXED TABLES: Wrap tables in a scrollable div and allow text wrapping
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto w-full my-4 pb-2">
                    <table
                      className="min-w-full text-left text-[13px] border-collapse border border-[#272735] whitespace-normal"
                      {...props}
                    />
                  </div>
                ),
                th: ({ node, ...props }) => (
                  <th className="border border-[#272735] p-2 bg-[#09090F] font-medium" {...props} />
                ),
                td: ({ node, ...props }) => (
                  <td className="border border-[#272735] p-2" {...props} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

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
                <button
                  className="p-1.5 rounded-md text-[#9292A5] hover:text-[#A78BFA] hover:bg-[#13131D] transition-colors"
                  title="Regenerate"
                >
                  <RefreshCw size={13} />
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