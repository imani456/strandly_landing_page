import { useState } from "react";
import { Button } from "./ui/button";
import heroPortrait from "@/assets/hero-portrait-transparent.jpg";
import WaitlistModal from "./WaitlistModal";

const HeroSection = () => {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  return (
    <>
    <WaitlistModal 
      open={showWaitlistModal} 
      onOpenChange={setShowWaitlistModal} 
    />
    <section className="min-h-screen flex items-center justify-center bg-background px-6 md:px-12 lg:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="relative order-2 lg:order-1">
          <div className="relative z-10">
            <img
              src={heroPortrait}
              alt="Beautiful woman with natural afro hair"
              className="w-full h-auto"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-warm rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-caramel-gold rounded-full opacity-15 blur-lg"></div>
        </div>

        {/* Right Content */}
        <div className="space-y-8 lg:pl-8 order-1 lg:order-2">
          <div className="space-y-6">
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-foreground leading-tight">
              Strandly
            </h1>
            <p className="font-body text-xl md:text-2xl text-foreground leading-relaxed max-w-lg">
              Discover the app for Afro hairstylists and their clients.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero-outline" size="lg" className="font-body">
              Learn more
            </Button>
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => setShowWaitlistModal(true)}
            >
              Join waitlist
            </Button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default HeroSection;