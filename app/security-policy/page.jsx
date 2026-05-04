import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Security Policy | PCX Pay" };

export default function SecurityPolicyPage() {
  return (
    <LegalPage
      title="Security Policy"
      mdFile="/PCXPAY_Security_Policy.md"
      version={{ date: "August 19th, 2025", label: "version 1.0" }}
      sidebarLinks={[
        { href: "#platform-security-measures", label: "Platform Security" },
        { href: "#api-security-developer-users", label: "API Security" },
        { href: "#user-responsibilities", label: "User Responsibilities" },
        { href: "#prohibited-technical-activities", label: "Prohibited Activities" },
        { href: "#data-security-and-confidentiality", label: "Data Security" },
        { href: "#security-compliance", label: "Compliance" },
        { href: "#reporting-a-security-vulnerability", label: "Report a Vulnerability" },
        { href: "#contact", label: "Contact" },
      ]}
    />
  );
}
