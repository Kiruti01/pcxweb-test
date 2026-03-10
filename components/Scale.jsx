import React from "react";

const scaleItems = [
  {
    id: 1,
    icon: "building",
    title: "Fintechs and Neobanks",
    challenge:
      "Building global payment infrastructure takes years and millions in partnerships.",
    solution:
      "Access Lightning and stablecoin rails through one API. Launch cross-border payments in weeks, not years — without an 18-month integration.",
  },
  {
    id: 2,
    icon: "security",
    title: "FX & Payment Providers",
    challenge:
      "Legacy providers rely on correspondent banking. Customers expect instant settlement.",
    solution:
      "FX companies white-label our infrastructure to compete with digital natives. Offer 1-second settlement instead of 5-day delays — live under your brand in under 3 months.",
  },
  {
    id: 3,
    icon: "gamepad",
    title: "Gaming & Digital Entertainment",
    challenge: "Paying out €10 tournament prizes that cost €14 in fees.",
    solution:
      "Gaming platforms process thousands of micropayments profitably. Our optimisation engine makes €0.50 transactions viable — unlocking new monetization models.",
  },
];

const iconSvgs = {
  building: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M2.5 17.5H17.5M2.5 8.33203H17.5M4.16797 5L10.0013 2.5L15.8346 5M3.33203 8.33203V17.4987M16.668 8.33203V17.4987M6.66797 11.668V14.168M10 11.668V14.168M13.332 11.668V14.168"
        stroke="white"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  security: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M5.83333 12.5013H3.33333C3.11232 12.5013 2.90036 12.4135 2.74408 12.2572C2.5878 12.1009 2.5 11.889 2.5 11.668V5.0013C2.5 4.78029 2.5878 4.56833 2.74408 4.41205C2.90036 4.25577 3.11232 4.16797 3.33333 4.16797H13.3333C13.5543 4.16797 13.7663 4.25577 13.9226 4.41205C14.0789 4.56833 14.1667 4.78029 14.1667 5.0013V7.5013M5.83203 8.33333C5.83203 8.11232 5.91983 7.90036 6.07611 7.74408C6.23239 7.5878 6.44435 7.5 6.66536 7.5H16.6654C16.8864 7.5 17.0983 7.5878 17.2546 7.74408C17.4109 7.90036 17.4987 8.11232 17.4987 8.33333V15C17.4987 15.221 17.4109 15.433 17.2546 15.5893C17.0983 15.7455 16.8864 15.8333 16.6654 15.8333H6.66536C6.44435 15.8333 6.23239 15.7455 6.07611 15.5893C5.91983 15.433 5.83203 15.221 5.83203 15V8.33333ZM10 11.6667C10 12.1087 10.1756 12.5326 10.4882 12.8452C10.8007 13.1577 11.2246 13.3333 11.6667 13.3333C12.1087 13.3333 12.5326 13.1577 12.8452 12.8452C13.1577 12.5326 13.3333 12.1087 13.3333 11.6667C13.3333 11.2246 13.1577 10.8007 12.8452 10.4882C12.5326 10.1756 12.1087 10 11.6667 10C11.2246 10 10.8007 10.1756 10.4882 10.4882C10.1756 10.8007 10 11.2246 10 11.6667Z"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  gamepad: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M14.5821 14.582C16.6654 17.4987 19.9559 15.3446 19.1654 12.4987C18.0534 8.49534 17.4162 6.15403 17.0638 4.84107C16.8259 3.95471 16.0216 3.33203 15.1038 3.33203L4.89364 3.33203C3.9759 3.33203 3.17619 3.95673 2.95284 4.84688C2.2788 7.53329 1.67018 9.91398 0.952206 12.4987C0.161666 15.3446 3.45221 17.4987 5.53554 14.582M14.9995 7.08203L15.0087 7.09036M13.7417 5.83203L13.7509 5.84036M13.7417 8.33203L13.7509 8.34036M12.4995 7.08203L12.5087 7.09036M5.83203 5.83203V8.33203M4.58203 7.08203H7.08203M6.66667 13.3333C7.58714 13.3333 8.33333 12.5871 8.33333 11.6667C8.33333 10.7462 7.58714 10 6.66667 10C5.74619 10 5 10.7462 5 11.6667C5 12.5871 5.74619 13.3333 6.66667 13.3333ZM13.3346 13.3333C14.2551 13.3333 15.0013 12.5871 15.0013 11.6667C15.0013 10.7462 14.2551 10 13.3346 10C12.4142 10 11.668 10.7462 11.668 11.6667C11.668 12.5871 12.4142 13.3333 13.3346 13.3333Z"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const Scale = () => {
  return (
    <section className="scale-section py-30 px-5 max-md:px-3 relative max-md:py-20">
      <div className="max-w-360 mx-auto px-10 max-lg:px-7.5 max-md:px-2">
        <h2 className="font-inter text-[80px] font-bold leading-24.25 text-[#2A3239] text-center m-0 mb-20 max-lg:text-[60px] max-lg:leading-18 max-lg:mb-15 max-md:text-[40px] max-md:leading-12 max-md:mb-12 max-[480px]:text-[28px] max-[480px]:leading-9">
          Built For Every Scale
        </h2>

        <div className="flex flex-col gap-12 max-w-270 mx-auto max-md:gap-8 max-md:max-w-full">
          {scaleItems.map((item) => (
            <div
              key={item.id}
              className="scale-card group p-12 rounded-4xl bg-white shadow-[0_4px_48px_0_rgba(0,0,0,0.05)] overflow-hidden relative transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_12px_56px_0_rgba(8,111,255,0.1)] active:-translate-y-0.5 max-md:p-8 max-[480px]:p-5"
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-12 relative z-2 max-md:mb-8 max-[480px]:gap-2">
                <div className="flex w-10 h-10 p-2.5 justify-center items-center aspect-square rounded-[10px] bg-linear-to-r from-[#847AFF] to-[#086FFF] shrink-0 transition-all duration-220 group-hover:scale-110 group-hover:-rotate-4 group-hover:shadow-[0_4px_16px_rgba(8,111,255,0.4)]">
                  {iconSvgs[item.icon]}
                </div>
                <h3 className="scale-card-title font-inter text-xl font-medium leading-7 text-[#13161A] m-0 transition-colors duration-200 group-hover:text-[#086FFF] max-md:text-lg max-md:leading-6 max-[480px]:text-base">
                  {item.title}
                </h3>
              </div>

              {/* Challenge / Solution */}
              <div className="grid grid-cols-2 gap-16 relative z-1 max-lg:grid-cols-1 max-lg:gap-8">
                <div className="scale-challenge-box p-4 flex-col gap-2.25 rounded-lg border-[0.4px] border-[rgba(238,14,14,0.08)] bg-[#FEF5F5] transition-all duration-220 hover:-translate-y-0.5 hover:border-[rgba(238,14,14,0.2)] hover:bg-[#fdeaea] hover:shadow-[0_4px_20px_rgba(238,14,14,0.07)] active:translate-y-0">
                  <span className="font-mono text-base font-medium leading-5 text-[#EE0E0E] block max-[480px]:text-sm">
                    THE CHALLENGE
                  </span>
                  <p className="font-mono text-base font-normal leading-6 text-[#3E4953] m-0 max-[480px]:text-sm max-[480px]:leading-5">
                    {item.challenge}
                  </p>
                </div>

                <div className="scale-solution-box p-4 flex-col gap-2.25 rounded-lg border-[0.4px] border-[#847AFF] bg-[linear-gradient(87deg,rgba(132,122,255,0.04)_0%,rgba(8,111,255,0.04)_100%)] transition-all duration-220 hover:-translate-y-0.5 hover:border-[#086FFF] hover:bg-[linear-gradient(87deg,rgba(132,122,255,0.1)_0%,rgba(8,111,255,0.1)_100%)] hover:shadow-[0_4px_20px_rgba(8,111,255,0.1)] active:translate-y-0">
                  <span className="font-mono text-base font-medium leading-5 bg-linear-to-r from-[#847AFF] to-[#086FFF] bg-clip-text text-transparent block max-[480px]:text-sm">
                    THE PCX SOLUTION
                  </span>
                  <p className="font-mono text-base font-normal leading-6 text-[#3E4953] m-0 max-[480px]:text-sm max-[480px]:leading-5">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Scale;
