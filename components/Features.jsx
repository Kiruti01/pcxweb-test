import React from "react";

const Features = () => {
  return (
    <section className="features-section bg-white py-[80px_20px_120px] px-5 max-md:px-3 relative max-md:py-10">
      <div className="max-w-360 mx-auto px-10 max-lg:px-7.5 max-md:px-2">
        {/* Header */}
        <div className="text-center mb-20 max-md:mb-10">
          <h2 className="font-inter font-bold m-0 mb-8 max-md:mb-5 flex flex-col items-center gap-1">
            <span className="mt-12 max-md:mt-4 text-[32px] leading-[1.3] text-[#2A3239] font-bold max-lg:text-2xl max-md:text-lg max-[480px]:text-base">
              A Fully Integrated Service Platform For
            </span>
            <span className="text-[64px] leading-[1.2] bg-linear-to-r from-[#847AFF] to-[#086FFF] bg-clip-text text-transparent max-lg:text-5xl max-md:text-[28px] max-md:leading-[1.25] max-[480px]:text-2xl">
              Moving Money Globally
            </span>
          </h2>
          <p className="font-mono text-xl font-normal leading-8 text-[#3E4953] max-w-236.25 mx-auto max-md:text-sm max-md:leading-5.5">
            Our Platform unifies stablecoins, and traditional rails into one
            seamless infrastructure, so business can move money faster, cheaper
            and more reliably.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-12 mb-20 max-w-290 mx-auto max-lg:grid-cols-1 max-lg:gap-8 max-md:mb-15 max-md:max-w-full">
          <div className="group p-12 rounded-2xl border border-[rgba(200,200,220,0.6)] bg-[rgba(248,249,252,0.8)] relative transition-all duration-250 hover:-translate-y-1 hover:border-[rgba(29,94,255,0.25)] hover:bg-[rgba(240,245,255,0.9)] hover:shadow-[0_10px_48px_rgba(29,94,255,0.08)] active:-translate-y-0.5 max-md:p-6 max-[480px]:p-5">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4 max-w-100 max-md:max-w-full">
                <h3 className="font-inter text-2xl font-bold leading-8 text-[#13161A] m-0 transition-colors duration-200 group-hover:text-[#1D5EFF] max-md:text-lg max-[480px]:text-base max-[480px]:leading-6">
                  Cross-border Payments
                </h3>
                <p className="font-mono text-base font-normal leading-6 text-[#3E4953] m-0 max-md:text-sm max-md:leading-5.5">
                  Stop losing money to correspondent banks. Our Stable coin
                  rails and Lightning integration eliminates 3-5% fees while our
                  optimisation engine makes even €0.50 micro-transactions
                  profit.
                </p>
              </div>
            </div>
          </div>

          <div className="group p-12 rounded-2xl border border-[rgba(200,200,220,0.6)] bg-[rgba(248,249,252,0.8)] relative transition-all duration-250 hover:-translate-y-1 hover:border-[rgba(29,94,255,0.25)] hover:bg-[rgba(240,245,255,0.9)] hover:shadow-[0_10px_48px_rgba(29,94,255,0.08)] active:-translate-y-0.5 max-md:p-6 max-[480px]:p-5">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4 max-w-100 max-md:max-w-full">
                <h3 className="font-inter text-2xl font-bold leading-8 text-[#13161A] m-0 transition-colors duration-200 group-hover:text-[#1D5EFF] max-md:text-lg max-[480px]:text-base max-[480px]:leading-6">
                  Embedded Finance
                </h3>
                <p className="font-mono text-base font-normal leading-6 text-[#3E4953] m-0 max-md:text-sm max-md:leading-5.5">
                  Every platform needs to process payment. Not every platform
                  should build the tech behind it. Embed global payment
                  capabilities with a single integration. We handle the
                  complexity — you keep your focus.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-8 text-center max-w-199.75 mx-auto max-md:gap-6">
          <h3 className="font-inter text-[32px] font-medium leading-10 text-[#13161A] m-0 max-md:text-2xl max-md:leading-8 max-[480px]:text-xl max-[480px]:leading-7">
            One Platform to Accept Payments, Protect Revenue, and Control Your
            Finances
          </h3>
          <div className="flex items-center gap-4 max-[480px]:gap-3">
            <a
              href="https://platform.pcxpay.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:bg-[#1550e0] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(29,94,255,0.38)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(29,94,255,0.2)] flex py-5 px-10 justify-center items-center gap-2 rounded-lg border border-[#1D5EFF] bg-[#1D5EFF] text-white font-mono text-base font-medium whitespace-nowrap w-60 max-md:w-auto max-md:py-3.5 max-md:px-6 max-md:text-sm no-underline"
            >
              Get Started
            </a>
            <a
              href="https://apiaws.docs.apiary.io/#"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:border-[rgba(29,94,255,0.35)] hover:bg-[rgba(29,94,255,0.14)] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(29,94,255,0.1)] active:translate-y-0 flex py-5 px-10 justify-center items-center gap-2 rounded-lg border border-[rgba(29,94,255,0.16)] bg-[rgba(29,94,255,0.08)] text-[#1D5EFF] font-mono text-base font-medium whitespace-nowrap max-md:py-3.5 max-md:px-6 max-md:text-sm no-underline"
            >
              Start Building →
            </a>
          </div>
          <p className="font-mono text-sm font-normal leading-5 text-[#657688] italic m-0 max-md:text-xs max-md:leading-4.5">
            Explore the full platform with test data, no documents required to
            start
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
