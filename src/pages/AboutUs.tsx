import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  Globe, 
  Shield, 
  Star, 
  ArrowRight,
  Crown,
  Sparkles,
  Target,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="min-h-screen grid lg:grid-cols-2 items-center bg-background relative overflow-hidden px-4 sm:px-6 py-0 lg:px-0 lg:py-0">
        {/* Left Image - fills height */}
        <div className="relative order-2 lg:order-1 h-full flex items-end justify-center lg:justify-end pt-0">
          <div className="relative h-full w-full px-0 lg:pl-20 flex">
            <div className="w-full h-full bg-gradient-to-br from-[#6B3F1D]/10 to-[#8B4513]/20 flex items-center justify-center rounded-2xl">
              <div className="text-center space-y-6 p-8">
                <Crown className="h-24 w-24 text-[#6B3F1D] mx-auto" />
                <h3 className="text-2xl font-display text-[#6B3F1D]">Your Hair, Your Crown</h3>
                <p className="text-[#6B3F1D]/80 font-body">Celebrating the beauty and versatility of Afro hair</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-8 pt-12 sm:pt-28 lg:pt-0 lg:pl-2 order-1 lg:order-2 px-6 md:px-12 lg:px-32 pb-30 lg:py-0 max-w-2xl w-full mx-auto text-center lg:text-left">
          <div className="space-y-4">
            <Badge className="bg-[#6B3F1D]/10 text-[#6B3F1D] border-[#6B3F1D]/30 hover:bg-[#6B3F1D]/20 mb-4">
              About Strandly
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-8xl text-foreground leading-tight">
              {t("aboutUs.title")}
            </h1>
            <p className="font-body text-base md:text-2xl text-foreground leading-relaxed max-w-lg">
              At Strandly, we believe your hair is your crown—and finding the right hands to care for it should feel effortless.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              variant="hero-outline" 
              size="xl" 
              className="font-body" 
              onClick={() => navigate('/learn-more')}
            >
              Learn More
            </Button>
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate('/blog')}
            >
              Read Our Blog
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#e7cfb1]/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-8">
              Our Mission
            </h2>
            <p className="font-body text-base md:text-xl text-foreground/80 leading-relaxed mb-8">
              We are a premium booking platform for Afro hairstylists across Europe, connecting clients with trusted stylists who understand the beauty and versatility of Afro hair.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="bg-background border-[#6B3F1D]/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <Heart className="h-12 w-12 text-[#6B3F1D] mx-auto mb-4" />
                  <h3 className="font-display text-xl text-foreground mb-2">Celebration</h3>
                  <p className="font-body text-sm text-foreground/70">
                    Celebrating the beauty and diversity of Afro hair
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background border-[#6B3F1D]/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-[#6B3F1D] mx-auto mb-4" />
                  <h3 className="font-display text-xl text-foreground mb-2">Connection</h3>
                  <p className="font-body text-sm text-foreground/70">
                    Connecting clients with skilled, verified stylists
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background border-[#6B3F1D]/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 text-[#6B3F1D] mx-auto mb-4" />
                  <h3 className="font-display text-xl text-foreground mb-2">Community</h3>
                  <p className="font-body text-sm text-foreground/70">
                    Building a supportive community across Europe
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-8">
                What We Offer
              </h2>
              <p className="font-body text-base md:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
                Whether you're looking for braids, twists, locs, silk presses, or a new protective style, Strandly makes the journey simple:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#6B3F1D] rounded-full flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-2">Discover Inspiration</h3>
                    <p className="font-body text-foreground/70">
                      Explore curated Afro hairstyles and find your perfect look
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#6B3F1D] rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-2">Verified Stylists</h3>
                    <p className="font-body text-foreground/70">
                      Connect with trusted stylists and explore their portfolios
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#6B3F1D] rounded-full flex items-center justify-center">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-2">Easy Booking</h3>
                    <p className="font-body text-foreground/70">
                      Book your appointment in seconds—no DMs, no waiting, just beautiful results
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Image/Content */}
              <div className="relative">
                <div className="bg-gradient-to-br from-[#6B3F1D]/10 to-[#8B4513]/20 rounded-2xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Award className="h-16 w-16 text-[#6B3F1D] mx-auto" />
                    <h3 className="font-display text-2xl text-[#6B3F1D]">Premium Experience</h3>
                    <p className="font-body text-[#6B3F1D]/80">
                      From discovery to booking, we make every step effortless
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Stylists Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#e7cfb1]/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-8">
              For Stylists
            </h2>
            <p className="font-body text-base md:text-xl text-foreground/80 leading-relaxed mb-12">
              For stylists, Strandly is more than a booking tool—it's a stage for your talent. We help you showcase your work, attract new clients, and manage your schedule with ease, so you can focus on what you do best: creating beauty and confidence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-background border-[#6B3F1D]/30 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Star className="h-12 w-12 text-[#6B3F1D] mx-auto mb-4" />
                  <h3 className="font-display text-xl text-foreground mb-4">Showcase Your Work</h3>
                  <p className="font-body text-foreground/70">
                    Create stunning portfolios that highlight your expertise and attract the right clients
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-background border-[#6B3F1D]/30 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 text-[#6B3F1D] mx-auto mb-4" />
                  <h3 className="font-display text-xl text-foreground mb-4">Grow Your Business</h3>
                  <p className="font-body text-foreground/70">
                    Connect with clients who appreciate your craft and build lasting relationships
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-8">
              Our Community
            </h2>
            <p className="font-body text-base md:text-xl text-foreground/80 leading-relaxed mb-12">
              Strandly isn't just an app. It's a community where Afro hair is celebrated, cared for, and elevated. Join thousands of clients and stylists who are part of this growing movement.
            </p>
            
            <div className="bg-gradient-to-r from-[#6B3F1D] to-[#8B4513] rounded-2xl p-8 md:p-12 text-white">
              <h3 className="font-display text-2xl md:text-3xl mb-4">Ready to Join Our Community?</h3>
              <p className="font-body text-lg mb-8 opacity-90">
                Whether you're a client looking for the perfect stylist or a stylist ready to showcase your talent, we're here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-white text-[#6B3F1D] hover:bg-[#e7cfb1] border-white"
                  onClick={() => navigate('/learn-more')}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  className="bg-[#e7cfb1] text-[#6B3F1D] hover:bg-white"
                  onClick={() => navigate('/blog')}
                >
                  Read Our Blog
                </Button>
              </div>
            </div>
          </div>
      </div>
      </section>
    </div>
  );
};

export default AboutUs;
