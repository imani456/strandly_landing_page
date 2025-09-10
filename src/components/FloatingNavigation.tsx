import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Mobile navigation components commented out
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "@/components/ui/sheet";
import { 
  Globe
} from "lucide-react";

const languageFlags: Record<string, string> = {
  en: "🇬🇧",
  de: "🇩🇪", 
  fr: "🇫🇷",
  es: "🇪🇸",
  pt: "🇵🇹",
  nl: "🇳🇱",
  pl: "🇵🇱",
  cs: "🇨🇿",
};

const FloatingNavigation = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navigateToRoute = (path: string) => {
    navigate(path);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    {
      label: t("navigation.how_it_works"),
      href: "#how-it-works",
      onClick: () => scrollToSection("how-it-works")
    },
    {
      label: t("navigation.for_stylists"),
      href: "#for-stylists", 
      onClick: () => scrollToSection("for-stylists")
    },
    {
      label: t("navigation.contact"),
      href: "#contact",
      onClick: () => scrollToSection("contact")
    },
    {
      label: t("navigation.blog"),
      href: "/blog",
      isActive: isActiveRoute("/blog"),
      onClick: () => navigateToRoute("/blog")
    }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-lg shadow-lg z-50 mb-8 sm:mb-12 hidden lg:block">
        <div className="flex items-center justify-center h-12 px-3 space-x-2 md:h-16 md:px-6 md:space-x-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 mr-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigateToRoute('/')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#6B3F1D] to-[#8B4513] rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm font-display">S</span>
            </div>
            <span className="font-display text-lg text-primary-foreground font-semibold">
              Strandly
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-body text-primary-foreground hover:underline transition-colors ${
                  item.isActive ? 'underline' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  item.onClick();
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-primary-foreground">
                {languageFlags[i18n.language]} <Globe className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.entries(languageFlags).map(([code, flag]) => (
                <DropdownMenuItem 
                  key={code}
                  onClick={() => changeLanguage(code)}
                >
                  {flag} {code.toUpperCase()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Mobile Navigation - Commented out for now as it's not essential */}
      {/* 
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <span className="font-display text-lg text-primary-foreground font-semibold">
              Strandly
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-primary-foreground">
                  {languageFlags[i18n.language]} <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.entries(languageFlags).map(([code, flag]) => (
                  <DropdownMenuItem 
                    key={code}
                    onClick={() => changeLanguage(code)}
                  >
                    {flag} {code.toUpperCase()}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      */}
    </>
  );
};

export default FloatingNavigation;
