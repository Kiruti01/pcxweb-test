"use client";
import { useState, useEffect } from "react";

const StickyGetStarted = ({ scrollThreshold = 300 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > scrollThreshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  return (
    <div
      className={`fixed bottom-7 right-7 z-[9998] transition-all duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <a
        href="https://platform.pcxpay.com/signup"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-7 py-3.5 rounded-full font-mono font-semibold text-sm text-white whitespace-nowrap bg-gradient-to-r from-[#1D5EFF] to-[#086FFF] shadow-[0_8px_32px_rgba(29,94,255,0.4),0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur transition-all duration-180 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_14px_40px_rgba(29,94,255,0.5),0_4px_12px_rgba(0,0,0,0.1)] hover:brightness-110 active:translate-y-0 active:scale-97 active:shadow-[0_4px_16px_rgba(29,94,255,0.3)] no-underline"
      >
        Get Started
        <span className="w-4.5 h-4.5 bg-white/20 rounded-full flex items-center justify-center transition-all duration-180 group-hover:bg-white/30 group-hover:translate-x-0.5">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 5h6M5 2l3 3-3 3"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </div>
  );
};

export default StickyGetStarted;
