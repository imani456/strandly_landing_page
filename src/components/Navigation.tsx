import { useCallback } from "react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom"; // Added NavLink import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

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

const Navigation = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
  }, [i18n]);

  return (
    <>
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-lg shadow-lg z-50 mb-8 sm:mb-12">
        <div className="flex items-center justify-center h-12 px-3 space-x-2 md:h-16 md:px-6 md:space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/about-us"
              className="font-body text-primary-foreground hover:underline transition-colors"
            >
              {t("navigation.about_us")}
            </NavLink>
            <NavLink
              to="/learn-more"
              className="font-body text-primary-foreground hover:underline transition-colors"
            >
              {t("navigation.learn_more")}
            </NavLink>
            <a
              href="#contact"
              className="font-body text-primary-foreground hover:underline transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t("navigation.contact")}
            </a>
            <NavLink
              to="/blog"
              className="font-body text-primary-foreground hover:underline transition-colors"
            >
              {t("navigation.blog")}
            </NavLink>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-primary-foreground">
                {languageFlags[i18n.language]} <Globe className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeLanguage("en")}>
                🇬🇧 English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("de")}>🇩🇪 German</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("fr")}>🇫🇷 French</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("es")}>🇪🇸 Spanish</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("pt")}>🇵🇹 Portuguese</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("nl")}>🇳🇱 Dutch</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("pl")}>🇵🇱 Polish</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("cs")}>🇨🇿 Czech</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
};

export default Navigation;