"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const vp = { once: true, amount: 0.1 };

const inputClass =
  "w-full p-4 rounded-[10px] border border-[rgba(210,218,230,0.6)] dark:border-white/10 bg-[rgba(230,232,238,0.4)] dark:bg-white/[0.08] font-mono text-sm text-[#13161A] dark:text-white/90 outline-none transition-all duration-200 placeholder:text-[#B8C4D0] dark:placeholder:text-white/30 hover:border-[rgba(29,94,255,0.28)] focus:border-[#1D5EFF] focus:bg-white/85 dark:focus:bg-white/[0.12] focus:shadow-[0_0_0_3px_rgba(29,94,255,0.1)]";
const labelClass =
  "block font-mono text-[13px] font-bold tracking-[0.14em] uppercase text-[#A0AEC0] dark:text-white/40 mb-1.5";

const InfoBlocks = () => (
  <>
    <div>
      <p className="font-mono text-[13px] font-bold tracking-[0.15em] uppercase text-[#A0AEC0] mb-2">
        Email Address
      </p>
      <a
        href="mailto:info@pcxpay.com"
        className="font-mono text-sm text-[#13161A] dark:text-white/90 leading-7 hover:text-[#1D5EFF] transition-colors duration-200"
        style={{ textDecoration: "none" }}
      >
        info@pcxpay.com
      </a>
    </div>
    <div>
      <p className="font-mono text-[13px] font-bold tracking-[0.15em] uppercase text-[#A0AEC0] mb-2">
        Address
      </p>
      <span className="font-mono text-sm text-[#13161A] dark:text-white/90 leading-7">
        Office 10510C, 92 Castle Street,
        <br />
        Area 1/1, Belfast, Northern
        <br />
        Ireland, BT1 1HE
      </span>
    </div>
    <div>
      <p className="font-mono text-[13px] font-bold tracking-[0.15em] uppercase text-[#A0AEC0] mb-2">
        Socials
      </p>
      <a
        href="https://linkedin.com/company/pcxpay"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#13161A] flex items-center justify-center transition-all duration-200 hover:bg-[#1D5EFF] hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(29,94,255,0.35)]"
        style={{ width: 40, height: 40 }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </a>
    </div>
    <div>
      <p className="font-mono text-[13px] font-bold tracking-[0.15em] uppercase text-[#A0AEC0] mb-2">
        Regulatory Credentials
      </p>
      <span className="font-mono text-sm text-[#13161A] dark:text-white/90 leading-7">
        {"FCA, FINTRAC & CBN Authorised"}
      </span>
    </div>
  </>
);

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    const handler = (e) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = (rows = 8) => (
    <>
      <div>
        <label className={labelClass}>Name</label>
        <input
          className={inputClass}
          type="text"
          name="name"
          placeholder="Your full name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className={labelClass}>Email Address</label>
        <input
          className={inputClass}
          type="email"
          name="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea
          className={`${inputClass} resize-none`}
          name="message"
          rows={rows}
          placeholder="Tell us how we can help..."
          value={form.message}
          onChange={handleChange}
          required
        />
      </div>
      {error && (
        <p className="font-mono text-sm text-red-500 text-center">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl border-none bg-[#1D5EFF] text-white font-mono text-[13px] font-bold tracking-[0.12em] uppercase cursor-pointer shadow-[0_4px_20px_rgba(29,94,255,0.32)] transition-all duration-200 hover:bg-[#1550e0] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(29,94,255,0.44)] active:scale-95 mt-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {loading ? "Sending..." : "Submit"}
      </button>
    </>
  );

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(to bottom, rgba(235,243,255,0) 60%, #ffffff 100%)" }}>
      <div className="max-w-6xl mx-auto px-6 py-16 max-md:py-10 max-md:px-4">
        {/* Badge + Heading */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center px-5 py-2 rounded-full border border-[rgba(29,94,255,0.3)] bg-[rgba(29,94,255,0.06)] mb-6 font-mono text-[11px] font-semibold tracking-[0.12em] uppercase text-[#1D5EFF] transition-[background-color,border-color,box-shadow,transform] duration-200 hover:bg-[rgba(29,94,255,0.1)] hover:border-[rgba(29,94,255,0.5)] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(29,94,255,0.1)]"
          >
            Contact Us
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(40px,7vw,80px)] font-extrabold leading-[1.05] bg-linear-to-r from-[#847AFF] to-[#086FFF] bg-clip-text text-transparent m-0"
          >
            Get In Touch
          </motion.h1>
        </motion.div>

        {submitted ? (
          <div className="text-center py-14 px-6">
            <div
              className="rounded-full bg-[rgba(29,94,255,0.1)] flex items-center justify-center mx-auto mb-5"
              style={{ width: 60, height: 60 }}
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path
                  d="M4 13l7 7L22 6"
                  stroke="#1D5EFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-inter text-[22px] font-bold text-[#13161A] dark:text-white mb-2">
              Message Sent!
            </h3>
            <p className="font-mono text-sm text-[#657688]">
              We'll get back to you at <strong>{form.email}</strong> shortly.
            </p>
          </div>
        ) : (
          <>
            {/* ── DESKTOP: glass card, two columns ── */}
            <div className="hidden md:block">
              <motion.div
                className="bg-white/22 backdrop-blur-md border border-white/35 rounded-3xl p-[80px_64px_120px] max-lg:p-[60px_40px_80px]"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
              >
                <div className="flex gap-16 items-start">
                  <div className="w-56 shrink-0 flex flex-col gap-9">
                    <InfoBlocks />
                  </div>
                  <div className="w-px self-stretch shrink-0 bg-gradient-to-b from-transparent via-[rgba(29,94,255,0.15)] to-transparent" />
                  <form
                    onSubmit={handleSubmit}
                    className="flex-1 flex flex-col gap-5"
                  >
                    {renderFormFields(8)}
                  </form>
                </div>
              </motion.div>
            </div>

            {/* ── MOBILE ── */}
            <motion.div
              className="md:hidden flex flex-col gap-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {renderFormFields(6)}
              </form>
              <div
                className="rounded-2xl p-6 flex flex-col gap-7"
                style={{
                  border: "1.5px dashed rgba(29,94,255,0.25)",
                  background: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(230,232,238,0.4)",
                }}
              >
                <InfoBlocks />
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
