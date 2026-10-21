import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "./Message.jsx";
import NivanIcon from "../../public/NivanIcon.jsx";

function MessageSection() {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { messages, isLoading } = useSelector((state) => state.message);
  const { userData } = useSelector((state) => state.user);

  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, isLoading]);

  const isEmpty = !messages || messages.length === 0 || !selectedConversation;

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 py-6 scrollbar-thin scrollbar-thumb-[#272735]"
    >
      <div className="max-w-3xl mx-auto h-full flex flex-col min-w-0">
        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center mt-10 sm:mt-0 pb-20">
            <div className="mb-6 shadow-[0_0_30px_rgba(139,92,246,0.15)] rounded-2xl">
              <NivanIcon size={64} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#F4F4F5] mb-2 tracking-tight">
              {userData?.name
                ? `Hello ${userData.name}, how can I help you today?`
                : "How can I help you today?"}
            </h2>
            <p className="text-[#9292A5] text-sm max-w-sm">
              Ask me to write code, explain a concept, or help you debug an
              issue.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((m) => (
              <Message
                key={m._id || m.id}
                role={m.role}
                content={m.content}
                createdAt={m.createdAt}
              />
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start w-full">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 bg-[#13131D] border border-[#8B5CF6]/30 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]">
                  <NivanIcon size={20} />
                </div>
                <div className="bg-[#13131D] border border-[#272735] rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-bounce"
                        style={{ animationDelay: `${d}ms` }}
                      />
                    ))}
                  </div>
                  <span className="text-[13px] text-[#9292A5] font-medium animate-pulse">
                    NivanAI is thinking...
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageSection;
