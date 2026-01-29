import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import LeadershipSection from "@/components/home/LeadershipSection";
import ServiceGrid from "@/components/home/ServiceGrid";

import SchemesSection from "@/components/home/SchemesSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <LeadershipSection />
        <ServiceGrid />

        <SchemesSection />
      </main>
      <Footer />
    </div>
  );
}
