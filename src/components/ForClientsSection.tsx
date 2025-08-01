import { useState } from "react";
import { Button } from "./ui/button";
import mobileMockup from "@/assets/mobile-mockup.png";
import WaitlistModal from "./WaitlistModal";

const ForClientsSection = () => {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  return (
    <>
    <WaitlistModal 
      open={showWaitlistModal} 
      onOpenChange={setShowWaitlistModal} 
    />
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="font-display text-5xl md:text-5xl text-foreground leading-tight">
                For Clients
              </h2>
              <p className="font-body text-xl text-foreground leading-relaxed">
                Browse top styles and book skilled Afro hair stylists with ease.
              </p>
            </div>

            <div className="space-y-8">
              <h3 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
                For Stylists
              </h3>
              <p className="font-body text-xl text-foreground leading-relaxed">
                Reach more clients and grow your business with our platform.
              </p>
            </div>

            <div className="text-center space-y-6 mt-12">
              {/* <Button 
                variant="hero" 
                size="xl" 
                className="font-body"
                onClick={() => setShowWaitlistModal(true)}
              >
                Join the waitlist
              </Button> */}
              {/* <p className="font-body text-sm text-muted-foreground">
                Be among the first to experience premium Afro hair services
              </p> */}
            </div>
          </div>

          {/* Right Mobile Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src={mobileMockup}
                alt="Strandly mobile app booking interface"
                className="w-full h-auto drop-shadow-elegant"
              />
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-warm rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-soft-caramel rounded-full opacity-15 blur-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Join Waitlist Section - Below Mobile Mockup */}
        <div className="mt-20 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-4">
              <h3 className="font-display text-4xl md:text-5xl text-foreground">
                Ready to transform your hair journey?
              </h3>
              <p className="font-body text-xl text-muted-foreground">
                Join thousands of women who trust Strandly for their Afro hair care needs
              </p>
            </div>
            <Button 
              variant="hero" 
              size="xl" 
              className="font-body px-12"
              onClick={() => setShowWaitlistModal(true)}
            >
              Join the waitlist
            </Button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ForClientsSection;