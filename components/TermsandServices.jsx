import LegalPage from "@/components/LegalPage";

const TermsAndServices = () => (
  <LegalPage
    title="PCXPAY Terms and Services"
    mdFile="/PCXPAY_Terms_and_Services.md"
    version={{ date: "August 19th, 2025", label: "version 1.0" }}
    sidebarLinks={[
      { href: "#additional-legal-terms", label: "Terms of Service" },
      { href: "#intellectual-property", label: "Licenses" },
      { href: "#responsibilities-of-the-parties", label: "Responsibilities" },
      { href: "#regulatory--compliance-model", label: "Compliance" },
      { href: "#financial-terms", label: "Financial Terms" },
      { href: "#indemnification-and-limitation-of-liability", label: "Liability" },
    ]}
  />
);

export default TermsAndServices;
