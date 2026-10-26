import { useState } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
import sendMessage from "../features/sendMessage";
import { useSelector, useDispatch } from "react-redux";
import { createConversation } from "../features/createConversation";
import {
  addConversation,
  setConversationTitle,
  setSelectedConversation,
} from "../redux/conversationSlice";
import { addMessage, setLoading } from "../redux/messageSlice";
import { updateConversation } from "../features/updateConversation";

function ChatInput() {
  const [input, setInput] = useState("");
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  const handleSendMessage = async () => {
    const promptText = input.trim();
    if (!promptText) return;
    let conversation = selectedConversation;

    // 1. Create a new conversation if none is selected
    if (!conversation) {
      try {
        const conv = await createConversation();
        dispatch(addConversation(conv));
        dispatch(setSelectedConversation(conv));
        conversation = conv;
      } catch (error) {
        console.error("Failed to create conversation:", error);
        return;
      }
    }

    // 2. Update the title if the conversation is still "New Chat"
    if (conversation.title === "New Chat") {
      try {
        await updateConversation({ id: conversation?._id, title: promptText });
        dispatch(
          setConversationTitle({
            conversationId: conversation?._id,
            title: promptText,
          }),
        );
      } catch (error) {
        console.error("Failed to update conversation title:", error);
      }
    }

    // 3. Prepare payload
    const payload = {
      prompt: promptText,
      conversationId: conversation?._id,
    };

    const userMsg = {
      _id: Date.now().toString() + "user",
      role: "user",
      content: promptText,
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage(userMsg));
    dispatch(setLoading(true));
    setInput("");

    // 4. Send to backend and handle AI response
    try {
      const data = await sendMessage(payload);
      if (data) {
        const aiMsg = {
          _id: Date.now().toString() + "ai",
          role: "assistant",
          content: data,
          createdAt: new Date().toISOString(),
        };
        dispatch(addMessage(aiMsg));
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="px-4 sm:px-6 pb-5 pt-2 shrink-0">
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-[#13131D] border border-[#272735] rounded-2xl focus-within:border-[#8B5CF6] focus-within:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            rows={1}
            className="w-full bg-transparent text-[#F4F4F5] placeholder-[#9292A5] text-[14.5px] px-4 pt-3.5 pb-12 resize-none outline-none max-h-40 scrollbar-thin scrollbar-thumb-[#272735]"
            style={{ minHeight: "56px" }}
          />

          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                className="p-2 rounded-lg text-[#9292A5] hover:text-[#A78BFA] hover:bg-[#09090F] transition-colors"
                title="Attach"
              >
                <Paperclip size={17} />
              </button>
              <button
                className="p-2 rounded-lg text-[#9292A5] hover:text-[#A78BFA] hover:bg-[#09090F] transition-colors"
                title="Voice"
              >
                <Mic size={17} />
              </button>
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all ${
                input.trim()
                  ? "bg-[#8B5CF6] text-white hover:bg-[#7c4ff0] shadow-[0_0_16px_rgba(139,92,246,0.5)]"
                  : "bg-[#13131D] text-[#9292A5] border border-[#272735] cursor-not-allowed"
              }`}
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-[#9292A5] mt-2">
          NivanAI can make mistakes. Verify important info.
        </p>
      </div>
    </div>
  );
}

export default ChatInput;
