import HeroSection from "@/components/HeroSection";
import ProcessSteps from "@/components/ProcessSteps";
import ForClientsSection from "@/components/ForClientsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <ProcessSteps id="how-it-works" />
        <ForClientsSection id="for-stylists" />
      </main>
      <Footer id="contact" />
    </div>
  );
};

export default Index;
