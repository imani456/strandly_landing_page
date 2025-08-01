import { useState } from "react";
import { Button } from "./ui/button";
import WaitlistModal from "./WaitlistModal";

const Navigation = () => {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  return (
    <>
    <WaitlistModal 
      open={showWaitlistModal} 
      onOpenChange={setShowWaitlistModal} 
    />
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="font-display text-3xl text-foreground">
              Strandly
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="font-body text-foreground hover:text-accent transition-colors">
              How it works
            </a>
            <a href="#for-stylists" className="font-body text-foreground hover:text-accent transition-colors">
              For stylists
            </a>
            <a href="#contact" className="font-body text-foreground hover:text-accent transition-colors">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button variant="minimal" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button 
              variant="hero" 
              size="sm" 
              onClick={() => setShowWaitlistModal(true)}
            >
              Join waitlist
            </Button>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navigation;