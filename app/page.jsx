import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Scale from "@/components/Scale";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import StickyGetStarted from "@/components/StickyButton/Getstarted";
import APIText from "@/components/APIText";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Scale />
        <APIText />
        <CTASection />
      </main>
      <Footer />
      <StickyGetStarted />
    </>
  );
}
