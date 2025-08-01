const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl text-foreground">
              Strandly
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed">
              Premium Afro hair services across Europe. Connecting stylists and clients with elegance.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-body font-semibold text-foreground">
              Product
            </h4>
            <div className="space-y-3 font-body text-muted-foreground">
              <a href="#" className="block hover:text-accent transition-colors">Features</a>
              <a href="#" className="block hover:text-accent transition-colors">Pricing</a>
              <a href="#" className="block hover:text-accent transition-colors">For Stylists</a>
              <a href="#" className="block hover:text-accent transition-colors">For Clients</a>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-body font-semibold text-foreground">
              Company
            </h4>
            <div className="space-y-3 font-body text-muted-foreground">
              <a href="#" className="block hover:text-accent transition-colors">About</a>
              <a href="#" className="block hover:text-accent transition-colors">Blog</a>
              <a href="#" className="block hover:text-accent transition-colors">Careers</a>
              <a href="#" className="block hover:text-accent transition-colors">Contact</a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-body font-semibold text-foreground">
              Legal
            </h4>
            <div className="space-y-3 font-body text-muted-foreground">
              <a href="#" className="block hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="block hover:text-accent transition-colors">Terms of Service</a>
              <a href="#" className="block hover:text-accent transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-body text-muted-foreground">
              © 2024 Strandly. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                Instagram
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
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