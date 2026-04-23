"use client";
import { useTheme } from "./ThemeContext";
import BenefitCard from "../components/BenefitCard";

const BENEFITS = [
  {
    title: "Global Payment Solutions",
    description:
      "One API with global reach that enables payments across multiple countries.",
    icon: "/globe.svg",
  },
  {
    title: "Boost Your Earnings on Every Transaction",
    description:
      "Revenue share so you earn on every transaction without managing rails yourself.",
    icon: "/rocket.svg",
  },
  {
    title: "Focus on Growth, We Handle Compliance",
    description:
      "Invisible compliance through our partnerships that cover regulations while you focus on growth",
    icon: "/signal.svg",
  },
];

const EmbeddedFinance = () => {
  const { dark } = useTheme();
  return (
    <div className="w-full min-h-screen">
      {/* Hero */}
      <div
        className="w-full"
        style={{
          background: dark
            ? "linear-gradient(to bottom, #070D1A 0%, #08101f 30%, #0a1222 60%, #0a1020 100%)"
            : "linear-gradient(to bottom, #EEF3FF 0%, #f4f7ff 30%, #f9fbff 60%, #ffffff 100%)",
        }}
      >
        {/* Constrained text content */}
        <div className="flex flex-col items-center text-center max-w-242 mx-auto pt-24 pb-10 max-md:pt-16 max-md:pb-8 px-6 max-md:px-4">
          <div className="text-[12px] sm:text-[14px] text-center rounded-full px-4 leading-10 max-md:leading-8 mx-auto bg-[linear-gradient(87deg,rgba(132,122,255,0.08)_0%,rgba(8,111,255,0.08)_100%)] text-[#1D5EFF] border border-transparent">
            EMBEDDED FINANCE
          </div>

          <h1 className="text-[40px] max-md:text-[26px] max-md:leading-tight sm:text-[80px] font-bold font-inter mx-auto mt-6 mb-4">
            Turn Your Platform Into a{" "}
            <span className="bg-linear-to-r from-[#847AFF] to-[#086FFF] bg-clip-text text-transparent">Fintech Instantly</span>
          </h1>

          <p className="text-[20px] max-md:text-sm max-md:leading-5.5 font-mono mx-auto text-[#3E4953] mb-8">
            Every platform needs payments but building them takes years of
            compliance, licensing, and infrastructure headaches. PCX turns that
            into a single integration.
          </p>

          <div className="flex items-center gap-4 max-[480px]:flex-col max-[480px]:w-full">
            <a
              href="https://platform.pcxpay.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:bg-[#1550e0] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(29,94,255,0.38)] active:translate-y-0 flex items-center gap-2 py-4 px-8 rounded-lg border border-[#1D5EFF] bg-[#1D5EFF] text-white font-mono text-base font-medium no-underline max-[480px]:w-full max-[480px]:justify-center"
            >
              Get Started
            </a>
            <a
              href="mailto:info@pcxpay.com?subject=Schedule%20a%20Demo"
              className="transition-all duration-200 hover:border-[rgba(29,94,255,0.35)] hover:bg-[rgba(29,94,255,0.06)] hover:-translate-y-0.5 flex items-center gap-2 py-4 px-8 rounded-lg border border-[rgba(29,94,255,0.2)] text-[#1D5EFF] font-mono text-base font-medium no-underline max-[480px]:w-full max-[480px]:justify-center"
            >
              Schedule a Demo →
            </a>
          </div>
        </div>

        {/* Nodes image — constrained to navbar width */}
        <div className="max-w-300 mx-auto px-6 max-md:px-4">
          <img
            src={dark ? "/dark PCX nodes left and right.svg" : "/New PCX nodes left and right.svg"}
            alt="PCX API connections"
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* Benefits */}
      <section className="w-full bg-white py-24 max-md:py-10">
        <div className="max-w-7xl mx-auto px-6 max-md:px-4">
          <div className="flex flex-col items-center mb-20 max-md:mb-8">
            <span className="font-mono text-sm max-md:text-sm font-bold text-gray-400 uppercase tracking-[0.3em]">
              Benefits
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-md:gap-4">
            {BENEFITS.map((item, index) => (
              <div
                key={index}
                className="transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(29,94,255,0.1)] rounded-2xl active:-translate-y-0.5"
              >
                <BenefitCard
                  title={item.title}
                  description={item.description}
                  iconPath={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmbeddedFinance;
