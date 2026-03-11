import BenefitCard from "../components/BenefitCard";

const BENEFITS = [
  {
    title: "Global Payment Solutions",
    description:
      "One API with global reach that enables payments across multiple countries.",
    icon: "/globe.svg",
  },
  {
    title: "Boost Your Earnings Effortlessly",
    description:
      "Revenue share so you earn on every transaction without managing rails yourself.",
    icon: "/rocket.svg",
  },
  {
    title: "Focus on growth Effortlessly",
    description:
      "Invisible compliance through our partnerships that cover regulations while you focus on growth",
    icon: "/signal.svg",
  },
];

const EmbeddedFinance = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Hero */}
      <main className="flex flex-col justify-center text-center max-w-242 mx-auto py-24 max-md:py-16 px-5">
        <div className="text-[12px] sm:text-[14px] text-center rounded-full w-37 sm:w-45.75 leading-10 max-md:leading-8 mx-auto bg-[linear-gradient(87deg,rgba(132,122,255,0.08)_0%,rgba(8,111,255,0.08)_100%)] text-[#1D5EFF] border border-transparent transition-all duration-220 hover:bg-[rgba(29,94,255,0.06)] hover:border-[rgba(29,94,255,0.35)] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(29,94,255,0.1)]">
          EMBEDDED FINANCE
        </div>

        <h1 className="max-w-84.75 sm:max-w-242 text-[40px] max-md:text-[26px] max-md:leading-[1.25] sm:text-[80px] font-bold font-inter mx-auto">
          Turn Your Platform Into a{" "}
          <span className="text-blue-600">Fintech Instantly</span>
        </h1>

        <p className="max-w-242 text-[20px] max-md:text-sm max-md:leading-5.5 font-mono mx-auto">
          Every platform needs payments but building them takes years of
          compliance, licensing, and infrastructure headaches. PCX turns that
          into a single integration.
        </p>
        <a
          href="https://platform.pcxpay.com/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-200 hover:bg-[#1550e0] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(29,94,255,0.38)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(29,94,255,0.2)] w-full max-w-66.5 max-md:max-w-56 h-15.25 max-md:h-12 bg-[#1D5EFF] text-white mx-auto my-8 max-md:my-6 rounded-md font-mono font-medium text-base max-md:text-sm border-none inline-flex items-center justify-center"
        >
          Get Started
        </a>

        <img
          src="/embedded-finance.svg"
          alt="Embedded Finance"
          className="mx-auto max-md:scale-125 max-md:origin-top max-md:mt-2 transition-all duration-350 hover:scale-[1.025] hover:-translate-y-1.5 hover:drop-shadow-[0_16px_40px_rgba(29,94,255,0.15)]"
        />
      </main>

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
