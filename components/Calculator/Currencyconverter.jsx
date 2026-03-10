"use client";
import React, { useState } from "react";
import "flag-icons/css/flag-icons.min.css";
import { useTheme } from "../ThemeContext";

const CURRENCIES = [
  { code: "USD", name: "US Dollar", flagClass: "us" },
  { code: "EUR", name: "Euro", flagClass: "eu" },
  { code: "GBP", name: "British Pound", flagClass: "gb" },
  { code: "NGN", name: "Nigerian Naira", flagClass: "ng" },
  { code: "KES", name: "Kenyan Shilling", flagClass: "ke" },
  { code: "GHS", name: "Ghanaian Cedi", flagClass: "gh" },
  { code: "ZAR", name: "South African Rand", flagClass: "za" },
  { code: "CAD", name: "Canadian Dollar", flagClass: "ca" },
  { code: "USDC", name: "USD Coin", flagClass: "crypto" },
];

const RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  NGN: 1542.25,
  KES: 129,
  GHS: 15.2,
  ZAR: 18.6,
  CAD: 1.36,
  USDC: 1,
};

function convert(amount, from, to) {
  return (amount / RATES[from]) * RATES[to];
}

const CurrencySelect = ({ value, onChange, excludeCode, isDark }) => {
  const [open, setOpen] = useState(false);
  const selected = CURRENCIES.find((c) => c.code === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2 max-md:px-2 max-md:py-1.5 rounded-lg font-mono text-xs font-bold whitespace-nowrap transition-all"
        style={{
          background: isDark ? "rgba(255,255,255,0.1)" : "white",
          border: isDark
            ? "1px solid rgba(255,255,255,0.12)"
            : "1px solid #E8ECF0",
          color: isDark ? "white" : "#13161A",
        }}
      >
        {selected.flagClass === "crypto" ? (
          <span className="text-base">🔵</span>
        ) : (
          <span
            className={`fi fi-${selected.flagClass} fis w-4 h-4 rounded-full`}
          />
        )}
        <span>{selected.code}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2 4l4 4 4-4"
            stroke={isDark ? "rgba(255,255,255,0.5)" : "#9AA5B4"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[99]"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute top-[calc(100%+6px)] right-0 w-52 rounded-lg shadow-[0_10px_36px_rgba(0,0,0,0.3)] z-[100] overflow-hidden max-h-60 overflow-y-auto"
            style={{
              background: isDark ? "#1a2236" : "white",
              border: isDark
                ? "1px solid rgba(29,94,255,0.2)"
                : "1px solid rgba(29,94,255,0.1)",
            }}
          >
            {CURRENCIES.filter((c) => c.code !== excludeCode).map((c) => (
              <button
                key={c.code}
                type="button"
                className="w-full flex items-center gap-2 px-3.5 py-2.5 font-mono text-xs text-left transition-colors"
                style={{
                  background:
                    c.code === value
                      ? isDark
                        ? "rgba(29,94,255,0.2)"
                        : "rgba(29,94,255,0.08)"
                      : "transparent",
                  color:
                    c.code === value
                      ? "#1D5EFF"
                      : isDark
                        ? "rgba(255,255,255,0.85)"
                        : "#13161A",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDark
                    ? "rgba(29,94,255,0.15)"
                    : "rgba(29,94,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    c.code === value
                      ? isDark
                        ? "rgba(29,94,255,0.2)"
                        : "rgba(29,94,255,0.08)"
                      : "transparent";
                }}
                onClick={() => {
                  onChange(c.code);
                  setOpen(false);
                }}
              >
                {c.flagClass === "crypto" ? (
                  <span className="text-base">🔵</span>
                ) : (
                  <span
                    className={`fi fi-${c.flagClass} fis w-5 h-5 rounded-full`}
                  />
                )}
                <span className="font-semibold">{c.code}</span>
                <span
                  className="ml-auto text-[11px]"
                  style={{
                    color: isDark ? "rgba(255,255,255,0.35)" : "#9AA5B4",
                  }}
                >
                  {c.name}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [amount, setAmount] = useState("1000");
  const [swapping, setSwapping] = useState(false);
  const { dark: isDark } = useTheme();

  const num = parseFloat(amount.replace(/,/g, "")) || 0;
  const received = convert(num, fromCurrency, toCurrency);
  const fee = num * 0.005;
  const rate = convert(1, fromCurrency, toCurrency);

  const fmt = (n) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const fmtInput = (v) => {
    const raw = v.replace(/[^0-9.]/g, "");
    const parts = raw.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const handleSwap = () => {
    setSwapping(true);
    setTimeout(() => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      setSwapping(false);
    }, 180);
  };

  // Dark mode color tokens
  const cardBg = isDark ? "#0f1624" : "white";
  const cardBorder = isDark ? "rgba(29,94,255,0.3)" : "rgba(132,122,255,0.25)";
  const inputBg = isDark ? "rgba(255,255,255,0.06)" : "#F7F8FA";
  const inputBorder = isDark ? "rgba(255,255,255,0.08)" : "transparent";
  const inputFocusBorder = "#1D5EFF";
  const labelColor = isDark ? "rgba(255,255,255,0.35)" : "#9AA5B4";
  const valueColor = isDark ? "rgba(255,255,255,0.9)" : "#13161A";
  const metaColor = isDark ? "rgba(255,255,255,0.4)" : "#9AA5B4";
  const metaValue = isDark ? "rgba(255,255,255,0.7)" : "#3E4953";
  const dividerColor = isDark ? "rgba(255,255,255,0.06)" : "#F0F2F5";
  const breakdownBg = isDark ? "rgba(255,255,255,0.04)" : "transparent";
  const swapBg = isDark ? "rgba(29,94,255,0.15)" : "white";
  const swapBorder = isDark ? "rgba(29,94,255,0.4)" : "rgba(29,94,255,0.2)";
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
        {/* Live rates */}
        <div className="flex items-center justify-end gap-1.5 mb-5 max-md:mb-3 font-mono text-xs font-semibold text-[#1D5EFF]">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M5.5 1L7 4.5H11L8 6.5L9.5 10L5.5 7.5L1.5 10L3 6.5L0 4.5H4L5.5 1Z"
              fill="#1D5EFF"
            />
          </svg>
          Live Rates
        </div>

        {/* YOU SEND */}
        <span
          className="block font-mono text-[10px] max-md:text-[9px] font-bold tracking-[0.14em] uppercase mb-2.5 max-md:mb-1.5"
          style={{ color: labelColor }}
        >
          You Send
        </span>
        <div
          className="flex items-center justify-between rounded-lg p-4 max-md:p-3 border-2 transition-all gap-3"
          style={{ background: inputBg, borderColor: inputBorder }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = inputFocusBorder;
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(29,94,255,0.08)";
            if (isDark)
              e.currentTarget.style.background = "rgba(255,255,255,0.09)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = inputBorder;
            e.currentTarget.style.boxShadow = "none";
            if (isDark) e.currentTarget.style.background = inputBg;
          }}
        >
          <input
            className="flex-1 border-none bg-transparent font-mono text-xl max-md:text-base font-bold outline-none min-w-0"
            style={{ color: valueColor }}
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={fmtInput(amount)}
            onChange={(e) => setAmount(e.target.value.replace(/,/g, ""))}
          />
          <CurrencySelect
            value={fromCurrency}
            onChange={setFromCurrency}
            excludeCode={toCurrency}
            isDark={isDark}
          />
        </div>

        {/* Swap */}
        <div className="flex items-center gap-2.5 my-4 max-md:my-3">
          <div className="flex-1 h-px" style={{ background: dividerColor }} />
          <button
            type="button"
            className={`w-9 h-9 max-md:w-8 max-md:h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all hover:shadow-[0_4px_14px_rgba(29,94,255,0.2)] ${swapping ? "rotate-180" : ""}`}
            style={{ background: swapBg, borderColor: swapBorder }}
            onClick={handleSwap}
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
          </button>
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
          className="flex items-center justify-between rounded-lg p-4 max-md:p-3 border-2 transition-all gap-3"
          style={{ background: inputBg, borderColor: inputBorder }}
        >
          <span
            className="flex-1 font-mono text-xl max-md:text-base font-bold"
            style={{ color: valueColor }}
          >
            {fmt(received)}
          </span>
          <CurrencySelect
            value={toCurrency}
            onChange={setToCurrency}
            excludeCode={fromCurrency}
            isDark={isDark}
          />
        </div>

        {/* Breakdown */}
        <div
          className="rounded-lg p-4 max-md:p-3 mt-5 max-md:mt-3 flex flex-col gap-2.5 max-md:gap-2"
          style={{
            background: breakdownBg,
            border: `1px dashed ${isDark ? "rgba(29,94,255,0.25)" : "rgba(29,94,255,0.15)"}`,
          }}
        >
          <div className="flex items-center justify-between font-mono text-[13px] max-md:text-[11px]">
            <span style={{ color: metaColor }} className="font-medium">
              Fee (0.5%)
            </span>
            <span style={{ color: metaValue }} className="font-semibold">
              {fmt(fee)} {fromCurrency}
            </span>
          </div>
          <div className="flex items-center justify-between font-mono text-[13px] max-md:text-[11px]">
            <span style={{ color: metaColor }} className="font-medium">
              Exchange Rate
            </span>
            <span style={{ color: metaValue }} className="font-semibold">
              1 {fromCurrency} = {fmt(rate)} {toCurrency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
