// Artifact.jsx
import { useState } from "react";
import {
  Code2, Eye, Copy, Check, Download, X, FileCode2, Play,
} from "lucide-react";
 
const mockFiles = [
  {
    name: "App.jsx", language: "jsx",
    code: `import { useState } from "react";\nimport Button from "./Button";\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div className="flex flex-col items-center gap-4 p-8">\n      <h1>Counter: {count}</h1>\n      <Button onClick={() => setCount(c => c + 1)}>Increment</Button>\n    </div>\n  );\n}`,
  },
  {
    name: "Button.jsx", language: "jsx",
    code: `export default function Button({ children, onClick }) {\n  return (\n    <button onClick={onClick} className="px-4 py-2 rounded-lg bg-violet-500 text-white">\n      {children}\n    </button>\n  );\n}`,
  },
  {
    name: "styles.css", language: "css",
    code: `body {\n  margin: 0;\n  background: #09090F;\n  color: #F4F4F5;\n}`,
  },
];

function highlight(code, lang) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let html = esc(code);
  if (["jsx", "js", "ts", "tsx"].includes(lang)) {
    html = html.replace(/(&quot;[^&]*?&quot;|`[^`]*?`)/g, '<span class="text-emerald-400">$1</span>');
    html = html.replace(/\b(import|from|export|default|function|return|const|let|var|if|else|new|class|useState|useEffect)\b/g, '<span class="text-[#A78BFA]">$1</span>');
    html = html.replace(/(&lt;\/?)([A-Za-z][A-Za-z0-9]*)/g, '$1<span class="text-[#8B5CF6]">$2</span>');
    html = html.replace(/(\/\/[^\n]*)/g, '<span class="text-[#9292A5] italic">$1</span>');
    html = html.replace(/\b(\d+)\b/g, '<span class="text-amber-400">$1</span>');
  } else if (lang === "css") {
    html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-[#9292A5] italic">$1</span>');
    html = html.replace(/([a-z-]+)(:)/g, '<span class="text-[#A78BFA]">$1</span>$2');
    html = html.replace(/(#[0-9a-fA-F]{3,8})/g, '<span class="text-emerald-400">$1</span>');
  }
  return html;
}

export default function Artifact({ onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState("code");
  const [copied, setCopied] = useState(false);

  const activeFile = mockFiles[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([activeFile.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = activeFile.name; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <aside
      className="
        fixed top-0 right-0 bottom-0 z-[80] h-screen
        w-full sm:w-[520px] xl:w-[480px] 2xl:w-[560px]
        bg-[#09090F] border-l border-[#272735]
        flex flex-col
        transition-transform duration-300 ease-in-out
      "
    >
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-[#272735] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#13131D] border border-[#272735] flex items-center justify-center">
            <Code2 size={15} className="text-[#A78BFA]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#F4F4F5] leading-tight">Artifact</p>
            <p className="text-[11px] text-[#9292A5] leading-tight">React Component · 3 files</p>
          </div>
        </div>
        
        {/* X Button to close/unmount Artifact */}
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-[#9292A5] hover:text-[#F4F4F5] hover:bg-[#13131D] transition-colors"
          title="Close"
        >
          <X size={18} />
        </button>
      </div>

      {/* Tabs + view toggle */}
      <div className="px-3 pt-3 flex items-center justify-between border-b border-[#272735] shrink-0 gap-2">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin scrollbar-thumb-[#272735] min-w-0">
          {mockFiles.map((f, i) => (
            <button
              key={f.name}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-[13px] whitespace-nowrap transition-colors border-b-2 ${
                activeTab === i
                  ? "text-[#F4F4F5] border-[#8B5CF6] bg-[#13131D]"
                  : "text-[#9292A5] border-transparent hover:text-[#A78BFA] hover:bg-[#13131D]/50"
              }`}
            >
              <FileCode2 size={13} />
              {f.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-0.5 bg-[#13131D] border border-[#272735] rounded-lg p-0.5 mb-1.5 shrink-0">
          <button
            onClick={() => setViewMode("code")}
            className={`px-2.5 py-1 rounded-md text-[12px] flex items-center gap-1 transition-colors ${viewMode === "code" ? "bg-[#8B5CF6] text-white" : "text-[#9292A5] hover:text-[#A78BFA]"}`}
          >
            <Code2 size={12} /> <span className="hidden sm:inline">Code</span>
          </button>
          <button
            onClick={() => setViewMode("preview")}
            className={`px-2.5 py-1 rounded-md text-[12px] flex items-center gap-1 transition-colors ${viewMode === "preview" ? "bg-[#8B5CF6] text-white" : "text-[#9292A5] hover:text-[#A78BFA]"}`}
          >
            <Eye size={12} /> <span className="hidden sm:inline">Preview</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-[#272735] shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#13131D] border border-[#272735] text-[#A78BFA] uppercase font-medium tracking-wide">
            {activeFile.language}
          </span>
          <span className="hidden sm:inline text-[11px] text-[#9292A5]">{activeFile.code.split("\n").length} lines</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] text-[#9292A5] hover:text-[#A78BFA] hover:bg-[#13131D] transition-colors"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] text-[#9292A5] hover:text-[#A78BFA] hover:bg-[#13131D] transition-colors"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] bg-[#8B5CF6] text-white hover:bg-[#7c4ff0] transition-colors shadow-[0_0_12px_rgba(139,92,246,0.35)]">
            <Play size={13} />
            <span className="hidden sm:inline">Run</span>
          </button>
        </div>
      </div>

      {/* Code / Preview body */}
      <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-[#272735] bg-[#09090F]">
        {viewMode === "code" ? (
          <div className="flex text-[13px] font-mono leading-relaxed min-w-max">
            <div className="select-none py-4 px-3 text-right text-[#3a3a4a] bg-[#09090F] border-r border-[#272735] shrink-0">
              {activeFile.code.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <pre className="py-4 px-4 text-[#F4F4F5] whitespace-pre flex-1">
              <code dangerouslySetInnerHTML={{ __html: highlight(activeFile.code, activeFile.language) }} />
            </pre>
          </div>
        ) : (
          <div className="p-4">
            <div className="bg-[#13131D] border border-[#272735] rounded-xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#272735]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-[11px] text-[#9292A5]">preview</span>
              </div>
              <div className="p-8 flex flex-col items-center justify-center text-center min-h-[260px]">
                <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center mb-3">
                  <Eye size={20} className="text-[#A78BFA]" />
                </div>
                <p className="text-sm text-[#F4F4F5] font-medium mb-1">Live preview</p>
                <p className="text-[12px] text-[#9292A5] max-w-[280px]">
                  Connect a sandbox (e.g. Sandpack) to render the component live here.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="h-9 px-4 flex items-center justify-between border-t border-[#272735] text-[11px] text-[#9292A5] shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Ready
          </span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden sm:inline">LF</span>
        </div>
        <span className="truncate">{activeFile.name}</span>
      </div>
    </aside>
  );
}