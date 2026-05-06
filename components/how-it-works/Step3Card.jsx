import React from "react";

const Step3Card = () => {
  const fields = [
    "Registered company name",
    "Business registration number",
    "Director full name",
  ];

  return (
    <div
      className="hiw-step-card flex flex-col rounded-2xl overflow-hidden border border-transparent hover:border-gray-200 hover:-translate-y-1 transition-all duration-200 hover:shadow-xl"
      style={{ background: "#F2F4F8" }}
    >
      {/* Visual area */}
      <div
        className="hiw-visual relative flex flex-1 items-center justify-center min-h-52 px-5 pt-7 pb-5 overflow-hidden"
        style={{ background: "linear-gradient(145deg, #FFFBEB, #FEF3C7)" }}
      >
        {/* KYB platform mockup */}
        <div
          className="relative bg-white rounded-xl overflow-hidden"
          style={{
            width: "186px",
            boxShadow: "0 4px 20px rgba(245,158,11,0.1)",
          }}
        >
          {/* Nav bar */}
          <div
            className="flex items-center gap-1 px-2 py-1.5"
            style={{ background: "var(--text-1000)" }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.3)" }}
              />
            ))}
            <span
              className="ml-auto font-extrabold text-white"
              style={{ fontSize: "7px" }}
            >
              PCX
            </span>
          </div>

          {/* Amber KYB banner */}
          <div
            className="flex items-center gap-1 px-2 py-1.5 border-b"
            style={{ background: "#FFFBEB", borderColor: "#FDE68A" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: "#F59E0B" }}
            />
            <p
              className="flex-1 font-medium"
              style={{ fontSize: "6.5px", color: "#92400E", lineHeight: "1.4" }}
            >
              Complete your KYB to unlock virtual accounts
            </p>
            <span
              className="font-bold rounded px-1 py-0.5"
              style={{
                fontSize: "6px",
                color: "#F59E0B",
                background: "#FEF3C7",
                whiteSpace: "nowrap",
              }}
            >
              Complete →
            </span>
          </div>

          {/* Form body */}
          <div className="p-2.5">
            <p
              className="font-extrabold mb-2"
              style={{ fontSize: "8px", color: "var(--text-1000)" }}
            >
              Business Verification
            </p>
            {fields.map((f) => (
              <div
                key={f}
                className="h-5 rounded border flex items-center px-1.5 mb-1"
                style={{ borderColor: "#E5E9F2", background: "#F5F6FA" }}
              >
                <span style={{ fontSize: "7px", color: "var(--text-600)" }}>
                  {f}
                </span>
              </div>
            ))}
            {/* Upload area */}
            <div
              className="rounded border-2 border-dashed p-2 text-center mt-1.5"
              style={{ borderColor: "#D1D5DB" }}
            >
              <div style={{ fontSize: "12px", marginBottom: "2px" }}>📎</div>
              <span style={{ fontSize: "6.5px", color: "var(--text-600)" }}>
                Upload incorporation docs
              </span>
            </div>
          </div>

          {/* Floating progress badge */}
          <div
            className="absolute -bottom-1 -right-2 bg-white rounded-xl p-2"
            style={{ width: "110px", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
          >
            <p
              className="font-bold mb-1.5"
              style={{ fontSize: "7px", color: "var(--text-1000)" }}
            >
              KYB In Progress
            </p>
            <div
              className="h-1.5 rounded-full mb-1"
              style={{ background: "#E5E9F2" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: "60%",
                  background: "linear-gradient(90deg, #F59E0B, #FBBF24)",
                }}
              />
            </div>
            <div className="flex justify-between">
              <span style={{ fontSize: "6.5px", color: "var(--text-600)" }}>
                Under review
              </span>
              <span
                className="font-semibold"
                style={{ fontSize: "6.5px", color: "#F59E0B" }}
              >
                1–3 days
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
          Step 3
        </span>
        <h3
          className="font-semibold mb-2 leading-snug"
          style={{
            fontSize: "16px",
            letterSpacing: "-0.3px",
            color: "var(--text-1000)",
          }}
        >
          Complete KYB verification
        </h3>
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-600)",
            lineHeight: "1.65",
          }}
        >
          Fill in your business details. Our partner reviews your documents in
          1–3 business days. You'll get email updates throughout.
        </p>
      </div>
    </div>
  );
};

export default Step3Card;
