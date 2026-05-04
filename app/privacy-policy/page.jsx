import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Privacy Policy | PCX Pay" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      mdFile="/PCXPAY_Privacy_Policy.md"
      version={{ date: "August 19th, 2025", label: "version 1.0" }}
      sidebarLinks={[
        { href: "#data-we-collect", label: "Data We Collect" },
        { href: "#how-we-use-your-data", label: "How We Use Your Data" },
        { href: "#legal-basis-for-processing", label: "Legal Basis" },
        { href: "#data-sharing", label: "Data Sharing" },
        { href: "#data-retention", label: "Data Retention" },
        { href: "#your-rights", label: "Your Rights" },
        { href: "#international-data-transfers", label: "International Transfers" },
        { href: "#contact-and-complaints", label: "Contact" },
      ]}
    />
  );
}
