import React from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative w-full aspect-[9/16] rounded-[36px] border-[6px] border-[#0c1e36] ring-1 ring-brand-text/10 bg-[#0c1e36] overflow-hidden flex flex-col">
      {/* Dynamic Island Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-brand-bg z-20 flex items-center justify-center pointer-events-none select-none">
        {/* Subtle camera lens reflection */}
        <div className="w-1.5 h-1.5 rounded-full bg-white/5 ml-auto mr-2" />
      </div>
      {/* Screen Content */}
      <div className="relative flex-1 w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
