import Header from "@/components/Header";
import EmbeddedFinance from "@/components/EmbeddedFinance";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata = { title: "Embedded Finance | PCX Pay" };

export default function EmbeddedFinancePage() {
  return (
    <>
      <Header />
      <main>
        <EmbeddedFinance />
      </main>
      <CTASection />
      <Footer />
    </>
  );
}
