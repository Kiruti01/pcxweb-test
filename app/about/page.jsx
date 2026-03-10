import Header from "@/components/Header";
import AboutUs from "@/components/AboutUs";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata = { title: "About Us | PCX Pay" };

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutUs />
      </main>
      <CTASection />
      <Footer />
    </>
  );
}
