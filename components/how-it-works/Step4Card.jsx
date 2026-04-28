import React from "react";

const fiatAccounts = [
  { symbol: "$", name: "USD" },
  { symbol: "£", name: "GBP" },
  { symbol: "€", name: "EUR" },
];

const cryptoAccounts = [
  { symbol: "USDC", name: "USD Coin" },
  { symbol: "EURC", name: "EUR Coin" },
  { symbol: "USDT", name: "Tether" },
];

const Step4Card = () => {
  return (
    <div
      className="hiw-step-card flex flex-col rounded-2xl overflow-hidden border border-transparent hover:border-gray-200 hover:-translate-y-1 transition-all duration-200 hover:shadow-xl"
      style={{ background: "#F2F4F8" }}
    >
      {/* Visual area */}
      <div
        className="hiw-visual relative flex flex-1 items-center justify-center min-h-52 px-5 pt-7 pb-5 overflow-hidden"
        style={{ background: "linear-gradient(145deg, #F5F3FF, #EDE9FE)" }}
      >
        {/* Virtual accounts mockup */}
        <div
          className="relative bg-white rounded-xl overflow-hidden"
          style={{
            width: "182px",
            boxShadow: "0 4px 20px rgba(139,92,246,0.1)",
          }}
        >
          {/* Header */}
          <div
            className="px-2.5 py-2"
            style={{ background: "var(--text-1000)" }}
          >
            <div className="flex items-center justify-between mb-1">
              <span
                className="font-bold text-white"
                style={{ fontSize: "7px" }}
              >
                Virtual Accounts
              </span>
              <span
                className="rounded font-bold px-1.5 py-0.5"
                style={{
                  fontSize: "6px",
                  color: "#6EE7B7",
                  background: "rgba(16,185,129,0.2)",
                }}
              >
                ✓ Verified
              </span>
            </div>
            <span style={{ fontSize: "6.5px", color: "rgba(255,255,255,0.5)" }}>
              Claim your global account suite
            </span>
          </div>

          {/* Currency grid */}
          <div className="p-2.5">
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              {/* Fiat */}
              {fiatAccounts.map(({ symbol, name }) => (
                <div
                  key={name}
                  className="rounded-lg py-2 text-center border"
                  style={{
                    background: "#EEF4FF",
                    borderColor: "rgba(29,94,255,0.3)",
                  }}
                >
                  <div
                    className="font-black"
                    style={{
                      fontSize: "14px",
                      color: "var(--primary-color)",
                      lineHeight: 1,
                    }}
                  >
                    {symbol}
                  </div>
                  <div
                    style={{
                      fontSize: "6px",
                      color: "var(--primary-color)",
                      marginTop: "2px",
                    }}
                  >
                    {name}
                  </div>
                </div>
              ))}
              {/* Crypto */}
              {cryptoAccounts.map(({ symbol, name }) => (
                <div
                  key={name}
                  className="rounded-lg py-2 text-center border"
                  style={{
                    background: "#F5F3FF",
                    borderColor: "rgba(139,92,246,0.3)",
                  }}
                >
                  <div
                    className="font-extrabold"
                    style={{
                      fontSize: "7px",
                      color: "#7C3AED",
                      lineHeight: 1.2,
                    }}
                  >
                    {symbol}
                  </div>
                  <div
                    style={{
                      fontSize: "6px",
                      color: "#7C3AED",
                      marginTop: "2px",
                    }}
                  >
                    {name}
                  </div>
                </div>
              ))}
            </div>

            {/* Claim button */}
            <div
              className="h-5 rounded-md flex items-center justify-center text-white font-bold"
              style={{ background: "var(--primary-color)", fontSize: "7.5px" }}
            >
              Claim your first account →
            </div>
          </div>

          {/* Floating verified badge */}
          <div
            className="absolute flex items-center gap-1.5 bg-white rounded-xl px-2.5 py-1.5"
            style={{
              top: "10px",
              right: "-8px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              whiteSpace: "nowrap",
            }}
          >
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "#10B981" }}
            >
              <svg
                viewBox="0 0 10 10"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                className="w-2.5 h-2.5"
              >
                <polyline points="2,5 4,7 8,3" />
              </svg>
            </div>
            <div>
              <strong
                className="block"
                style={{ fontSize: "8px", color: "var(--text-1000)" }}
              >
                KYB Approved
              </strong>
              <span style={{ fontSize: "7px", color: "var(--text-600)" }}>
                You're all set!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="hiw-info px-5 py-5">
        <span
          className="hiw-badge inline-flex items-center bg-white border rounded-full px-3 py-1 font-semibold mb-2.5"
          style={{
            borderColor: "#E5E9F2",
            color: "var(--text-1000)",
            fontSize: "12px",
          }}
        >
          Step 4
        </span>
        <h3
          className="font-extrabold mb-2 leading-snug"
          style={{
            fontSize: "16px",
            letterSpacing: "-0.3px",
            color: "var(--text-1000)",
          }}
        >
          Claim your virtual accounts
        </h3>
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-600)",
            lineHeight: "1.65",
          }}
        >
          Once verified, choose from USD, GBP, EUR, USDC, EURC, or USDT — and
          start moving money globally.
        </p>
      </div>
    </div>
  );
};

export default Step4Card;
