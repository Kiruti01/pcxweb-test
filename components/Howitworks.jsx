import React from "react";
import Step1Card from "./how-it-works/Step1Card";
import Step2Card from "./how-it-works/Step2Card";
import Step3Card from "./how-it-works/Step3Card";
import Step4Card from "./how-it-works/Step4Card";

const HowItWorks = () => {
  return (
    <section className="w-full py-16 px-4 md:py-20 md:px-8 lg:px-15 bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span
            className="inline-flex items-center border border-[rgba(29,94,255,0.2)] rounded-full px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[#1D5EFF] mb-5"
            style={{ background: "rgba(29,94,255,0.05)" }}
          >
            How It Works
          </span>
          <h2 className="font-black leading-tight text-[#13161A] text-[clamp(32px,5vw,56px)] tracking-[-2px] mb-0">
            4 Easy Steps to Your <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-[#847AFF] to-[#086FFF] bg-clip-text text-transparent">
              Virtual Account
            </span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mb-8 md:mb-10 max-w-4xl mx-auto">
          <Step1Card />
          <Step2Card />
          <Step3Card />
          <Step4Card />
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap px-4 sm:px-0">
          <a
            href="https://platform.pcxpay.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center no-underline transition-all duration-180 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(29,94,255,0.4)] hover:brightness-108 active:translate-y-0 active:scale-97 active:shadow-[0_4px_12px_rgba(29,94,255,0.25)] active:brightness-96 text-white font-bold rounded-full px-6 sm:px-8 py-3 border-none text-[13px] sm:text-[14px] bg-linear-to-r from-[#847AFF] to-[#086FFF] shadow-[0_6px_20px_rgba(29,94,255,0.3)]"
          >
            Open Your Account ↗
          </a>

          <a
            href="mailto:info@pcxpay.com?subject=Contact%20Sales"
            className="w-full sm:w-auto text-center no-underline transition-all duration-180 hover:border-[#1D5EFF] hover:text-[#1D5EFF] hover:bg-[rgba(29,94,255,0.05)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(29,94,255,0.12)] active:translate-y-0 active:scale-97 active:bg-[rgba(29,94,255,0.1)] active:shadow-[0_2px_8px_rgba(29,94,255,0.1)] font-semibold rounded-full px-5 sm:px-6 py-3 border text-[13px] sm:text-[14px] bg-white text-[#13161A] border-[#E5E9F2]"
          >
            Contact Sales
          </a>

          <a
            href="mailto:info@pcxpay.com?subject=Book%20a%20Demo"
            className="w-full sm:w-auto text-center no-underline transition-all duration-180 hover:border-[#1D5EFF] hover:text-[#1D5EFF] hover:bg-[rgba(29,94,255,0.05)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(29,94,255,0.12)] active:translate-y-0 active:scale-97 active:bg-[rgba(29,94,255,0.1)] active:shadow-[0_2px_8px_rgba(29,94,255,0.1)] font-semibold rounded-full px-5 sm:px-6 py-3 border text-[13px] sm:text-[14px] bg-white text-[#13161A] border-[#E5E9F2]"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
