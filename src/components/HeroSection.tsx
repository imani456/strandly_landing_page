import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import heroPortrait from "@/assets/hero-transparent.png";
import WaitlistModal from "./WaitlistModal";

const HeroSection = () => {
  const { t } = useTranslation();
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  return (
    <>
    <WaitlistModal
        open={showWaitlistModal}
        onOpenChange={setShowWaitlistModal}
      />
      <section className="min-h-screen grid lg:grid-cols-2 items-center bg-background relative overflow-hidden px-4 sm:px-6 py-0 lg:px-0 lg:py-0">
        {/* Left Image - fills height */}
        <div className="relative order-2 lg:order-1 h-full flex items-end justify-center lg:justify-end pt-0">
          <div className="relative h-full w-full px-0 lg:pl-20 flex">
            <img
              src={heroPortrait}
              alt="Woman with natural afro hair"
              className="w-full h-full object-cover object-bottom"
            />  
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-8 pt-12 sm:pt-28 lg:pt-0 lg:pl-2 order-1 lg:order-2 px-6 md:px-12 lg:px-32 pb-30 lg:py-0 max-w-2xl w-full mx-auto text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="font-display text-5xl md:text-6xl lg:text-8xl text-foreground leading-tight">
              {t("hero.title")}
            </h1>
            <p className="font-body text-base md:text-2xl text-foreground leading-relaxed max-w-lg">
              {t("hero.subtitle")}
            </p>
            {/* <p className="font-body text-base md:text-2xl text-foreground leading-relaxed max-w-lg">
              {t("hero.tagline")}
            </p> */}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button variant="hero-outline" size="xl" className="font-body">
              {t("hero.learn_more")}
            </Button>
            <Button
              variant="hero"
              size="xl"
              onClick={() => setShowWaitlistModal(true)}
            >
              {t("hero.join_waitlist")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
