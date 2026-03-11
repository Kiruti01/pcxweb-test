import React from "react";

const storyCards = [
  {
    id: 1,
    imageLeft: false,
    title: "PCX wasn't born in a boardroom. It was born from necessity",
    body: "PCX wasn't born in a boardroom. It was born from necessity. In 2023, MyDevConnect was tasked with an impossible challenge: build a payment system for a global enterprise gaming platform that could profitably process €0.50 tournament payouts across multiple countries. Traditional payment rails would eat 200%+ in fees. Crypto was too volatile. Banks laughed at us.",
    image: "/boardroom.svg",
    bullets: null,
  },
  {
    id: 2,
    imageLeft: true,
    title: "So we built PCX - because we had no choice",
    body: "What started as a solution for gaming micropayments revealed a massive market failure. If Fortune 500 companies couldn't make cross-border micropayments work with unlimited resources, what chance did African SMEs have? What about platforms trying to pay creators globally? What about the entire €700 billion remittance market?",
    image: "/payment.svg",
    bullets: null,
  },
  {
    id: 3,
    imageLeft: false,
    title: "From Incubation to Infrastructure",
    body: "PCX was incubated at MyDevConnect with a simple goal: solve payments for one client perfectly, then scale that solution globally.",
    image: "/infra.svg",
    bullets: [
      "Processed millions in cross-border payments.",
      "Secured partnerships with Circle, Bridge and Yellow Card.",
      "Built a distributed engineering team across 6 countries.",
    ],
  },
];

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Hero */}
      <section className="bg-transparent pt-32 max-md:pt-20 pb-20 max-md:pb-12 px-5 text-center">
        <div className="max-w-360 mx-auto px-10 max-md:px-3">
          <div className="inline-flex items-center px-5 py-2 max-md:px-3 max-md:py-1 rounded-full border border-[rgba(29,94,255,0.3)] bg-[rgba(29,94,255,0.06)] mb-8 max-md:mb-5 transition-all duration-220 hover:bg-[rgba(29,94,255,0.1)] hover:border-[rgba(29,94,255,0.5)] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(29,94,255,0.1)]">
            <span className="font-mono text-[11px] sm:text-xs max-md:text-[10px] font-semibold text-[#1D5EFF] uppercase tracking-[0.12em]">
              Company
            </span>
          </div>
          <h1 className="font-inter text-[72px] font-bold leading-[1.1] bg-linear-to-r from-[#847AFF] to-[#086FFF] bg-clip-text text-transparent m-0 max-w-225 mx-auto max-lg:text-[56px] max-md:text-[28px] max-md:leading-[1.2] max-[480px]:text-[24px]">
            Built From Real Pain, Not Theoretical Problems
          </h1>
        </div>
      </section>

      {/* Story Cards */}
      <section className="pb-20 max-md:pb-12 px-5 max-md:px-3">
        <div className="max-w-250 mx-auto flex flex-col gap-8 max-md:gap-5">
          {storyCards.map((card) => (
            <div
              key={card.id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-[rgba(200,200,220,0.4)] p-10 max-md:p-5 flex gap-12 max-md:gap-6 items-center transition-all duration-280 hover:-translate-y-1 hover:border-[rgba(29,94,255,0.2)] hover:shadow-[0_12px_48px_rgba(29,94,255,0.08)] hover:bg-white/95 active:-translate-y-0.5 max-md:flex-col max-[480px]:p-4"
            >
              {/* Text */}
              <div
                className={`flex-1 ${card.imageLeft ? "order-2 max-md:order-1" : "order-1"}`}
              >
                <h2 className="font-inter text-2xl max-md:text-base font-bold leading-[1.3] text-[#13161A] mb-4 max-md:mb-2.5 transition-colors duration-220 group-hover:text-[#1D5EFF] max-[480px]:text-sm">
                  {card.title}
                </h2>
                <p className="font-mono text-sm max-md:text-xs font-normal leading-6 max-md:leading-5 text-[#3E4953] m-0">
                  {card.body}
                </p>
                {card.bullets && (
                  <div className="mt-4 max-md:mt-3">
                    <p className="font-mono text-sm max-md:text-xs text-[#3E4953] mb-2">
                      We've:
                    </p>
                    <ul className="list-disc list-inside flex flex-col gap-1">
                      {card.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="font-mono text-sm max-md:text-xs text-[#3E4953] leading-6 max-md:leading-5 transition-all duration-200 hover:text-[#1D5EFF] hover:translate-x-1"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Image */}
              <div
                className={`w-70 max-md:w-full shrink-0 max-md:max-w-[280px] max-md:mx-auto transition-all duration-300 group-hover:scale-104 group-hover:-translate-y-1 group-hover:drop-shadow-[0_8px_24px_rgba(29,94,255,0.15)] ${card.imageLeft ? "order-1 max-md:order-2" : "order-2"}`}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
