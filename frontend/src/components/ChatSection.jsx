import Nav from "./Nav";
import MessageSection from "./MessageSection";
import ChatInput from "./ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMessages } from "../features/getMesseges";
import { setMessages } from "../redux/messageSlice";

function ChatSection({ sidebarCollapsed, showArtifact, onToggleArtifact }) {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMesg = async () => {
      if (selectedConversation) {
        try {
          const data = await getMessages(selectedConversation?._id);
          const messageArray = data?.messages || [];
          dispatch(setMessages(messageArray));
        } catch (error) {
          console.error("Failed to fetch messages", error);
        }
      } else {
        dispatch(setMessages([]));
      }
    };

    getMesg();
  }, [selectedConversation, dispatch]);

  return (
    <div
      className={`
        flex-1 flex flex-col h-full min-w-0 bg-[#09090F] relative 
        transition-all duration-300 ease-in-out
        
        ${sidebarCollapsed ? "lg:pl-17" : "lg:pl-65"}
        
        ${showArtifact ? "xl:pr-120 2xl:pr-140" : "xl:pr-0"}
      `}
    >
      <Nav showArtifact={showArtifact} onToggleArtifact={onToggleArtifact} />
      <MessageSection />
      <ChatInput />
    </div>
  );
}

export default ChatSection;
