import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import mobileMockup from "@/assets/phone-transparent.png";
import WaitlistModal from "./WaitlistModal";

const ForClientsSection = ({ id }: { id?: string }) => {
  const { t } = useTranslation();
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  return (
    <>
    <WaitlistModal 
      open={showWaitlistModal} 
      onOpenChange={setShowWaitlistModal} 
    />
    <section id={id} className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center justify-center">
          {/* Left Content */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="font-display text-5xl sm:text-6xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                {t("for_clients.title")}
              </h2>
              <p className="font-body text-xl text-foreground leading-relaxed">
                {t("for_clients.subtitle")}
              </p>
            </div>

            <div className="space-y-8">
              <h3 className="font-display text-5xl sm:text-6xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                {t("for_stylists.title")}
              </h3>
              <p className="font-body text-xl text-foreground leading-relaxed">
                {t("for_stylists.subtitle")}
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
            </div>
          </div>
        </div>
        
        {/* Join Waitlist Section - Below Mobile Mockup */}
        <div className="mt-20 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-4">
              {/* <h3 className="font-display text-4xl md:text-5xl text-foreground">
                {t("waitlist.title")}
              </h3> */}
              {/* <p className="font-body text-xl text-muted-foreground">
                {t("waitlist.subtitle")}
              </p> */}
            </div>
            <Button 
              variant="hero" 
              size="xl" 
              className="font-body px-16 py-6 text-xl"
              onClick={() => setShowWaitlistModal(true)}
            >
              {t("waitlist.join_waitlist")}
            </Button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ForClientsSection;