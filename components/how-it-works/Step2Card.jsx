import React from "react";

const Step2Card = () => {
  const otpDigits = ["3", "8", "4", "7", "", ""];

  const dashRows = [
    { label: "Payments", width: "70%", color: "var(--primary-color)" },
    { label: "Accounts", width: "40%", color: "#10B981" },
    { label: "FX Rates", width: "55%", color: "#F59E0B" },
  ];

  return (
    <div
      className="hiw-step-card flex flex-col rounded-2xl overflow-hidden border border-transparent hover:border-gray-200 hover:-translate-y-1 transition-all duration-200 hover:shadow-xl"
      style={{ background: "#F2F4F8" }}
    >
      {/* Visual area */}
      <div
        className="hiw-visual relative flex items-center justify-center min-h-52 px-5 pt-7 pb-5 overflow-hidden"
        style={{ background: "linear-gradient(145deg, #F0FDF4, #DCFCE7)" }}
      >
        {/* OTP mockup */}
        <div
          className="relative bg-white rounded-xl p-4"
          style={{
            width: "172px",
            boxShadow: "0 4px 20px rgba(16,185,129,0.12)",
          }}
        >
          {/* Email icon */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
            style={{ background: "#F0FDF4" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>

          <p
            className="text-center font-extrabold mb-1"
            style={{ fontSize: "10px", color: "var(--text-1000)" }}
          >
            Verify your email
          </p>
          <p
            className="text-center mb-3"
            style={{
              fontSize: "7.5px",
              color: "var(--text-600)",
              lineHeight: "1.5",
            }}
          >
            We sent a 6-digit code to
            <br />
            <strong style={{ color: "var(--text-1000)" }}>m@pcx.co</strong>
          </p>

          {/* OTP boxes */}
          <div className="flex gap-1 justify-center mb-3">
            {otpDigits.map((d, i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded font-extrabold"
                style={{
                  width: "21px",
                  height: "26px",
                  fontSize: "11px",
                  border: `1.5px solid ${d ? "#10B981" : "#E5E9F2"}`,
                  background: d ? "#F0FDF4" : "#F5F6FA",
                  color: d ? "#10B981" : "transparent",
                }}
              >
                {d || "_"}
              </div>
            ))}
          </div>

          <div
            className="h-6 rounded-md flex items-center justify-center font-bold text-white"
            style={{ background: "#10B981", fontSize: "8px" }}
          >
            Verify & Continue
          </div>

          {/* Floating dashboard hint */}
          <div
            className="absolute -bottom-1 -right-3 bg-white rounded-xl p-2"
            style={{ width: "115px", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
          >
            <p
              className="font-bold mb-1.5"
              style={{ fontSize: "7px", color: "var(--text-1000)" }}
            >
              Your dashboard
            </p>
            {dashRows.map(({ label, width, color }) => (
              <div
                key={label}
                className="flex items-center gap-1 mb-1 last:mb-0"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: color }}
                />
                <span
                  style={{
                    fontSize: "7px",
                    color: "var(--text-1000)",
                    minWidth: "38px",
                  }}
                >
                  {label}
                </span>
                <div
                  className="flex-1 h-1 rounded-full"
                  style={{ background: "#F5F6FA" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width, background: color }}
                  />
                </div>
              </div>
            ))}
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
          Step 2
        </span>
        <h3
          className="font-extrabold mb-2 leading-snug"
          style={{
            fontSize: "16px",
            letterSpacing: "-0.3px",
            color: "var(--text-1000)",
          }}
        >
          Verify email & explore
        </h3>
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-600)",
            lineHeight: "1.65",
          }}
        >
          Enter the OTP sent to your email to sign in. Explore the dashboard,
          API docs, and features freely.
        </p>
      </div>
    </div>
  );
};

export default Step2Card;
