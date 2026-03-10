"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const TermsAndServices = () => {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    fetch("/PCXPAY_Terms_and_Services.md")
      .then((res) => res.text())
      .then((text) => setMarkdownContent(text));
  }, []);

  const version = [{ date: "August 19th, 2025", version: "version 1.0" }];

  const components = {
    h1: ({ ...props }) => (
      <h1
        {...props}
        className="text-[48px] text-[#13161A] dark:text-white font-[600] font-inter my-7"
      />
    ),
    h2: ({ children, ...props }) => {
      const id =
        typeof children === "string"
          ? children
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "")
          : undefined;
      return (
        <h2
          {...props}
          id={id}
          className="text-[40px] text-[#13161A] dark:text-white font-[600] font-inter mt-8 mb-4"
        />
      );
    },
    h3: ({ ...props }) => (
      <h3
        {...props}
        className="text-[32px] text-[#13161A] dark:text-white font-[500] font-inter mt-6 mb-3"
      />
    ),
    h4: ({ ...props }) => (
      <h4
        {...props}
        className="text-[24px] text-[#13161A] dark:text-white font-[500] font-inter mt-5 mb-2"
      />
    ),
    h5: ({ ...props }) => (
      <h5
        {...props}
        className="text-[18px] text-[#13161A] dark:text-white font-[500] font-inter"
      />
    ),
    h6: ({ ...props }) => (
      <h6
        {...props}
        className="text-[16px] text-[#B0BBC5] dark:text-[#6B7280] font-[600] font-inter"
      />
    ),
    p: ({ ...props }) => (
      <p
        {...props}
        className="text-[16px] md:text-[18px] font-mono font-[400] text-[#3E4953] dark:text-[#9CA3AF] pb-5"
      />
    ),
    ul: ({ ...props }) => (
      <ul
        {...props}
        className="ml-6 mb-6 space-y-2 text-[16px] text-[#3E4953] dark:text-[#9CA3AF] font-[400] font-mono list-disc"
      />
    ),
    ol: ({ ...props }) => (
      <ol
        {...props}
        className="ml-6 mb-6 space-y-2 text-[16px] text-[#3E4953] dark:text-[#9CA3AF] font-[400] font-mono list-decimal"
      />
    ),
    li: ({ ...props }) => <li {...props} className="pl-2 mb-5" />,
    a: ({ ...props }) => (
      <a
        {...props}
        className="text-blue-600 dark:text-blue-400 hover:underline"
      />
    ),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col lg:flex-row gap-10 w-full max-w-[1280px] mx-auto mt-10 md:mt-16 px-4 md:px-8">
        {/* Main content */}
        <div className="w-full lg:max-w-[920px] p-6 md:p-10 bg-[#FFFFFFA3] dark:bg-[#ffffff0d] rounded-md">
          <div className="my-7">
            <h1 className="text-[32px] md:text-[48px] font-[600] text-[#13161A] dark:text-white">
              PCXPAY Terms and Services
            </h1>
            {version.map((item) => (
              <div
                key={item.date}
                className="flex justify-between pt-5 text-[#657688] dark:text-[#6B7280] text-[14px] md:text-[16px] font-[400] font-mono"
              >
                <span>Current as of {item.date}</span>
                <span>{item.version}</span>
              </div>
            ))}
          </div>
          <div className="w-full gap-5 flex flex-col">
            <ReactMarkdown components={components}>
              {markdownContent}
            </ReactMarkdown>
          </div>
        </div>

        {/* Sidebar — hidden on mobile */}
        <div className="hidden lg:flex w-[296px] shrink-0 h-fit p-10 bg-[#FFFFFFA3] dark:bg-[#ffffff0d] rounded-md flex-col gap-5 sticky top-40">
          <h1 className="font-mono font-[700] text-[#13161A] dark:text-white text-[24px]">
            General
          </h1>
          <ul className="flex flex-col gap-[24px] text-[16px] font-mono font-[400] text-[#3E4953] dark:text-[#9CA3AF] pl-[24px]">
            <li>
              <a href="#additional-legal-terms" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#intellectual-property" className="hover:underline">
                Licenses
              </a>
            </li>
            <li>
              <a
                href="#responsibilities-of-the-parties"
                className="hover:underline"
              >
                Entities
              </a>
            </li>
            <li>
              <a
                href="#regulatory--compliance-model"
                className="hover:underline"
              >
                Policies
              </a>
            </li>
          </ul>
        </div>
      </main>
      <CTASection />
      <Footer />
    </div>
  );
};

export default TermsAndServices;
