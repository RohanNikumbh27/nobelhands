import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ImpactStats } from "@/components/ImpactStats";
import { WhoWeHelp } from "@/components/WhoWeHelp";
import { DonationSection } from "@/components/DonationSection";
import { Mission } from "@/components/Mission";
import { Stories } from "@/components/Stories";
import { Footer } from "@/components/Footer";
import { AIChatbot } from "@/components/AIChatbot";

export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <div id="home">
          <Hero />
        </div>
        <ImpactStats />
        <div id="who-we-help">
          <WhoWeHelp />
        </div>
        <DonationSection />
        <div id="mission">
          <Mission />
        </div>
        <div id="stories">
          <Stories />
        </div>
        <div id="footer">
          <Footer />
        </div>

        {/* AI Chatbot - Fixed position, always available */}
        <AIChatbot />
      </div>
    </>
  );
}
