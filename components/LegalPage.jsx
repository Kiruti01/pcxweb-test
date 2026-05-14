"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const mdComponents = {
  h1: ({ ...props }) => (
    <h1 {...props} className="text-[48px] text-[#13161A] dark:text-white font-[600] font-inter my-7" />
  ),
  h2: ({ children, ...props }) => {
    const id =
      typeof children === "string"
        ? children.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
        : undefined;
    return (
      <h2 {...props} id={id} className="text-[40px] text-[#13161A] dark:text-white font-[600] font-inter mt-8 mb-4" />
    );
  },
  h3: ({ ...props }) => (
    <h3 {...props} className="text-[32px] text-[#13161A] dark:text-white font-[500] font-inter mt-6 mb-3" />
  ),
  h4: ({ ...props }) => (
    <h4 {...props} className="text-[24px] text-[#13161A] dark:text-white font-[500] font-inter mt-5 mb-2" />
  ),
  h5: ({ ...props }) => (
    <h5 {...props} className="text-[18px] text-[#13161A] dark:text-white font-[500] font-inter" />
  ),
  h6: ({ ...props }) => (
    <h6 {...props} className="text-[16px] text-[#B0BBC5] dark:text-[#6B7280] font-[600] font-inter" />
  ),
  p: ({ ...props }) => (
    <p {...props} className="text-[16px] md:text-[18px] font-mono font-[400] text-[#3E4953] dark:text-[#9CA3AF] pb-5 break-words" />
  ),
  ul: ({ ...props }) => (
    <ul {...props} className="ml-6 mb-6 space-y-2 text-[16px] text-[#3E4953] dark:text-[#9CA3AF] font-[400] font-mono list-disc break-words" />
  ),
  ol: ({ ...props }) => (
    <ol {...props} className="ml-6 mb-6 space-y-2 text-[16px] text-[#3E4953] dark:text-[#9CA3AF] font-[400] font-mono list-decimal break-words" />
  ),
  li: ({ ...props }) => <li {...props} className="pl-2 mb-5 break-words" />,
  a: ({ ...props }) => (
    <a {...props} className="text-blue-600 dark:text-blue-400 hover:underline" />
  ),
};

const SkeletonBar = ({ w = "100%", h = 16, mt = 0 }) => (
  <div
    className="rounded bg-[#E5E9F2] dark:bg-white/10 animate-pulse"
    style={{ width: w, height: h, marginTop: mt }}
  />
);

