"use client";
import { useTheme } from "./ThemeContext";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const CAPABILITIES = [
  {
    title: "Global Virtual Accounts",
    description:
      "Create named accounts in USD, EUR, GBP, and stablecoins like USDC directly under your platform, enabling users to receive, hold, and manage funds.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#1D5EFF" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#1D5EFF" strokeWidth="1.5" />
        <path d="M2 12h20" stroke="#1D5EFF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4.5 7h15M4.5 17h15" stroke="#1D5EFF" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Payments & Payouts",
    description:
      "Accept incoming payments and send funds within your platform, giving you full control over how money moves between users, businesses, and internal accounts.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="3" stroke="#1D5EFF" strokeWidth="1.5" />
        <path d="M2 9h20" stroke="#1D5EFF" strokeWidth="1.5" />
        <rect x="5" y="13" width="4" height="2.5" rx="0.5" fill="#1D5EFF" opacity="0.5" />
        <rect x="10" y="13" width="3" height="2.5" rx="0.5" fill="#1D5EFF" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Instant Settlement",
    description:
      "Settle transactions in real time using optimized infrastructure, ensuring funds are available quickly and improving user experience.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" stroke="#1D5EFF" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Automated Reconciliation",
    description:
      "Map every transaction to a unique account for real-time tracking, clear fund attribution, and no manual reconciliation.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#1D5EFF" strokeWidth="1.5" />
        <path d="M7 12l3 3 7-7" stroke="#1D5EFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const VALUE_PROPS = [
  {
    icon: <img src="/fordevs.svg" alt="Developer Icon" className="w-12 h-12" />,
    audience: "For developers",
    title: "Build Fintech features without complexity",
    points: [
      "Simple APIs for virtual accounts and payments",
      "Sandbox + documentation for fast integration",
      "Webhooks for real-time transaction updates",
    ],
  },
  {
    icon: <img src="/forenterprises.svg" alt="Enterprise Icon" className="w-12 h-12" />,
    audience: "For enterprises",
    title: "Modernize your global payment operations",
    points: [
      "Centralized multicurrency treasury",
      "Faster cross-border settlements",
      "Reduced operational overhead",
    ],
  },
  {
    icon: <img src="/forplatforms.svg" alt="Platform Icon" className="w-12 h-12" />,
    audience: "For platforms & marketplaces",
    title: "Monetize and control your payment flows",
    points: [
      "Assign virtual accounts to users or merchants",
      "Automatically reconcile incoming payments",
      "Enable global payouts at scale",
    ],
  },
];

const vp = { once: true, amount: 0.15 };

const EmbeddedFinance = () => {
  const { dark } = useTheme();

  const cardBg = dark ? "rgba(255,255,255,0.04)" : "#ffffff";
  const cardBorder = dark ? "rgba(255,255,255,0.08)" : "#E8ECF0";
  const titleColor = dark ? "#ffffff" : "#13161A";
  const bodyColor = dark ? "rgba(255,255,255,0.55)" : "#6B7280";
  const sectionBg = dark ? "#0a1020" : "#ffffff";
  const altSectionBg = dark ? "#07101e" : "#F8FAFF";

  return (
    <div className="w-full">
      {/* ── Hero ── */}
      <div
        className="w-full"
        style={{
          background: dark
            ? "linear-gradient(to bottom, #070D1A 0%, #08101f 30%, #0a1222 60%, #0a1020 100%)"
            : "linear-gradient(to bottom, #EEF3FF 0%, #f4f7ff 30%, #f9fbff 60%, #ffffff 100%)",
        }}
      >
        <motion.div
          className="flex flex-col items-center text-center max-w-242 mx-auto pt-24 pb-10 max-md:pt-16 max-md:pb-8 px-6 max-md:px-4"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            className="text-[12px] sm:text-[14px] text-center rounded-full px-4 leading-10 max-md:leading-8 mx-auto bg-[linear-gradient(87deg,rgba(132,122,255,0.08)_0%,rgba(8,111,255,0.08)_100%)] text-[#1D5EFF] border border-transparent"
          >
            EMBEDDED FINANCE
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[40px] max-md:text-[26px] max-md:leading-tight sm:text-[80px] font-bold font-inter mx-auto mt-6 mb-4"
            style={{ color: titleColor }}
          >
            Turn Your Platform Into a{" "}
            <span className="bg-linear-to-r from-[#847AFF] to-[#086FFF] bg-clip-text text-transparent">
              Fintech Instantly
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[20px] max-md:text-sm max-md:leading-5.5 font-mono mx-auto text-[#3E4953] mb-8 max-w-2xl"
          >
            Embed global payments, wallets, and virtual accounts directly into
            your product. No licenses, no banking complexity — just one powerful
            integration.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 max-[480px]:flex-col max-[480px]:w-full"
          >
            <a
              href="https://platform.pcxpay.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:bg-[#1550e0] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(29,94,255,0.38)] active:translate-y-0 flex items-center gap-2 py-4 px-8 rounded-lg border border-[#1D5EFF] bg-[#1D5EFF] text-white font-mono text-base font-medium no-underline max-[480px]:w-full max-[480px]:justify-center"
            >
              Get Started
            </a>
          </motion.div>
        </motion.div>

        {/* Platform nodes diagram */}
        <motion.div
          className="max-w-300 mx-auto px-6 max-md:px-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.45 }}
        >
          <img
            src={dark ? "/dark PCX nodes left and right.svg" : "/New PCX nodes left and right.svg"}
            alt="PCX API connections"
            className="w-full h-auto block"
          />
        </motion.div>
      </div>

      {/* ── Core Capabilities ── */}
      <section className="w-full py-24 max-md:py-14" style={{ background: sectionBg }}>
        <div className="max-w-6xl mx-auto px-6 max-md:px-4">
          <motion.div
            className="flex flex-col items-center text-center mb-14 max-md:mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <span
              className="inline-flex items-center border border-[rgba(29,94,255,0.2)] rounded-full px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[#1D5EFF] mb-5"
              style={{ background: "rgba(29,94,255,0.05)" }}
            >
              Core Capabilities
            </span>
            <h2 className="font-bold font-inter text-[clamp(28px,4vw,48px)] leading-tight" style={{ color: titleColor }}>
              Everything You Need to Build{" "}
              <span className="bg-linear-to-r from-[#847AFF] to-[#086FFF] bg-clip-text text-transparent">
                Financial Experiences
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl p-8 max-md:p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(29,94,255,0.1)]"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(29,94,255,0.08)" }}>
                  {cap.icon}
                </div>
                <h3 className="font-bold font-inter text-[20px] max-md:text-base leading-snug" style={{ color: titleColor }}>
                  {cap.title}
                </h3>
                <p className="font-mono text-[15px] max-md:text-sm leading-relaxed" style={{ color: bodyColor }}>
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PCX Virtual Account ── */}
      <section className="w-full py-24 max-md:py-14" style={{ background: altSectionBg }}>
        <motion.div
          className="max-w-6xl mx-auto px-6 max-md:px-4 flex flex-col items-center text-center"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center border border-[rgba(29,94,255,0.2)] rounded-full px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[#1D5EFF] mb-5"
            style={{ background: "rgba(29,94,255,0.05)" }}
          >
            PCX Virtual Account
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-bold font-inter text-[clamp(28px,4vw,48px)] leading-tight max-w-3xl mb-4"
            style={{ color: titleColor }}
          >
            Global Virtual Accounts for Seamless{" "}
            <span className="bg-linear-to-r from-[#847AFF] to-[#086FFF] bg-clip-text text-transparent">
              Multi-Currency Transactions
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-mono text-[17px] max-md:text-sm leading-relaxed max-w-2xl mb-12"
            style={{ color: bodyColor }}
          >
            Create and manage virtual accounts in USD, EUR, GBP, and digital
            currencies like USDC — all from a single platform. Accept, hold, and
            move money globally with zero complexity.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(29,94,255,0.15)] border"
            style={{ borderColor: cardBorder, background: dark ? "#07101e" : "#ffffff" }}
          >
            <img
              src={dark ? "/Virtual Account redesign dark.svg" : "/Virtual Account redesign light.svg"}
              alt="PCX Virtual Account Dashboard"
              className="w-full h-auto block"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Value Propositions ── */}
      <section className="w-full py-24 max-md:py-14" style={{ background: sectionBg }}>
        <div className="max-w-6xl mx-auto px-6 max-md:px-4">
          <motion.div
            className="flex flex-col items-center text-center mb-14 max-md:mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <span
              className="inline-flex items-center border border-[rgba(29,94,255,0.2)] rounded-full px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[2px] text-[#1D5EFF] mb-5"
              style={{ background: "rgba(29,94,255,0.05)" }}
            >
              Value Propositions
            </span>
            <h2 className="font-bold font-inter text-[clamp(28px,4vw,48px)] leading-tight" style={{ color: titleColor }}>
              Built for{" "}
              <span className="bg-linear-to-r from-[#847AFF] to-[#086FFF] bg-clip-text text-transparent">
                Developers, Enterprises & Platforms
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            {VALUE_PROPS.map((valueProp, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl p-8 max-md:p-6 flex flex-col gap-4"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <div className="shrink-0">{valueProp.icon}</div>
                <span className="font-mono text-[16px] font-bold uppercase tracking-[2px] text-[#96A4B1]">
                  {valueProp.audience}
                </span>
                <h3 className="font-bold font-inter text-[18px] max-md:text-base leading-snug" style={{ color: titleColor }}>
                  {valueProp.title}
                </h3>
                <ul className="flex flex-col gap-3 mt-1">
                  {valueProp.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        className="mt-1 shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(29,94,255,0.1)" }}
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4L3.5 6L6.5 2" stroke="#1D5EFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="font-mono text-[14px] leading-relaxed" style={{ color: bodyColor }}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EmbeddedFinance;
