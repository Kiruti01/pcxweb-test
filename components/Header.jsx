"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// import ThemeToggle from "./ThemeToggle";

const chevronDown = (isOpen) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    style={{
      display: "inline-block",
      verticalAlign: "middle",
      transition: "transform 0.2s ease",
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    }}
  >
    <path
      d="M3 5L7 9L11 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const productLinks = [
  {
    href: "/embedded-finance",
    label: "Embedded Finance",
    description: "Turn your platform into a fintech instantly",
  },
  {
    href: "/cross-border-payments",
    label: "Cross-Border Payments",
    description: "Global payments made affordable",
  },
];

const navLinks = [
  { href: "#products", label: "Products", type: "dropdown" },
  {
    href: "https://apiaws.docs.apiary.io/#/",
    label: "API Docs",
    type: "external",
  },
  { href: "/about", label: "About Us", type: "route" },
  { href: "/blog", label: "Blog", type: "route" },
  { href: "/contact-us", label: "Contact Us", type: "route" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const closeTimer = useRef(null);
  const pathname = usePathname();

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const openDropdown = () => {
    clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  const isActive = (link) => link.type === "route" && pathname === link.href;
  const isProductActive =
    pathname === "/embedded-finance" || pathname === "/cross-border-payments";

  const getLinkClass = (link, extraActive = false) =>
    [
      "group text-[#3E4953] no-underline font-mono text-sm font-normal transition-colors duration-200 whitespace-nowrap flex items-center gap-1 cursor-pointer",
      isActive(link) || extraActive
        ? "text-[#1D5EFF] font-medium"
        : "hover:text-[#1D5EFF]",
      "max-lg:px-5 max-lg:py-3.5 max-lg:border-b max-lg:border-[rgba(29,94,255,0.06)] max-lg:w-full",
    ].join(" ");

  const navClass = [
    "flex items-center gap-7 flex-1 justify-center",
    "max-lg:absolute max-lg:top-[calc(100%+8px)]",
    "max-lg:left-3 max-lg:right-3 max-lg:flex-col max-lg:gap-0",
    "max-lg:bg-[rgba(235,243,255,0.97)] max-lg:backdrop-blur-[20px]",
    "max-lg:rounded-2xl max-lg:border max-lg:border-[rgba(29,94,255,0.12)]",
    "max-lg:shadow-[0_8px_32px_rgba(29,94,255,0.12)] max-lg:overflow-hidden",
    menuOpen ? "flex" : "max-lg:hidden",
  ].join(" ");

  return (
    <header className="w-full sticky top-4 z-1000 px-6 max-lg:px-3 pointer-events-none">
      <div className="w-full max-w-300 mx-auto h-17 max-lg:h-14 flex justify-between items-center gap-10 px-6 max-lg:px-5 pointer-events-auto bg-white/40 backdrop-blur-[20px] border border-[rgba(29,94,255,0.12)] rounded-full shadow-[0_4px_24px_rgba(29,94,255,0.08)]">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <Link href="/">
            <img
              src="/PCXLogo.svg"
              alt="PCX"
              className="nav-logo h-9 w-auto block"
            />
          </Link>
        </div>

        {/* Nav */}
        <nav className={navClass}>
          {navLinks.map((link) => {
            if (link.type === "dropdown") {
              return (
                <div key="products" className="relative max-lg:w-full">
                  {/* Desktop trigger */}
                  <button
                    className={[
                      getLinkClass(link, isProductActive),
                      isProductActive ? "text-[#1D5EFF] font-medium" : "",
                      "hidden lg:flex bg-transparent border-none",
                    ].join(" ")}
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                    onClick={() => setDropdownOpen((v) => !v)}
                  >
                    {link.label}
                    {chevronDown(dropdownOpen)}
                  </button>

                  {/* Desktop dropdown */}
                  <div
                    className={`products-dropdown ${dropdownOpen ? "open" : ""}`}
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    {productLinks.map((pl) => (
                      <Link
                        key={pl.href}
                        href={pl.href}
                        className={`dropdown-item ${pathname === pl.href ? "active-product" : ""}`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div>
                          <div className="font-inter text-[13px] font-semibold leading-[1.3] mb-0.75">
                            {pl.label}
                          </div>
                          <div className="dropdown-item-desc">
                            {pl.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Mobile accordion trigger */}
                  <button
                    className={[
                      getLinkClass(link, isProductActive),
                      "lg:hidden bg-transparent border-none justify-between",
                    ].join(" ")}
                    onClick={() => setMobileProductsOpen((v) => !v)}
                  >
                    <span className="flex items-center gap-1">
                      {link.label}
                      {chevronDown(mobileProductsOpen)}
                    </span>
                  </button>

                  {/* Mobile sub-links */}
                  <div
                    className={`mobile-products-children ${mobileProductsOpen ? "open" : ""} lg:hidden`}
                  >
                    {productLinks.map((pl) => (
                      <Link
                        key={pl.href}
                        href={pl.href}
                        className={`mobile-sub-link ${pathname === pl.href ? "active-product" : ""}`}
                        onClick={() => {
                          setMenuOpen(false);
                          setMobileProductsOpen(false);
                        }}
                      >
                        {pl.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            // External links (API Docs)
            if (link.type === "external") {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={getLinkClass(link)}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              );
            }

            return link.type === "route" ? (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  getLinkClass(link),
                  isActive(link) ? "text-[#1D5EFF] font-medium" : "",
                ].join(" ")}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={getLinkClass(link)}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            );
          })}

          {/* Mobile-only CTA buttons (inside collapsed menu) */}
          <div className="hidden max-lg:flex flex-col w-full gap-0 border-t border-[rgba(29,94,255,0.06)]">
            <a
              href="https://platform.pcxpay.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-none text-[#1D5EFF] font-mono text-sm font-medium cursor-pointer px-5 py-3.5 text-left transition-colors duration-200 hover:text-[#0040cc] border-b border-[rgba(29,94,255,0.06)] no-underline"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </a>
            <div className="px-5 py-4">
              <a
                href="https://platform.pcxpay.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-linear-to-br from-[#1D5EFF] to-[#086FFF] text-white border-none py-2.5 px-5.5 rounded-[10px] font-mono text-sm font-medium cursor-pointer transition-all duration-200 shadow-[0_2px_12px_rgba(29,94,255,0.35)] hover:shadow-[0_4px_20px_rgba(29,94,255,0.5)] text-center no-underline"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* <ThemeToggle /> */}

          <a
            href="https://platform.pcxpay.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-none text-[#1D5EFF] font-mono text-sm font-medium cursor-pointer px-4 py-2 transition-colors duration-200 hover:text-[#0040cc] max-lg:hidden no-underline"
          >
            Sign In
          </a>

          <a
            href="https://platform.pcxpay.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-linear-to-br from-[#1D5EFF] to-[#086FFF] text-white border-none py-2.5 px-5.5 rounded-[10px] font-mono text-sm font-medium cursor-pointer transition-all duration-200 whitespace-nowrap shadow-[0_2px_12px_rgba(29,94,255,0.35)] hover:shadow-[0_4px_20px_rgba(29,94,255,0.5)] hover:-translate-y-px max-lg:hidden no-underline"
          >
            Get Started
          </a>

          {/* Hamburger */}
          <button
            className="hidden max-lg:flex flex-col gap-1.25 bg-transparent border-none cursor-pointer p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className="block w-5.5 h-0.5 bg-[#131927] rounded-sm transition-transform duration-200"
              style={
                menuOpen ? { transform: "translateY(6px) rotate(45deg)" } : {}
              }
            />
            <span
              className="block w-5.5 h-0.5 bg-[#131927] rounded-sm transition-opacity duration-200"
              style={menuOpen ? { opacity: 0 } : {}}
            />
            <span
              className="block w-5.5 h-0.5 bg-[#131927] rounded-sm transition-transform duration-200"
              style={
                menuOpen ? { transform: "translateY(-6px) rotate(-45deg)" } : {}
              }
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
