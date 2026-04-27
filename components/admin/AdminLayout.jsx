"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { useAdminTheme } from "./adminTokens";

const navItems = [
  {
    label: "Blog Posts",
    href: "/admin/blog",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M3 4h12M3 8h8M3 12h10M3 16h6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "New Post",
    href: "/admin/blog/new",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 3v12M3 9h12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const AdminLayout = ({ children, onLogout }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useAdminTheme();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    onLogout();
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: t.pageBg }}>
      {/* Sidebar */}
      <aside
        style={{
          width: collapsed ? 64 : 220,
          flexShrink: 0,
          background: t.sidebarBg,
          borderRight: `1px solid ${t.border}`,
          display: "flex",
          flexDirection: "column",
          transition: "width 0.22s ease",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <div
          style={{ padding: "24px 16px 20px", borderBottom: `1px solid ${t.border}`, minHeight: 69 }}
          className="flex items-center gap-3"
        >
          {!collapsed && (
            <>
              <img src="/PCXLogo.svg" alt="PCX" className="shrink-0" style={{ height: 20, width: "auto" }} />
              <span className="font-inter font-bold text-sm whitespace-nowrap" style={{ color: t.textPrimary }}>
                Admin
              </span>
            </>
          )}
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 p-3 flex-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl no-underline transition-all duration-200"
                style={{
                  color: active ? t.navActiveColor : t.navInactiveColor,
                  background: active ? t.navActiveBg : "transparent",
                  border: active ? `1px solid ${t.navActiveBorder}` : "1px solid transparent",
                }}
                title={collapsed ? item.label : undefined}
              >
                <span className="shrink-0" style={{ color: active ? "#1D5EFF" : "inherit" }}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="font-mono text-[13px] font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "12px", borderTop: `1px solid ${t.border}` }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full border-none transition-all duration-200"
            style={{ background: "transparent", color: t.textSecondary, cursor: "pointer" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = t.logoutHoverBg;
              e.currentTarget.style.color = "#EE0E0E";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = t.textSecondary;
            }}
            title={collapsed ? "Sign out" : undefined}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
              <path
                d="M6 3H3a1 1 0 00-1 1v10a1 1 0 001 1h3M12 13l4-4-4-4M16 9H7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {!collapsed && (
              <span className="font-mono text-[13px] font-medium">Sign Out</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          style={{
            height: 60,
            borderBottom: `1px solid ${t.border}`,
            background: t.headerBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border-none transition-colors duration-200"
            style={{ background: "transparent", color: t.textSecondary, cursor: "pointer" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = t.hamburgerHoverBg;
              e.currentTarget.style.color = t.hamburgerHoverColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = t.textSecondary;
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs no-underline transition-colors duration-200 hover:text-[#1D5EFF]"
              style={{ color: t.textSecondary }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 1h4M1 1v4M1 1l5 5M5 1h6v6M5 7v4H1V7"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              View Site
            </Link>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold text-white"
              style={{ background: "linear-gradient(87deg, #847AFF 0%, #086FFF 100%)" }}
            >
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
