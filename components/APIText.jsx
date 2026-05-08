"use client";
import { motion } from "framer-motion";

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

const vp = { once: true, amount: 0.2 };

const APIText = () => {
  return (
    <section
      className="api-text-section w-full py-14 px-6"
    >
      <motion.div
        className="max-w-300 mx-auto"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
      >
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-tight mb-4 text-[#13161A] max-w-2xl"
          style={{
            fontSize: "clamp(24px, 4vw, 40px)",
            letterSpacing: "-0.5px",
          }}
        >
          Finally, A{" "}
          <span className="bg-linear-to-r from-[#847AFF] to-[#086FFF] bg-clip-text text-transparent">
            Payment API
          </span>{" "}
          That Doesn't Make You Want to Quit Engineering
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-[#657688] text-[15px] leading-[1.7] mb-6 font-mono max-w-xl"
        >
          We didn't start as bankers trying to code — we started as developers
          trying to move money. Our SDKs work, and our APIs don't require a PhD
          in financial services.
        </motion.p>
        <motion.a
          variants={fadeUp}
          href="https://apiaws.docs.apiary.io/#/"
          target="_blank"
          rel="noopener noreferrer"
          className="hiw-btn-primary inline-flex items-center gap-2 bg-[#1D5EFF] text-white font-mono text-sm font-semibold px-6 py-3 rounded-full border-none shadow-[0_4px_20px_rgba(29,94,255,0.32)] no-underline transition-all duration-200 hover:bg-[#1550e0] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(29,94,255,0.44)]"
        >
          Read API Docs →
        </motion.a>
      </motion.div>
    </section>
  );
};

export default APIText;
