import { PanelRightOpen, PanelRightClose } from "lucide-react";
import { useSelector } from "react-redux";
import NivanIcon from "../../public/NivanIcon";

function Nav({ showArtifact, onToggleArtifact }) {
  const { selectedConversation } = useSelector((state) => state.conversation);

  return (
    <div className="h-14 pl-14 pr-4 lg:pl-6 lg:pr-6 flex items-center justify-between border-b border-[#272735] shrink-0 bg-[#09090F]">
      <div className="flex items-center gap-2 min-w-0">
        {!selectedConversation ? (
          <div className="flex items-center gap-2">
            <div className="rounded-md shadow-[0_0_12px_rgba(139,92,246,0.25)]">
              <NivanIcon size={24} />
            </div>
            <h1 className="text-sm font-semibold text-[#F4F4F5] tracking-wide">
              NivanAI
            </h1>
            <span className="hidden sm:inline-block text-[12px] text-[#9292A5] ml-1">
              Your intelligent AI assistant.
            </span>
          </div>
        ) : (
          <>
            <h1 className="text-sm font-medium truncate text-[#F4F4F5]">
              {selectedConversation?.title || "New Chat"}
            </h1>
          </>
        )}
      </div>

      {selectedConversation && (
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={onToggleArtifact}
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg border transition-colors ${
              showArtifact
                ? "bg-[#13131D] border-[#272735] text-[#A78BFA]"
                : "bg-transparent border-transparent text-[#9292A5] hover:bg-[#13131D] hover:text-[#A78BFA]"
            }`}
          >
            {showArtifact ? (
              <PanelRightClose size={16} />
            ) : (
              <PanelRightOpen size={16} />
            )}
            <span className="text-xs font-medium hidden sm:inline">
              {showArtifact ? "Hide Code" : "Show Code"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Nav;
