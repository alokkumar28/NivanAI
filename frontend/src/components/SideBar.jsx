import { useEffect, useState } from "react";
import {
  Plus,
  MessageSquare,
  PanelLeftClose,
  Settings,
  User,
  MoreHorizontal,
  X,
  Menu,
  Coins,
  LogOut,
} from "lucide-react";
import NivanIcon from "../../public/NivanIcon";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/getConversations";
import {
  addConversation,
  setConversations,
  setSelectedConversation,
} from "../redux/conversationSlice";
import { createConversation } from "../features/createConversation";
import { logOut } from "../features/logOut";
import { setUserdata } from "../redux/userSlice";

function SideBar({ collapsed, setCollapsed }) {
  const { userData } = useSelector((state) => state.user);
  const { conversations, selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const getCon = async () => {
      try {
        const data = await getConversations();
        const convArray = data?.conversations || [];
        dispatch(setConversations(convArray));
      } catch (error) {
        console.error("Failed to fetch conversations", error);
      }
    };
    getCon();
  }, [dispatch]);

  const handleCreateConversation = async () => {
    try {
      const data = await createConversation();
      const newConv = data?.conversation;
      if (newConv) {
        dispatch(addConversation(newConv));
        dispatch(setSelectedConversation(newConv));
        setMobileOpen(false); 
      }
    } catch (error) {
      console.error("Failed to create conversation", error);
    }
  };

  const handleSelectConversation = (conv) => {
    dispatch(setSelectedConversation(conv));
    setMobileOpen(false);
  };

  const safeConversations = Array.isArray(conversations) ? conversations : [];
  const credits = 1240;

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-[60] p-2 rounded-lg bg-[#13131D] border border-[#272735] text-[#9292A5] hover:text-[#A78BFA] transition-colors"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-[80] h-screen
          bg-[#09090F] border-r border-[#272735]
          flex flex-col select-none
          transition-all duration-300 ease-in-out
          ${collapsed ? "lg:w-[68px]" : "lg:w-[260px]"}
          w-[260px]
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div
          className={`flex items-center ${
            collapsed ? "lg:justify-center" : "justify-between"
          } px-3 h-14 shrink-0`}
        >
          <div className="flex items-center gap-2 pl-1">
            <button
              onClick={() => {
                if (collapsed) setCollapsed(false);
              }}
              className={`flex items-center justify-center transition-all ${
                collapsed ? "cursor-pointer hover:scale-105" : "cursor-default"
              }`}
              title={collapsed ? "Expand sidebar" : "NivanAI"}
              aria-label={collapsed ? "Expand sidebar" : "NivanAI logo"}
            >
              <NivanIcon size={28} />
            </button>

            {!collapsed && (
              <span className="font-semibold text-[#F4F4F5] text-[15px] tracking-wide">
                NivanAI
              </span>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-[#13131D] text-[#9292A5] hover:text-[#A78BFA] transition-colors"
              title="Collapse"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          )}

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#13131D] text-[#9292A5] hover:text-[#A78BFA] transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-3 pb-3 shrink-0">
          <button
            onClick={handleCreateConversation}
            className={`w-full flex items-center ${
              collapsed ? "lg:justify-center" : "gap-2 justify-start"
            } bg-[#13131D] border border-[#272735] hover:border-[#8B5CF6]
              hover:bg-[#8B5CF6]/10 text-[#F4F4F5] rounded-xl px-3 py-2.5 text-sm font-medium
              transition-all hover:shadow-[0_0_16px_rgba(139,92,246,0.25)]`}
          >
            <Plus size={18} className="text-[#A78BFA] shrink-0" />
            <span className={collapsed ? "lg:hidden" : ""}>New chat</span>
          </button>
        </div>

        {!collapsed && safeConversations.length > 0 && (
          <div className="px-4 pt-2 pb-1 shrink-0">
            <p className="text-[11px] font-semibold text-[#9292A5] uppercase tracking-wider">
              Recent Chats
            </p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {safeConversations.length === 0 ? (
            <div
              className={`flex flex-col items-center justify-center text-center mt-10 px-4 ${
                collapsed ? "lg:hidden" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#13131D] border border-[#272735] flex items-center justify-center mb-3">
                <MessageSquare size={18} className="text-[#9292A5]" />
              </div>
              <p className="text-[13px] font-medium text-[#F4F4F5] mb-1">
                No recent chats
              </p>
              <p className="text-[11px] text-[#9292A5] leading-relaxed">
                Start a new conversation with NivanAI to see it here.
              </p>
            </div>
          ) : (
            <div className="space-y-0.5 mt-1">
              {safeConversations.map((conv) => {
                if (!conv) return null;
                const isActive = selectedConversation?._id === conv?._id;
                const title = conv.title || "New Chat";

                return (
                  <div
                    key={conv._id}
                    onClick={() => handleSelectConversation(conv)}
                    title={title}
                    className={`group flex items-center gap-2.5 cursor-pointer px-2.5 py-2.5 rounded-[10px] border transition-colors duration-150 ${
                      isActive
                        ? "bg-[#13131D] border-[#8B5CF6]/30 text-[#F4F4F5]"
                        : "bg-transparent border-transparent text-[#9292A5] hover:bg-[#13131D] hover:text-[#F4F4F5]"
                    } ${collapsed ? "lg:justify-center lg:px-0" : ""}`}
                  >
                    <MessageSquare
                      size={16}
                      className={`shrink-0 ${
                        isActive ? "text-[#A78BFA]" : "text-[#9292A5]"
                      }`}
                    />
                    <span
                      className={`flex-1 truncate text-[13.5px] ${
                        collapsed ? "lg:hidden" : ""
                      }`}
                    >
                      {title}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className={`opacity-0 group-hover:opacity-100 p-1 rounded-md text-[#9292A5] hover:text-[#A78BFA] hover:bg-[#272735]/50 transition-all shrink-0 ${
                        collapsed ? "lg:hidden" : ""
                      }`}
                    >
                      <MoreHorizontal size={15} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t border-[#272735] p-2 shrink-0">
          <div
            className={`w-full flex items-center ${
              collapsed ? "lg:flex-col lg:gap-3 lg:py-2" : "justify-between"
            } group rounded-lg hover:bg-[#13131D] p-1.5 transition-colors cursor-pointer`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full shrink-0 bg-[#272735] flex items-center justify-center overflow-hidden border border-[#3f3f52]">
                {userData?.avatar && !imageError ? (
                  <img
                    src={userData.avatar}
                    alt={userData.name || "User"}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <User size={16} className="text-[#9292A5]" />
                )}
              </div>
              {!collapsed && (
                <div className="flex-1 text-left min-w-0">
                  <p className="text-[13.5px] font-medium text-[#F4F4F5] truncate">
                    {userData?.name || "User"}
                  </p>
                  <p className="text-[11px] text-[#9292A5] truncate">
                    Free plan
                  </p>
                </div>
              )}
            </div>

            {!collapsed ? (
              <div className="flex items-center gap-1.5 shrink-0">
                <div
                  className="flex items-center gap-1 bg-[#272735]/50 px-2 py-1 rounded-md border border-[#3f3f52]/50"
                  title="Credits Left"
                >
                  <Coins size={13} className="text-[#A78BFA]" />
                  <span className="text-[11px] font-semibold text-[#F4F4F5]">
                    {credits}
                  </span>
                </div>

                <button
                  className="p-1.5 rounded-md hover:bg-[#272735] text-[#9292A5] hover:text-[#A78BFA] transition-colors"
                  title="Settings"
                >
                  <Settings size={15} />
                </button>

                <button
                  className="p-1.5 rounded-md hover:bg-[#272735] text-[#9292A5] hover:text-red-400 transition-colors"
                  title="Log out"
                  onClick={() => {
                    logOut();
                    dispatch(setUserdata(null));
                  }}
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <div
                  className="flex items-center gap-1 bg-[#272735]/50 px-2 py-1 rounded-md border border-[#3f3f52]/50"
                  title="Credits Left"
                >
                  <Coins size={13} className="text-[#A78BFA]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
