import React from "react";

const Step1Card = () => {
  return (
    <div
      className="hiw-step-card flex flex-col rounded-2xl overflow-hidden border border-transparent hover:border-gray-200 hover:-translate-y-1 transition-all duration-200 hover:shadow-xl"
      style={{ background: "#F2F4F8" }}
    >
      {/* Visual area */}
      <div
        className="hiw-visual relative flex items-center justify-center min-h-52 px-5 pt-7 pb-5 overflow-hidden"
        style={{ background: "linear-gradient(145deg, #EEF4FF, #DCE8FF)" }}
      >
        {/* Signup form mockup */}
        <div
          className="relative w-44 bg-white rounded-xl shadow-lg p-3"
          style={{ boxShadow: "0 4px 20px rgba(29,94,255,0.12)" }}
        >
          {/* Header bar */}
          <div
            className="rounded-md px-2 py-1 mb-3 text-white text-xs font-bold"
            style={{ background: "var(--primary-color)", fontSize: "8px" }}
          >
            PCX
          </div>

          <p
            className="font-extrabold mb-2.5"
            style={{ fontSize: "8px", color: "var(--text-1000)" }}
          >
            Create your account
          </p>

          {/* Fields */}
          {[
            { label: "Full name", value: "Michael O." },
            { label: "Email address", value: "m@pcx.co" },
            {
              label: "Password",
              value: "••••••••",
              valueStyle: { fontSize: "9px", color: "var(--text-600)" },
            },
          ].map(({ label, value, valueStyle }) => (
            <div
              key={label}
              className="flex items-center justify-between h-6 rounded-md border mb-1.5 px-2"
              style={{
                borderColor: "#E5E9F2",
                background: "#F5F6FA",
                fontSize: "7px",
              }}
            >
              <span style={{ color: "var(--text-600)" }}>{label}</span>
              <span
                className="font-semibold"
                style={{ color: "var(--text-1000)", ...valueStyle }}
              >
                {value}
              </span>
            </div>
          ))}

          {/* Continue btn */}
          <div
            className="h-6 rounded-md flex items-center justify-center text-white font-bold mt-2"
            style={{ background: "var(--primary-color)", fontSize: "8px" }}
          >
            Continue →
          </div>

          {/* Floating org badge */}
          <div
            className="absolute -bottom-2 -right-3 bg-white rounded-xl shadow-lg p-2"
            style={{
              minWidth: "120px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}
          >
            <p
              className="font-bold mb-1.5"
              style={{ fontSize: "7px", color: "var(--text-1000)" }}
            >
              Account type
            </p>

            {/* Selected option */}
            <div
              className="flex items-center gap-1 rounded px-1.5 py-1 mb-1"
              style={{
                background: "#EEF4FF",
                fontSize: "7px",
                color: "var(--primary-color)",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "var(--primary-color)" }}
              >
                <svg viewBox="0 0 8 8" fill="none" className="w-1.5 h-1.5">
                  <polyline
                    points="1,4 3,6 7,2"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              Create organisation
            </div>

            {/* Inactive option */}
            <div
              className="flex items-center gap-1 px-1.5 py-1"
              style={{ fontSize: "7px", color: "var(--text-600)" }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0 border"
                style={{ borderColor: "var(--text-600)" }}
              />
              Join existing org
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="hiw-info px-5 py-5">
        <span
          className="hiw-badge inline-flex items-center bg-white border rounded-full px-3 py-1 text-xs font-semibold mb-2.5"
          style={{
            borderColor: "#E5E9F2",
            color: "var(--text-1000)",
            fontSize: "12px",
          }}
        >
          Step 1
        </span>
        <h3
          className="font-extrabold mb-2 leading-snug"
          style={{
            fontSize: "16px",
            letterSpacing: "-0.3px",
            color: "var(--text-1000)",
          }}
        >
          Sign up & Create your Organisation
        </h3>
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-600)",
            lineHeight: "1.65",
          }}
        >
          Enter your name, email and password, then set up your company — name,
          country, and industry.
        </p>
      </div>
    </div>
  );
};

export default Step1Card;
