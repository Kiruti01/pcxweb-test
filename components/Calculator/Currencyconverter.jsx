"use client";
import React from "react";
import "flag-icons/css/flag-icons.min.css";
import { useTheme } from "../ThemeContext";

const EXAMPLE = {
  fromCode: "USD",
  fromFlag: "us",
  fromAmount: "1,000.00",
  toCode: "USDC",
  toIcon: (
    <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#2775CA" />
      <path
        d="M16 6C10.477 6 6 10.477 6 16s4.477 10 10 10 10-4.477 10-10S21.523 6 16 6zm1.2 15.8v1.4h-2.4v-1.4c-2.6-.5-4.4-2.1-4.6-4.4h2.5c.2 1.3 1.2 2.1 2.8 2.1 1.7 0 2.7-.8 2.7-2 0-1.1-.7-1.7-2.6-2.1-2.7-.6-4.3-1.7-4.3-3.8 0-1.9 1.5-3.4 3.5-3.8V8.8h2.4v1.4c2.3.5 3.8 2 4 4.1h-2.5c-.2-1.2-1-1.9-2.5-1.9-1.5 0-2.4.7-2.4 1.8 0 1 .7 1.6 2.7 2.1 2.7.6 4.2 1.7 4.2 3.9 0 2-1.5 3.5-3.5 3.9z"
        fill="white"
      />
    </svg>
  ),
  toAmount: "1,000.00",
};

const StaticCurrencyBadge = ({ code, flagClass, icon, isDark }) => (
  <div
    className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs font-bold whitespace-nowrap"
    style={{
      background: isDark ? "rgba(255,255,255,0.1)" : "white",
      border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #E8ECF0",
      color: isDark ? "white" : "#13161A",
    }}
  >
    {icon
      ? <span className="w-4 h-4 flex items-center justify-center shrink-0">{icon}</span>
      : <span className={`fi fi-${flagClass} fis w-4 h-4 rounded-full`} />
    }
    <span>{code}</span>
  </div>
);

const CurrencyConverter = () => {
  const { dark: isDark } = useTheme();

  const cardBg = isDark ? "#0f1624" : "white";
  const cardBorder = isDark ? "rgba(29,94,255,0.3)" : "rgba(132,122,255,0.25)";
  const inputBg = isDark ? "rgba(255,255,255,0.06)" : "#F7F8FA";
  const inputBorder = isDark ? "rgba(255,255,255,0.08)" : "transparent";
  const labelColor = isDark ? "rgba(255,255,255,0.35)" : "#9AA5B4";
  const valueColor = isDark ? "rgba(255,255,255,0.9)" : "#13161A";
  const dividerColor = isDark ? "rgba(255,255,255,0.06)" : "#F0F2F5";
  const outerGradFrom = isDark
    ? "rgba(132,122,255,0.35)"
    : "rgba(132,122,255,0.25)";
  const outerGradTo = isDark ? "rgba(29,94,255,0.28)" : "rgba(29,94,255,0.18)";

  return (
    <div
      className="p-1.5 rounded-[28px] max-md:rounded-[20px] shadow-[0_8px_40px_rgba(29,94,255,0.15)] max-w-115 w-full"
      style={{
        background: `linear-gradient(135deg, ${outerGradFrom}, ${outerGradTo})`,
      }}
    >
      <div
        className="rounded-[22px] max-md:rounded-[16px] p-7 max-md:p-5 relative"
        style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
      >
        {/* YOU SEND */}
        <span
          className="block font-mono text-[10px] max-md:text-[9px] font-bold tracking-[0.14em] uppercase mb-2.5 max-md:mb-1.5"
          style={{ color: labelColor }}
        >
          You Send
        </span>
        <div
          className="flex items-center justify-between rounded-lg p-4 max-md:p-3 border-2 gap-3"
          style={{ background: inputBg, borderColor: inputBorder }}
        >
          <span
            className="flex-1 font-mono text-xl max-md:text-base font-bold"
            style={{ color: valueColor }}
          >
            {EXAMPLE.fromAmount}
          </span>
          <StaticCurrencyBadge
            code={EXAMPLE.fromCode}
            flagClass={EXAMPLE.fromFlag}
            isDark={isDark}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2.5 my-4 max-md:my-3">
          <div className="flex-1 h-px" style={{ background: dividerColor }} />
          <div
            className="w-9 h-9 max-md:w-8 max-md:h-8 rounded-full border-2 flex items-center justify-center shrink-0"
            style={{
              background: isDark ? "rgba(29,94,255,0.15)" : "white",
              borderColor: isDark
                ? "rgba(29,94,255,0.4)"
                : "rgba(29,94,255,0.2)",
            }}
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path
                d="M2.5 5.5h12M2.5 5.5l3-3M2.5 5.5l3 3M14.5 11.5h-12M14.5 11.5l-3-3M14.5 11.5l-3 3"
                stroke="#1D5EFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex-1 h-px" style={{ background: dividerColor }} />
        </div>

        {/* YOU RECEIVE */}
        <span
          className="block font-mono text-[10px] max-md:text-[9px] font-bold tracking-[0.14em] uppercase mb-2.5 max-md:mb-1.5"
          style={{ color: labelColor }}
        >
          You Receive
        </span>
        <div
          className="flex items-center justify-between rounded-lg p-4 max-md:p-3 border-2 gap-3"
          style={{ background: inputBg, borderColor: inputBorder }}
        >
          <span
            className="flex-1 font-mono text-xl max-md:text-base font-bold"
            style={{ color: valueColor }}
          >
            {EXAMPLE.toAmount}
          </span>
          <StaticCurrencyBadge
            code={EXAMPLE.toCode}
            icon={EXAMPLE.toIcon}
            isDark={isDark}
          />
        </div>

        {/* Disclaimer */}
        <p
          className="mt-5 max-md:mt-3 font-mono text-[11px] max-md:text-[10px] text-center leading-relaxed"
          style={{ color: labelColor }}
        >
          Illustrative example only. Contact us for live pricing.
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
