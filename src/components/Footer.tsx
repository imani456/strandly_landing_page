import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-cocoa-brown border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl text-white">
              Strandly
            </h3>
            <p className="font-body text-warm-white leading-relaxed">
              Premium Afro hair services across Europe. Connecting stylists and clients with elegance.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-body font-semibold text-white">
              Product
            </h4>
            <div className="space-y-3 font-body text-warm-white">
              <Link to="#" className="block hover:text-accent transition-colors">Features</Link>
              <Link to="#" className="block hover:text-accent transition-colors">Pricing</Link>
              <Link to="#" className="block hover:text-accent transition-colors">For Stylists</Link>
              <Link to="#" className="block hover:text-accent transition-colors">For Clients</Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-body font-semibold text-white">
              Company
            </h4>
            <div className="space-y-3 font-body text-warm-white">
              <Link to="#" className="block hover:text-accent transition-colors">About</Link>
              <Link to="#" className="block hover:text-accent transition-colors">Blog</Link>
              <Link to="#" className="block hover:text-accent transition-colors">Careers</Link>
              <Link to="#" className="block hover:text-accent transition-colors">Contact</Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-body font-semibold text-white">
              Legal
            </h4>
            <div className="space-y-3 font-body text-warm-white">
              <Link to="/privacy-policy" className="block hover:text-accent transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="block hover:text-accent transition-colors">Terms of Service</Link>
              <Link to="/cookie-policy" className="block hover:text-accent transition-colors">Cookie Policy</Link>
              <Link to="/impressum" className="block hover:text-accent transition-colors">Impressum</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-body text-warm-white">
              © 2024 Strandly. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-warm-white hover:text-accent transition-colors">
                Instagram
              </a>
              <a href="#" className="text-warm-white hover:text-accent transition-colors">
                Twitter
              </a>
              <a href="#" className="text-warm-white hover:text-accent transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;