const LegalPageSkeleton = ({ title, version, sidebarLinks }) => (
  <div className="flex flex-col lg:flex-row gap-10 w-full max-w-[1280px] mx-auto mt-10 md:mt-16 px-4 md:px-8 overflow-x-hidden">
    <div className="w-full lg:max-w-[920px] p-6 md:p-10 bg-[#FFFFFFA3] dark:bg-[#ffffff0d] rounded-md min-w-0 overflow-hidden">
      <div className="my-7 space-y-4">
        <h1 className="text-[32px] md:text-[48px] font-[600] text-[#13161A] dark:text-white">{title}</h1>
        {version && (
          <div className="flex justify-between pt-2">
            <SkeletonBar w={144} h={14} />
            <SkeletonBar w={96} h={14} />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {[1, 0.9, 1, 0.75].map((w, i) => <SkeletonBar key={i} w={`${w * 100}%`} h={14} />)}
        <SkeletonBar w="48%" h={28} mt={12} />
        {[1, 0.95, 0.8, 1, 0.7].map((w, i) => <SkeletonBar key={i} w={`${w * 100}%`} h={14} />)}
        <SkeletonBar w="36%" h={28} mt={12} />
        {[1, 0.88, 1, 0.65, 0.92].map((w, i) => <SkeletonBar key={i} w={`${w * 100}%`} h={14} />)}
        <SkeletonBar w="55%" h={28} mt={12} />
        {[1, 0.78, 0.9, 1].map((w, i) => <SkeletonBar key={i} w={`${w * 100}%`} h={14} />)}
      </div>
    </div>

    {sidebarLinks?.length > 0 && (
      <div className="hidden lg:flex w-[296px] shrink-0 h-fit p-10 bg-[#FFFFFFA3] dark:bg-[#ffffff0d] rounded-md flex-col gap-5 sticky top-40">
        <SkeletonBar w={96} h={20} />
        <div className="flex flex-col gap-6 pl-6">
          {[0.8, 0.65, 0.9, 0.7, 0.75, 0.6, 0.85].map((w, i) => (
            <SkeletonBar key={i} w={`${w * 100}%`} h={13} />
          ))}
        </div>
      </div>
    )}
  </div>
);

const LegalPage = ({ title, mdFile, version, sidebarLinks }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(mdFile)
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      });
  }, [mdFile]);

  const handleTocLink = () => setTocOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {loading ? (
        <LegalPageSkeleton title={title} version={version} sidebarLinks={sidebarLinks} />
      ) : (
        <main className="flex flex-col lg:flex-row gap-10 w-full max-w-[1280px] mx-auto mt-10 md:mt-16 px-4 md:px-8 overflow-x-hidden">
          {/* Main content */}
          <div className="w-full lg:max-w-[920px] p-6 md:p-10 bg-[#FFFFFFA3] dark:bg-[#ffffff0d] rounded-md min-w-0 overflow-hidden">
            <div className="my-7">
              <h1 className="text-[32px] md:text-[48px] font-[600] text-[#13161A] dark:text-white">
                {title}
              </h1>
              {version && (
                <div className="flex justify-between pt-5 text-[#657688] dark:text-[#6B7280] text-[14px] md:text-[16px] font-[400] font-mono">
                  <span>Current as of {version.date}</span>
                  <span>{version.label}</span>
                </div>
              )}
            </div>
            <div className="w-full gap-5 flex flex-col">
              <ReactMarkdown components={mdComponents}>{content}</ReactMarkdown>
            </div>
          </div>

          {/* Desktop sidebar */}
          {sidebarLinks?.length > 0 && (
            <div className="hidden lg:flex w-[296px] shrink-0 h-fit p-10 bg-[#FFFFFFA3] dark:bg-[#ffffff0d] rounded-md flex-col gap-5 sticky top-40">
              <h2 className="font-mono font-[700] text-[#13161A] dark:text-white text-[24px]">
                Contents
              </h2>
              <ul className="flex flex-col gap-[24px] text-[16px] font-mono font-[400] text-[#3E4953] dark:text-[#9CA3AF] pl-[24px]">
                {sidebarLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-[#E5E9F2] dark:border-white/10 flex flex-col gap-3 text-[14px] font-mono text-[#9AA5B4]">
                <a href="/terms_and_conditions" className="hover:text-[#1D5EFF] hover:underline transition-colors">Terms & Conditions</a>
                <a href="/privacy-policy" className="hover:text-[#1D5EFF] hover:underline transition-colors">Privacy Policy</a>
                <a href="/security-policy" className="hover:text-[#1D5EFF] hover:underline transition-colors">Security Policy</a>
              </div>
            </div>
          )}
        </main>
      )}

      {/* Mobile floating TOC — only when there are sidebar links */}
      {sidebarLinks?.length > 0 && (
        <div className="lg:hidden">
          {/* Backdrop */}
          {tocOpen && (
            <div
              className="fixed inset-0 z-[1001] bg-black/30 backdrop-blur-[2px]"
              onClick={() => setTocOpen(false)}
            />
          )}

          {/* Slide-in panel */}
          <div
            className={`fixed top-0 right-0 h-full w-[260px] z-[1002] flex flex-col bg-white dark:bg-[#0d1829] shadow-[−8px_0_40px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${tocOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 pt-8 pb-5 border-b border-[#E5E9F2] dark:border-white/10">
              <span className="font-mono font-[700] text-[#13161A] dark:text-white text-[18px]">Contents</span>
              <button
                onClick={() => setTocOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(29,94,255,0.07)] text-[#1D5EFF] hover:bg-[rgba(29,94,255,0.14)] transition-colors"
                aria-label="Close contents"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Links */}
            <ul className="flex flex-col gap-1 px-4 py-5 overflow-y-auto flex-1">
              {sidebarLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleTocLink}
                    className="block px-3 py-2.5 rounded-lg font-mono text-[14px] text-[#3E4953] dark:text-[#9CA3AF] hover:bg-[rgba(29,94,255,0.06)] hover:text-[#1D5EFF] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Other legal pages */}
            <div className="px-4 py-5 border-t border-[#E5E9F2] dark:border-white/10 flex flex-col gap-1">
              <a href="/terms_and_conditions" onClick={handleTocLink} className="block px-3 py-2 rounded-lg font-mono text-[13px] text-[#9AA5B4] hover:text-[#1D5EFF] hover:bg-[rgba(29,94,255,0.05)] transition-colors">Terms & Conditions</a>
              <a href="/privacy-policy" onClick={handleTocLink} className="block px-3 py-2 rounded-lg font-mono text-[13px] text-[#9AA5B4] hover:text-[#1D5EFF] hover:bg-[rgba(29,94,255,0.05)] transition-colors">Privacy Policy</a>
              <a href="/security-policy" onClick={handleTocLink} className="block px-3 py-2 rounded-lg font-mono text-[13px] text-[#9AA5B4] hover:text-[#1D5EFF] hover:bg-[rgba(29,94,255,0.05)] transition-colors">Security Policy</a>
            </div>
          </div>

          {/* Floating toggle tab */}
          <button
            onClick={() => setTocOpen((v) => !v)}
            aria-label="Toggle table of contents"
            className={`fixed top-1/2 -translate-y-1/2 z-[1003] flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${tocOpen ? "right-[260px]" : "right-0"}`}
            style={{
              background: "linear-gradient(135deg, #847AFF 0%, #1D5EFF 100%)",
              borderRadius: tocOpen ? "0 8px 8px 0" : "8px 0 0 8px",
              padding: "14px 10px",
              boxShadow: "-4px 0 20px rgba(29,94,255,0.25)",
            }}
          >
            {tocOpen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      )}

      <CTASection />
      <Footer />
    </div>
  );
};

export default LegalPage;
