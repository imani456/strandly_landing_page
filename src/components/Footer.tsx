import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = ({ id }: { id?: string }) => {
  const { t } = useTranslation();
  return (
    <footer id={id} className="bg-cocoa-brown border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-24">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl text-white">
              {t("footer.brand")}
            </h3>
            <p className="font-body text-warm-white leading-relaxed">
              {t("footer.brand_description")}
            </p>
          </div>

          

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-body font-semibold text-white">
              {t("footer.company_title")}
            </h4>
            <div className="space-y-3 font-body text-warm-white">
              <Link to="/about-us" className="block hover:text-accent transition-colors">{t("footer.about_us")}</Link>
              <Link to="/learn-more" className="block hover:text-accent transition-colors">{t("footer.learn_more")}</Link>
              {/* <Link to="#" className="block hover:text-accent transition-colors">{t("footer.contact")}</Link> */}
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-body font-semibold text-white">
              {t("footer.legal_title")}
            </h4>
            <div className="space-y-3 font-body text-warm-white">
              <Link to="/privacy-policy" className="block hover:text-accent transition-colors">{t("footer.privacy_policy")}</Link>
              <Link to="/terms-of-service" className="block hover:text-accent transition-colors">{t("footer.terms_of_service")}</Link>
              <Link to="/cookie-policy" className="block hover:text-accent transition-colors">{t("footer.cookie_policy")}</Link>
              <Link to="/impressum" className="block hover:text-accent transition-colors">{t("footer.impressum")}</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-body text-warm-white">
              {t("footer.copyright")}
            </p>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/strandly_eu/" className="text-warm-white hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                {t("footer.instagram")}
              </a>
              {/* <a href="#" className="text-warm-white hover:text-accent transition-colors">
                {t("footer.twitter")}
              </a>
              <a href="#" className="text-warm-white hover:text-accent transition-colors">
                {t("footer.linkedin")}
              </a> */}
              <a href="mailto:hello@strandlyeu.com" className="text-warm-white hover:text-accent transition-colors">
                hello@strandlyeu.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;