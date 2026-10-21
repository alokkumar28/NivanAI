import { useState } from "react";
import { useSelector } from "react-redux";
import Login from "./Login";
import SideBar from "../components/SideBar";
import ChatSection from "../components/ChatSection";
import Artifact from "../components/Artifact";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showArtifact, setShowArtifact] = useState(true);

  if (!userData) return <Login />;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#09090F]">
      <SideBar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <ChatSection
        sidebarCollapsed={sidebarCollapsed}
        showArtifact={showArtifact}
        onToggleArtifact={() => setShowArtifact(!showArtifact)}
      />
      {showArtifact && <Artifact onClose={() => setShowArtifact(false)} />}
    </div>
  );
}

export default Home;
