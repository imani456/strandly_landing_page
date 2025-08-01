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
      <section className="min-h-screen grid lg:grid-cols-2 items-center bg-background relative overflow-hidden">
        {/* Left Image - fills height */}
        <div className="relative order-2 lg:order-1 h-full flex items-end justify-end">
          <div className="relative h-4/5 w-full pl-20">
            <img
              src={heroPortrait}
              alt="Woman with natural afro hair"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-warm rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-caramel-gold rounded-full opacity-15 blur-lg"></div>
        </div>

        {/* Right Content */}
        <div className="space-y-8 lg:pl-2 order-1 lg:order-2 px-6 md:px-12 lg:px-32 py-20 lg:py-0 max-w-2xl w-full mx-auto">
          <div className="space-y-4">
            <h1 className="font-display text-8xl md:text-8xl lg:text-8xl text-foreground leading-tight">
              {t("hero.title")}
            </h1>
            <p className="font-body text-xl md:text-2xl text-foreground leading-relaxed max-w-lg">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
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