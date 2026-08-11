import React from "react";

interface BrowserFrameProps {
  children: React.ReactNode;
}

export default function BrowserFrame({ children }: BrowserFrameProps) {
  return (
    <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-brand-text/10 bg-[#0c1e36] flex flex-col">
      {/* Browser Header/Toolbar */}
      <div className="h-6 px-3 flex items-center gap-1.5 border-b border-brand-text/5 bg-[#0e223c] shrink-0 select-none">
        <div className="w-2 h-2 rounded-full bg-brand-text/20" />
        <div className="w-2 h-2 rounded-full bg-brand-text/20" />
        <div className="w-2 h-2 rounded-full bg-brand-text/20" />
      </div>
      {/* Content Area */}
      <div className="relative flex-1 w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
