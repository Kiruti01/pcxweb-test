"use client";
import { useTheme } from "./ThemeContext";
import React from "react";
import WorldMap from "./WorldMap";

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
    <section className="bg-transparent relative overflow-hidden pt-20 pb-0 max-md:pt-12">
      {/* Blobs */}
      <div className="absolute w-120 h-120 rounded-full blur-[60px] pointer-events-none z-0 bg-[linear-gradient(87deg,rgba(132,122,255,0.08)_0%,rgba(8,111,255,0.08)_100%)] -right-10 top-50" />
      <div className="absolute w-120 h-120 rounded-full blur-[60px] pointer-events-none z-0 bg-[linear-gradient(87deg,rgba(132,122,255,0.08)_0%,rgba(8,111,255,0.08)_100%)] -left-25 -top-39" />

      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 w-full h-33.75 bg-[linear-gradient(174deg,rgba(255,255,255,0)_5.25%,rgba(255,255,255,0.5)_53.62%,rgba(255,255,255,0.75)_78.27%,#fff_102.91%)] z-2 pointer-events-none" />

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
              href="https://apiaws.docs.apiary.io/#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center py-4 px-6 bg-transparent border-none text-[#1D5EFF] font-mono text-base font-medium transition-all duration-200 hover:opacity-70 hover:translate-x-0.5 no-underline"
            >
              Read API Docs
            </a>
          </div>
        </div>
      </div>

      {/*
        Map container:
        - Desktop (lg+):      h-205, no scaling needed
        - Tablet (md–lg):     h-125, no scaling
        - Mobile (sm–md):     h-[420px], scale-[1.35] — slightly zoomed, centred
        - Small mobile (<480):h-[340px], scale-[1.2]  — minimal zoom, full map visible
        
        Key change: removed the aggressive scale-[2.2] that was cropping heavily.
        Now we allow only ~20–35% zoom on mobile so the full world map is visible
        with just slight left/right edge crop.
      */}
      <div
        className="relative z-1 w-full mt-5 transition-all duration-400 hover:brightness-105 hover:saturate-110 cursor-pointer overflow-hidden"
        style={{ height: "clamp(220px, 55vw, 820px)" }}
      >
        <div className="w-full h-full max-md:scale-[1.3] max-md:origin-[center_28%] max-[480px]:scale-[1.15] max-[480px]:origin-[center_28%]">
          <WorldMap />
        </div>
      </div>

      {/* Partners */}
      <div className="relative z-3 bg-white py-12 text-center overflow-hidden max-md:py-10 max-md:px-6">
        <p className="font-mono text-[13px] font-medium text-[#657688] uppercase tracking-[0.06em] mb-8 px-5">
          TRUSTED BY LEADING FINANCIAL INSTITUTIONS
        </p>

        {/* Marquee */}
        <div className="marquee-track relative overflow-hidden w-full max-w-300 mx-auto before:absolute before:left-0 before:top-0 before:bottom-0 before:w-30 before:z-2 before:pointer-events-none before:bg-linear-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:bottom-0 after:w-30 after:z-2 after:pointer-events-none after:bg-linear-to-l after:from-white after:to-transparent">
          <div className="flex items-center gap-16 w-max animate-[marquee-scroll_30s_linear_infinite] hover:[animation-play-state:paused]">
            {[...logos, ...logos].map((logo, i) => (
              <img
                key={i}
                src={dark ? logo.dark : logo.light}
                alt={logo.alt}
                className="h-9 w-auto object-contain opacity-85 transition-opacity duration-250 shrink-0 hover:opacity-100"
              />
            ))}
          </div>
        </div>

        <p className="font-mono text-[13px] font-medium text-[#657688] uppercase tracking-[0.06em] mt-12 mb-8 px-5">
          BUSINESSES USING PCX TO MOVE MONEY GLOBALLY
        </p>

        <div className="flex items-center justify-center gap-8 flex-wrap px-6 max-md:gap-6 max-md:grid max-md:grid-cols-2 max-md:justify-items-center max-[480px]:gap-4">
          {businessLogos.map((logo, i) => (
            <div
              key={i}
              className="group flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-220 hover:-translate-y-1 hover:scale-104 hover:bg-[rgba(29,94,255,0.05)] hover:shadow-[0_8px_28px_rgba(29,94,255,0.1)] active:-translate-y-0.5 active:scale-101"
            >
              <img
                src={dark ? logo.dark : logo.light}
                alt={logo.alt}
                className="h-9 max-md:h-10 w-auto object-contain opacity-85 transition-all duration-220 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
