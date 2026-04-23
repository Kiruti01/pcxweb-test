import React from "react";
import PCXNodes from "../assets/PCX nodes left and right.svg";
import CTASection from "./CTASection";

const APISectionAndCTA = () => {
  return (
    <>
      {/* Nodes Section */}
      <section className="bg-white py-15">
        <div className="max-w-360 mx-auto px-6 max-md:px-4">
          <img
            src={PCXNodes}
            alt="PCX Platform connections"
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* API Section */}
      <section className="bg-[linear-gradient(179deg,#FAFAFF_-24.37%,#FFF_116.78%)] py-30 text-left max-md:py-20">
        <div className="max-w-300 mx-auto px-6 max-md:px-4">
          <div className="flex flex-col items-start gap-8 max-w-253">
            <h2 className="font-inter text-[48px] font-bold leading-15 text-[#13161A] m-0 max-lg:text-4xl max-lg:leading-12 max-md:text-[28px] max-md:leading-9">
              Finally, A <span className="gradient-text">Payment API</span> That
              Doesn't Make You Want to Quit Engineering
            </h2>
            <p className="font-mono text-2xl font-normal leading-9 text-[#3E4953] m-0 max-w-253 max-md:text-base max-md:leading-6.5">
              We didn't start as bankers trying to code — we started as
              developers trying to move money. Our SDKs works, and our APIs
              don't require a PhD in financial services.
            </p>
            <button className="flex items-center gap-2 py-6 px-10 rounded-lg border border-[#1D5EFF] bg-[#1D5EFF] text-white font-mono text-xl font-medium cursor-pointer transition-all duration-200 whitespace-nowrap hover:bg-[#1550e0] hover:shadow-[0_4px_16px_rgba(29,94,255,0.35)] hover:-translate-y-px max-[480px]:py-3.5 max-[480px]:px-6 max-[480px]:text-base">
              Read API Docs
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4.58333 10H15M15 10L10 15M15 10L10 5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default APISectionAndCTA;
