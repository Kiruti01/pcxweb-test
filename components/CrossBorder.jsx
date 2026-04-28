"use client";
import { motion } from "framer-motion";
import BenefitCard from "../components/BenefitCard";
import CurrencyConverter from "../components/Calculator/Currencyconverter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const vp = { once: true, amount: 0.15 };

const BENEFITS = [
  {
    title: "Quick Payments, Instant Growth!",
    description:
      "Instant settlement with payments clearing in under two seconds anywhere.",
    icon: "/quick.svg",
  },
  {
    title: "Global Reach, Local Impact",
    description:
      "Global corridors with direct coverage across Africa, Europe and beyond through strategic partnership.",
    icon: "/globe.svg",
  },
  {
    title: "Honest Pricing, Zero Hidden Fees",
    description:
      "We've built our pricing around complete transparency. There are no unexpected charges, and we provide full cost breakdowns so you understand every dollar.",
    icon: "/honest.svg",
  },
];

const CrossBorder = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 max-md:px-5 pt-24 max-md:pt-16 pb-20 max-md:pb-12 flex flex-col lg:flex-row items-center justify-between gap-16 max-md:gap-10 max-md:text-center">
        {/* Left */}
        <motion.div
          className="flex flex-col items-start max-md:items-center text-left max-md:text-center max-w-2xl"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center px-5 py-2 max-md:px-3 max-md:py-1 rounded-full bg-[linear-gradient(87deg,rgba(132,122,255,0.08)_0%,rgba(8,111,255,0.08)_100%)] border border-transparent mb-6 max-md:mb-4 transition-[background-color,border-color,box-shadow,transform] duration-220 hover:bg-[rgba(29,94,255,0.06)] hover:border-[rgba(29,94,255,0.35)] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(29,94,255,0.1)]"
          >
            <span className="font-mono text-[11px] sm:text-xs font-semibold text-[#1D5EFF] uppercase tracking-[0.12em]">
              Cross Border Payments
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-inter text-[64px] lg:text-[80px] max-md:text-[24px] max-md:leading-[1.25] font-bold leading-[1.05] text-[#1A1A1A] mb-6 max-md:mb-4"
          >
            Global Payments <br className="hidden max-md:block" />
            Made <span className="text-blue-600">Affordable</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[#657688] text-xl max-md:text-[13px] max-md:leading-5 leading-relaxed mb-10 max-md:mb-6 max-w-lg"
          >
            By combining stablecoins and smart routing, we make international
            transfers instant, transparent and profitable even for micropayments
            that legacy providers cannot support.
          </motion.p>

          <motion.a
            variants={fadeUp}
            href="https://platform.pcxpay.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:bg-[#1550e0] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(29,94,255,0.38)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(29,94,255,0.2)] w-full max-w-66.5 max-md:max-w-56 h-15.25 max-md:h-12 bg-[#1D5EFF] text-white my-8 max-md:my-6 rounded-md font-mono font-medium text-base max-md:text-sm border-none inline-flex items-center justify-center no-underline"
          >
            Get Started
          </motion.a>
        </motion.div>

        {/* Right — live converter */}
        <motion.div
          className="w-full max-w-120 max-md:max-w-full shrink-0"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <CurrencyConverter />
        </motion.div>
      </main>

      {/* Benefits */}
      <section className="benefit-section w-full bg-white py-24 max-md:py-10">
        <div className="max-w-7xl mx-auto px-6 max-md:px-4">
          <motion.div
            className="flex flex-col items-center mb-20 max-md:mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <span className="font-mono text-sm font-bold text-gray-400 uppercase tracking-[0.3em]">
              Benefits
            </span>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 max-md:gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            {BENEFITS.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(29,94,255,0.1)] rounded-2xl active:-translate-y-0.5"
              >
                <BenefitCard
                  title={item.title}
                  description={item.description}
                  iconPath={item.icon}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CrossBorder;
