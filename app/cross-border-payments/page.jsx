import Header from "@/components/Header";
import CrossBorder from "@/components/CrossBorder";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata = { title: "Cross-Border Payments | PCX Pay" };

export default function CrossBorderPage() {
  return (
    <>
      <Header />
      <main>
        <CrossBorder />
      </main>
      <CTASection />
      <Footer />
    </>
  );
}
