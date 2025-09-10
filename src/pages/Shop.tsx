import { useTranslation } from "react-i18next";
import FloatingNavigation from "@/components/FloatingNavigation";
import Footer from "@/components/Footer";

const Shop = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <FloatingNavigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-8">
              {t("navigation.shop")}
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Discover premium Afro hair care products and accessories. Coming soon!
            </p>
            
            {/* Coming Soon Section */}
            <div className="bg-gradient-to-br from-[#6B3F1D] to-[#8B4513] rounded-2xl p-12 text-white">
              <h2 className="font-display text-3xl md:text-4xl mb-6">
                Shop Coming Soon
              </h2>
              <p className="font-body text-lg mb-8 max-w-xl mx-auto">
                We're curating the best Afro hair care products for you. 
                Sign up to be notified when our shop launches!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#6B3F1D] px-8 py-3 rounded-lg font-body font-semibold hover:bg-[#e7cfb1] transition-colors">
                  Notify Me
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-body font-semibold hover:bg-white hover:text-[#6B3F1D] transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
