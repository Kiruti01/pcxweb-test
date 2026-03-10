"use client";
import React, { useState } from "react";
import { login } from "@/lib/blogApi";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      onLogin(data.user);
    } catch (err) {
      setError(err.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "#060e1f",
        backgroundImage:
          "radial-gradient(circle, rgba(29,94,255,0.1) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(87deg, #847AFF 0%, #086FFF 100%)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M8 3l5 5-5 5"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-inter font-bold text-xl text-white">
              PCX Admin
            </span>
          </div>
          <p className="font-mono text-sm text-[#657688]">
            Sign in to manage content
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: "36px 32px",
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-[#657688] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="admin@pcxpay.com"
                autoFocus
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 10,
                  boxSizing: "border-box",
                  border: error
                    ? "1px solid rgba(238,14,14,0.6)"
                    : "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  color: "white",
                  fontFamily: "monospace",
                  fontSize: 14,
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1D5EFF")}
                onBlur={(e) =>
                  (e.target.style.borderColor = error
                    ? "rgba(238,14,14,0.6)"
                    : "rgba(255,255,255,0.1)")
                }
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-[#657688] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 10,
                  boxSizing: "border-box",
                  border: error
                    ? "1px solid rgba(238,14,14,0.6)"
                    : "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  color: "white",
                  fontFamily: "monospace",
                  fontSize: 14,
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1D5EFF")}
                onBlur={(e) =>
                  (e.target.style.borderColor = error
                    ? "rgba(238,14,14,0.6)"
                    : "rgba(255,255,255,0.1)")
                }
              />
            </div>

            {error && (
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
                style={{
                  background: "rgba(238,14,14,0.08)",
                  border: "1px solid rgba(238,14,14,0.2)",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="shrink-0"
                >
                  <circle
                    cx="7"
                    cy="7"
                    r="6"
                    stroke="#EE0E0E"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M7 4v3M7 9.5h.01"
                    stroke="#EE0E0E"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="font-mono text-xs text-[#EE0E0E] m-0">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full py-3.5 rounded-[10px] font-mono text-sm font-bold text-white border-none transition-all duration-200"
              style={{
                background:
                  loading || !email || !password
                    ? "rgba(29,94,255,0.4)"
                    : "linear-gradient(87deg, #847AFF 0%, #086FFF 100%)",
                cursor:
                  loading || !email || !password ? "not-allowed" : "pointer",
                boxShadow:
                  loading || !email || !password
                    ? "none"
                    : "0 4px 20px rgba(29,94,255,0.35)",
              }}
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>
        </div>

        <p className="text-center font-mono text-xs text-[#3E4953] mt-6">
          PCX CMS · Admin Portal
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
