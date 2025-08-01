import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProcessSteps from "@/components/ProcessSteps";
import ForClientsSection from "@/components/ForClientsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation /> */}
      <main>
        <HeroSection />
        <ProcessSteps />
        <ForClientsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
