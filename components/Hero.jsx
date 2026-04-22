"use client";
import { useTheme } from "./ThemeContext";
import React from "react";

const logos = [
  { light: "/Bridge.svg", dark: "/dark Bridge.svg", alt: "Bridge" },
  { light: "/Coinpass.svg", dark: "/dark coinpass.svg", alt: "Coinpass" },
  { light: "/GTbank.svg", dark: "/dark alt bank.svg", alt: "GTBank" },
  { light: "/Habari.svg", dark: "/dark habari.svg", alt: "Habari" },
  { light: "/Juicyway.svg", dark: "/dark juicyway.svg", alt: "Juicyway" },
  { light: "/Nala.svg", dark: "/Nala.svg", alt: "Nala" },
  { light: "/Nvidia.svg", dark: "/dark nvidia.svg", alt: "Nvidia" },
  { light: "/Openfx.svg", dark: "/dark openfx.svg", alt: "Openfx" },
  { light: "/Quidax.svg", dark: "/dark quidax.svg", alt: "Quidax" },
  { light: "/Sarepay.svg", dark: "/dark sarepay.svg", alt: "Sarepay" },
  { light: "/thealtbank.svg", dark: "/dark alt bank.svg", alt: "The Alt Bank" },
  { light: "/Verto.svg", dark: "/dark verto.svg", alt: "Verto" },
  {
    light: "/dark wintermute.svg",
    dark: "/dark wintermute.svg",
    alt: "Wintermute",
  },
  { light: "/Yellowcard.svg", dark: "/Yellowcard.svg", alt: "Yellowcard" },
  { light: "/Zuniq.svg", dark: "/Zuniq.svg", alt: "Zuniq" },
];

const businessLogos = [
  { light: "/ABinbev.svg", dark: "/dark abinbev.svg", alt: "AB InBev" },
  { light: "/Bedrock.svg", dark: "/dark bedrock.svg", alt: "Bedrock" },
  { light: "/Sycamore.svg", dark: "/dark sycamore.svg", alt: "Sycamore" },
  {
    light: "/Ventureforafrica.svg",
    dark: "/dark venture.svg",
    alt: "Venture for Africa",
  },
];

const Hero = () => {
  const { dark } = useTheme();

  return (
    <section className="relative overflow-hidden pt-20 pb-0 max-md:pt-12 bg-[#EEF3FF]">
      {/* Blobs */}
      <div className="absolute w-120 h-120 rounded-full blur-[60px] pointer-events-none z-0 bg-[linear-gradient(87deg,rgba(132,122,255,0.08)_0%,rgba(8,111,255,0.08)_100%)] -right-10 top-50" />
      <div className="absolute w-120 h-120 rounded-full blur-[60px] pointer-events-none z-0 bg-[linear-gradient(87deg,rgba(132,122,255,0.08)_0%,rgba(8,111,255,0.08)_100%)] -left-25 -top-39" />

      {/* Content */}
      <div className="relative z-3 flex justify-center px-5">
        <div className="flex flex-col items-center gap-6 max-w-229 w-full text-center">
          <h1 className="font-inter text-[80px] font-bold leading-23 text-[#13161A] m-0 whitespace-nowrap max-lg:text-[60px] max-lg:leading-18 max-md:text-[40px] max-md:leading-13 max-md:whitespace-normal max-[480px]:text-[32px] max-[480px]:leading-10.5">
            Move Money{" "}
            <span className="bg-linear-to-r from-[#847AFF] to-[#086FFF] bg-clip-text text-transparent">
              Anywhere
            </span>
          </h1>

          <p className="font-mono text-xl font-normal leading-8 text-[#3E4953] m-0 max-md:text-base max-md:leading-6.5">
            Move money globally. One API, multiple countries, zero complexity.
          </p>

          <div className="flex items-center gap-4 max-[480px]:flex-col max-[480px]:w-full">
            <a
              href="https://platform.pcxpay.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:bg-[#1550e0] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(29,94,255,0.38)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(29,94,255,0.2)] flex items-center gap-2 py-5 px-16 rounded-lg border border-[#1D5EFF] bg-[#1D5EFF] text-white font-mono text-base font-medium whitespace-nowrap max-md:py-3.5 max-md:px-8 max-md:text-sm max-[480px]:w-full max-[480px]:justify-center max-[480px]:px-6 no-underline"
            >
              Get Started
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3.667 8H12m0 0L8 12m4-4L8 4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="https://docs.pcxpay.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center py-4 px-6 bg-transparent border-none text-[#1D5EFF] font-mono text-base font-medium transition-all duration-200 hover:opacity-70 hover:translate-x-0.5 no-underline"
            >
              Read API Docs
            </a>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative w-full mt-4 z-1">
        <img
          src="/world_map_countries.svg"
          alt=""
          aria-hidden="true"
          className="w-full h-auto block pointer-events-none"
        />
      </div>

      {/* Partners */}
      <div
        className="relative z-3 pt-24 pb-12 text-center overflow-hidden max-md:pt-16 max-md:pb-10 max-md:px-6"
        style={{
          background:
            "linear-gradient(to bottom, #EEF3FF 0%, #f4f7ff 18%, #f9fbff 38%, #ffffff 62%)",
        }}
      >
        <p className="font-bold font-mono text-[13px] text-[#657688] uppercase tracking-[0.06em] mb-8 px-5">
          OUR PARTNERS
        </p>

        {/* Marquee — all logos combined */}
        <div className="marquee-track relative overflow-hidden w-full max-w-300 mx-auto before:absolute before:left-0 before:top-0 before:bottom-0 before:w-30 before:z-2 before:pointer-events-none before:bg-[linear-gradient(to_right,rgba(244,247,255,1),transparent)] after:absolute after:right-0 after:top-0 after:bottom-0 after:w-30 after:z-2 after:pointer-events-none after:bg-[linear-gradient(to_left,rgba(244,247,255,1),transparent)]">
          <div className="flex items-center gap-16 w-max animate-[marquee-scroll_40s_linear_infinite] hover:[animation-play-state:paused]">
            {[...logos, ...businessLogos, ...logos, ...businessLogos].map(
              (logo, i) => (
                <img
                  key={i}
                  src={dark ? logo.dark : logo.light}
                  alt={logo.alt}
                  className="h-9 w-auto object-contain opacity-85 transition-opacity duration-250 shrink-0 hover:opacity-100"
                />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
