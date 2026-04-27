"use client";
import React, { useState } from "react";
import { login } from "@/lib/blogApi";
import { useAdminTheme } from "./adminTokens";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t, dark } = useAdminTheme();

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
        background: dark ? "#060e1f" : "#EBF3FF",
        backgroundImage: `radial-gradient(circle, ${dark ? "rgba(29,94,255,0.1)" : "rgba(29,94,255,0.08)"} 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <img src="/PCXLogo.svg" alt="PCX" style={{ height: 28, width: "auto" }} />
            <span className="font-inter font-bold text-xl" style={{ color: t.textPrimary }}>
              Admin
            </span>
          </div>
          <p className="font-mono text-sm" style={{ color: t.textSecondary }}>
            Sign in to manage content
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: t.modalBg,
            border: `1px solid ${t.border}`,
            borderRadius: 20,
            padding: "36px 32px",
            boxShadow: t.modalShadow,
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-2" style={{ color: t.textSecondary }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="admin@pcxpay.com"
                autoFocus
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 10,
                  boxSizing: "border-box",
                  border: error ? "1px solid rgba(238,14,14,0.6)" : `1px solid ${t.inputBorder}`,
                  background: t.inputBg,
                  color: t.textPrimary,
                  fontFamily: "monospace",
                  fontSize: 14,
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1D5EFF")}
                onBlur={(e) => (e.target.style.borderColor = error ? "rgba(238,14,14,0.6)" : t.inputBorder)}
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-2" style={{ color: t.textSecondary }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 10,
                  boxSizing: "border-box",
                  border: error ? "1px solid rgba(238,14,14,0.6)" : `1px solid ${t.inputBorder}`,
                  background: t.inputBg,
                  color: t.textPrimary,
                  fontFamily: "monospace",
                  fontSize: 14,
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1D5EFF")}
                onBlur={(e) => (e.target.style.borderColor = error ? "rgba(238,14,14,0.6)" : t.inputBorder)}
              />
            </div>

            {error && (
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
                style={{ background: "rgba(238,14,14,0.08)", border: "1px solid rgba(238,14,14,0.2)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <circle cx="7" cy="7" r="6" stroke="#EE0E0E" strokeWidth="1.2" />
                  <path d="M7 4v3M7 9.5h.01" stroke="#EE0E0E" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <p className="font-mono text-xs text-[#EE0E0E] m-0">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full py-3.5 rounded-[10px] font-mono text-sm font-bold text-white border-none transition-all duration-200"
              style={{
                background: loading || !email || !password
                  ? "rgba(29,94,255,0.4)"
                  : "linear-gradient(87deg, #847AFF 0%, #086FFF 100%)",
                cursor: loading || !email || !password ? "not-allowed" : "pointer",
                boxShadow: loading || !email || !password ? "none" : "0 4px 20px rgba(29,94,255,0.3)",
              }}
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>
        </div>

        <p className="text-center font-mono text-xs mt-6" style={{ color: t.textMuted }}>
          PCX CMS · Admin Portal
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
