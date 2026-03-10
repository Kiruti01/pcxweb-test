import React from "react";
import Link from "next/link";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "API Docs",
    href: "https://apiaws.docs.apiary.io/#",
    external: true,
  },
  { label: "Blog", href: "/blog" },
];

const productLinks = [
  { label: "Cross Border Payment", href: "/cross-border-payments" },
  { label: "Embedded Finance", href: "/embedded-finance" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms and Conditions", href: "/terms_and_conditions" },
  { label: "Security Policy", href: "#security" },
];

const Footer = () => {
  return (
    <footer className="w-full relative bg-white dot-grid-blue overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(174deg,rgba(255,255,255,0)_5.25%,rgba(255,255,255,0.5)_53.62%,rgba(255,255,255,0.75)_78.27%,#fff_102.91%)] pointer-events-none z-0" />

      {/* Main content */}
      <div className="w-full relative z-1 max-w-360 mx-auto pt-30 pb-0 px-20 flex flex-col gap-10 max-lg:pt-20 max-lg:pb-0 max-lg:px-10 max-md:pt-15 max-md:pb-0 max-md:px-6 max-sm:pt-10 max-sm:pb-0 max-sm:px-4 max-sm:gap-8">
        {/* Top row */}
        <div className="flex gap-40.25 items-start max-lg:gap-10 max-md:flex-col-reverse max-md:gap-10">
          {/* Legal text */}
          <div className="max-w-184 max-lg:max-w-120 shrink-0 max-lg:shrink">
            {[
              `In the UK – PCX PAY Limited (PCX) is an appointed agent of Lightway Finance Limited. Lightway Finance Limited is authorised by the Financial Conduct Authority (FCA) as an Authorised Payment Institution (Firm Reference Number: 574679) and is supervised by HM Revenue & Customs (HMRC) as a Registered Money Service Business (MSB).`,
              `In Canada – PCX PAY Limited is an appointed agent of Lightway Finance Limited. Lightway Finance Limited is authorised by Financial Transactions and Reports Analysis Centre of Canada (FINTRAC) as a Money Service Business (MSB) for virtual currency dealing and remittance services (Registered since: June 1, 2020).`,
              `In Nigeria – PCX PAY Limited is an appointed agent of Lightway Finance Limited. Lightway Finance Limited is authorised by the Central Bank of Nigeria (CBN) as an International Money Transfer Operator (IMTO).`,
            ].map((text, i) => (
              <p
                key={i}
                className="font-mono text-sm font-normal leading-5 text-[#3E4953] m-0 mb-4 last:mb-0 max-sm:text-xs max-sm:leading-4.5"
              >
                {text}
              </p>
            ))}
          </div>

          {/* Nav columns */}
          <div className="flex gap-20 flex-1 items-start max-lg:gap-8 max-md:gap-10">
            {/* Company */}
            <div className="flex flex-col gap-3">
              <h4 className="font-inter text-lg font-bold leading-5 text-[#13161A] m-0 max-sm:text-sm">
                COMPANY
              </h4>
              <ul className="flex flex-col list-none p-0 m-0">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-base font-normal leading-7 text-[#3E4953] no-underline transition-colors duration-200 hover:text-[#1D5EFF] max-sm:text-sm max-sm:leading-6"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="font-mono text-base font-normal leading-7 text-[#3E4953] no-underline transition-colors duration-200 hover:text-[#1D5EFF] max-sm:text-sm max-sm:leading-6"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* Socials — desktop only */}
              <div className="max-md:hidden flex flex-col gap-3 mt-8">
                <h4 className="font-inter text-lg font-bold leading-5 text-[#13161A] m-0">
                  SOCIALS
                </h4>
                <a
                  href="https://www.linkedin.com/company/pcxpay-ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-opacity duration-200 hover:opacity-80"
                  aria-label="LinkedIn"
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="#131927" />
                    <svg
                      x="8"
                      y="8"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M8.48169 6.40234C7.16969 6.40234 6.30469 7.29834 6.30469 8.48234C6.30469 9.63434 7.13719 10.5613 8.41719 10.5613C9.79319 10.5613 10.6572 9.63434 10.6252 8.48234C10.6252 7.29834 9.79369 6.40234 8.48169 6.40234ZM20.7687 11.9063C18.5607 11.9063 17.2172 13.1858 16.6732 14.0818H16.6097L16.4172 12.1943H12.8657C12.8977 13.4103 12.9612 14.8183 12.9612 16.4823V25.6013H17.0567V17.8893C17.0567 17.5053 17.0887 17.1218 17.1847 16.8338C17.5047 16.0658 18.1772 15.2653 19.2972 15.2653C20.8012 15.2653 21.3772 16.4498 21.3772 18.1778V25.6013H25.5052V17.6983C25.5052 13.7303 23.4567 11.9063 20.7687 11.9063ZM6.40169 12.1943V25.6013H10.4972V12.1943H6.40169Z"
                        fill="white"
                      />
                    </svg>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product */}
            <div className="flex flex-col gap-3">
              <h4 className="font-inter text-lg font-bold leading-5 text-[#13161A] m-0 max-sm:text-sm">
                PRODUCT
              </h4>
              <ul className="flex flex-col list-none p-0 m-0">
                {productLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-mono text-base font-normal leading-7 text-[#3E4953] no-underline transition-colors duration-200 hover:text-[#1D5EFF] max-sm:text-sm max-sm:leading-6"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Socials — mobile */}
        <div className="hidden max-md:flex flex-col gap-3 -mt-4">
          <h4 className="font-inter text-lg font-bold leading-5 text-[#13161A] m-0 max-sm:text-sm">
            SOCIALS
          </h4>
          <a
            href="https://www.linkedin.com/company/pcxpay-ltd/"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-opacity duration-200 hover:opacity-80"
            aria-label="LinkedIn"
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="#131927" />
              <svg
                x="8"
                y="8"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M8.48169 6.40234C7.16969 6.40234 6.30469 7.29834 6.30469 8.48234C6.30469 9.63434 7.13719 10.5613 8.41719 10.5613C9.79319 10.5613 10.6572 9.63434 10.6252 8.48234C10.6252 7.29834 9.79369 6.40234 8.48169 6.40234ZM20.7687 11.9063C18.5607 11.9063 17.2172 13.1858 16.6732 14.0818H16.6097L16.4172 12.1943H12.8657C12.8977 13.4103 12.9612 14.8183 12.9612 16.4823V25.6013H17.0567V17.8893C17.0567 17.5053 17.0887 17.1218 17.1847 16.8338C17.5047 16.0658 18.1772 15.2653 19.2972 15.2653C20.8012 15.2653 21.3772 16.4498 21.3772 18.1778V25.6013H25.5052V17.6983C25.5052 13.7303 23.4567 11.9063 20.7687 11.9063ZM6.40169 12.1943V25.6013H10.4972V12.1943H6.40169Z"
                  fill="white"
                />
              </svg>
            </svg>
          </a>
        </div>

        {/* Divider */}
        <div className="w-full bg-[#B9B7B7]" style={{ height: "0.2px" }} />

        {/* Bottom bar */}
        <div className="flex items-center justify-between flex-nowrap gap-10 max-md:flex-col max-md:gap-8 max-md:items-start">
          {/* Copyright */}
          <div className="flex items-center gap-2 max-sm:gap-1.5 max-md:order-2 max-md:flex-col max-md:items-center max-md:w-full max-md:pt-4">
            <span className="hidden max-md:block font-mono text-base font-normal leading-5 text-[#13161A] max-sm:text-[13px]">
              All Rights Reserved.
            </span>
            <div className="flex items-center gap-2 max-sm:gap-1.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M7.9987 14.6654C11.6806 14.6654 14.6654 11.6806 14.6654 7.9987C14.6654 4.3168 11.6806 1.33203 7.9987 1.33203C4.3168 1.33203 1.33203 4.3168 1.33203 7.9987C1.33203 11.6806 4.3168 14.6654 7.9987 14.6654Z"
                    stroke="#131927"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.9987 6.1138C8.79018 6.0401 8.56579 6 8.33203 6C7.22746 6 6.33203 6.89543 6.33203 8C6.33203 9.10457 7.22746 10 8.33203 10C8.56579 10 8.79018 9.9599 8.9987 9.8862"
                    stroke="#131927"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="font-mono text-base font-normal leading-5 text-[#13161A] whitespace-nowrap max-sm:text-[13px]">
                2026 PCX Pay Limited.
              </span>
              <span className="max-md:hidden font-mono text-base font-normal leading-5 text-[#13161A] max-sm:text-[13px]">
                All Rights Reserved.
              </span>
            </div>
          </div>

          {/* Policy links */}
          <div className="flex items-center gap-8 flex-wrap max-md:grid max-md:grid-cols-2 max-md:gap-x-10 max-md:gap-y-3 max-md:order-1">
            {policyLinks.map((item, i, arr) => (
              <React.Fragment key={item.href}>
                <a
                  href={item.href}
                  className="font-mono text-base font-normal leading-5 text-[#13161A] no-underline transition-colors duration-200 hover:text-[#1D5EFF] max-sm:text-sm"
                >
                  {item.label}
                </a>
                {i < arr.length - 1 && (
                  <div className="w-px h-4 bg-[#D0CFCF] shrink-0 max-md:hidden" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div
        className="block w-full pointer-events-none overflow-hidden"
        style={{ marginTop: "-80px" }}
      >
        <div className="max-w-300 mx-auto">
          <img
            src="/PCXLogo.svg"
            alt=""
            className="w-full h-auto block"
            style={{ opacity: 0.15, filter: "brightness(1.2) saturate(0.8)" }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
