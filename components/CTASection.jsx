"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const vp = { once: true, amount: 0.15 };

const arrowIcon = (
  <svg
    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M4.00003 12.6666L12.6667 3.99997M12.6667 3.99997V12.32M12.6667 3.99997H4.3467"
      stroke="#FEF2CB"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ctaCards = [
  {
    title: "For Developers",
    label: "Check the API Docs",
    href: "https://apiaws.docs.apiary.io/#/",
    external: true,
  },
  {
    title: "For Platforms",
    label: "Start Embedding",
    href: "/embedded-finance",
    external: false,
  },
  {
    title: "For Enterprises",
    label: "Cross-Border Payments",
    href: "/cross-border-payments",
    external: false,
  },
];

const CTASection = () => {
  return (
    <section className="px-6 pb-20 bg-transparent max-lg:pb-15 max-md:px-4 max-md:pb-10">
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-[#00237A] p-20 max-w-300 mx-auto max-lg:p-[60px_40px] max-md:p-8 max-md:px-5 max-md:rounded-2xl mt-25 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-size-[24px_24px]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
      >
        {/* Content */}
        <motion.div
          className="flex flex-col items-center gap-10 max-md:gap-6 text-center mb-16 max-md:mb-10 max-[480px]:mb-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <motion.h2
            variants={fadeUp}
            className="font-inter text-[80px] font-bold leading-[1.2] text-white m-0 max-lg:text-[60px] max-lg:leading-[1.2] max-md:text-[26px] max-md:leading-tight max-[480px]:text-[22px] max-[480px]:leading-7"
          >
            Make Money Borderless
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-mono text-xl font-normal leading-8 text-white max-w-230 m-0 max-md:text-sm max-md:leading-5.5"
          >
            Stop building payment infrastructure. Start shipping features that
            matter. Join the platforms already moving money globally with PCX.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 max-md:flex-col max-md:w-full max-md:gap-3"
          >
            <Link
              href="/cross-border-payments"
              className="transition-all duration-200 hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(254,242,203,0.45)] active:translate-y-0 flex py-5 px-10 max-md:py-3.5 max-md:px-6 justify-center items-center gap-2.5 rounded-lg border border-[#FEF2CB] bg-[#FEF2CB] text-[#001752] font-mono text-base max-md:text-sm font-medium whitespace-nowrap w-80 max-md:w-full no-underline"
            >
              Move Your Money
            </Link>
            <Link
              href="/embedded-finance"
              className="transition-all duration-200 hover:border-[rgba(254,242,203,0.45)] hover:bg-[rgba(254,242,203,0.22)] hover:-translate-y-0.5 active:translate-y-0 flex py-5 px-10 max-md:py-3.5 max-md:px-6 justify-center items-center gap-2.5 rounded-lg border-2 border-[rgba(254,242,203,0.12)] bg-[rgba(254,242,203,0.16)] text-[#FEF2CB] font-mono text-base max-md:text-sm font-medium whitespace-nowrap max-md:w-full no-underline"
            >
              Move Money For Your Users
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-3 gap-16 max-lg:grid-cols-2 max-lg:gap-8 max-md:grid-cols-1 max-md:gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          {ctaCards.map((card) => {
            const cardClass =
              "group w-full h-29.25 max-md:h-auto pt-8 px-6 pb-4 max-md:pt-5 max-md:px-4 max-md:pb-3 flex flex-col justify-between items-center rounded-2xl border-2 border-[#086FFF] bg-[linear-gradient(183deg,rgba(8,111,255,0.12)_2.19%,rgba(0,255,255,0.01)_270.74%)] transition-all duration-220 hover:-translate-y-1 hover:border-[rgba(8,111,255,0.7)] hover:bg-[linear-gradient(183deg,rgba(8,111,255,0.22)_2.19%,rgba(0,255,255,0.04)_270.74%)] hover:shadow-[0_8px_32px_rgba(8,111,255,0.25)] active:-translate-y-0.5 no-underline cursor-pointer";

            const inner = (
              <>
                <h3 className="font-inter text-xl max-md:text-base font-medium leading-6 text-white m-0 text-center">
                  {card.title}
                </h3>
                <span className="flex items-center gap-2 py-4 max-md:py-2.5 text-[#FEF2CB] font-mono text-base max-md:text-sm font-medium bg-transparent border-none transition-all duration-200 group-hover:gap-2.5 group-hover:text-white">
                  {card.label}
                  {arrowIcon}
                </span>
              </>
            );

            return card.external ? (
              <motion.a
                key={card.title}
                variants={fadeUp}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {inner}
              </motion.a>
            ) : (
              <motion.div key={card.title} variants={fadeUp}>
                <Link href={card.href} className={cardClass}>
                  {inner}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
