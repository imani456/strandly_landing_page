import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import WaitlistModal from "@/components/WaitlistModal";
import BackButton from "@/components/BackButton";
import heroPortrait from "@/assets/learn-more.png";

const LearnMore = () => {
  const { t } = useTranslation();
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  return (
    <>
      <WaitlistModal
        open={showWaitlistModal}
        onOpenChange={setShowWaitlistModal}
      />
      <div className="min-h-screen bg-warm-white">
        <div className="container mx-auto px-4 py-32">
          <div className="mb-8">
            <BackButton />
          </div>
          <div className="flex flex-col lg:flex-row items-center lg:space-x-12 px-2 lg:px-8">
            {/* Left Section - Image */}
            <div className="lg:w-1/3 mb-8 lg:mb-0">
              <img
                src={heroPortrait}
                alt="Woman with natural afro hair"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            {/* Right Section - Content */}
            <div className="lg:w-1/2 space-y-6">
              {/* Main Heading */}
              <h1 className="text-4xl lg:text-5xl font-bold text-cocoa-brown leading-tight">
                {t("learn_more.title")}
              </h1>
              
              {/* Intro Paragraph */}
              <p className="text-lg text-cocoa-brown leading-relaxed">
                Finding the perfect Afro hairstylist used to mean scrolling for hours, saving screenshots, and hoping for a repin. <strong>Strandly changes that.</strong>
              </p>
              
              {/* Features Section */}
              <div className="space-y-4">
                <p className="text-lg text-cocoa-brown">
                  {t("learn_more.features_intro")}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-cocoa-brown mr-3 mt-1">-</span>
                    <span className="text-lg text-cocoa-brown">
                      {t("learn_more.feature1")}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cocoa-brown mr-3 mt-1">-</span>
                    <span className="text-lg text-cocoa-brown">
                      {t("learn_more.feature2")}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cocoa-brown mr-3 mt-1">-</span>
                    <span className="text-lg text-cocoa-brown">
                      {t("learn_more.feature3")}
                    </span>
                  </li>
                </ul>
              </div>
              
              {/* Stylist Section */}
              <p className="text-lg text-cocoa-brown leading-relaxed">
                And if you're a stylist. <strong>Strandly was built for you too.</strong> Showcase your craft, grow your bookings, and let your talent shine while we handle the admin.
              </p>
              
              {/* Conclusion */}
              <p className="text-lg text-cocoa-brown leading-relaxed">
                Your hair journey deserves to feel effortless—and with <strong>Strandly, it finally does.</strong>
              </p>
              
              {/* CTA Button */}
              <div className="pt-4">
                              <Button
                variant="default"
                size="lg"
                onClick={() => setShowWaitlistModal(true)}
                className="bg-cocoa-brown hover:bg-brown-custom text-white px-8 py-3 rounded-lg text-lg font-medium shadow-lg"
              >
                  <span className="mr-2">✨</span>
                  {t("learn_more.cta")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearnMore;
