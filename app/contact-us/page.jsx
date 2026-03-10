import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ContactUs from "@/components/ContactUs";

export const metadata = { title: "Contact Us | PCX Pay" };

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactUs />
      </main>
      <CTASection />
      <Footer />
    </>
  );
}
