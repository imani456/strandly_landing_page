
const PrivacyPolicy = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-6 font-body text-lg">
          <p>
            Effective Date: 01.08.2025
          </p>
          <p>
            At Strandly, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect your information when you visit our website, join our waitlist, or use our services.
          </p>
          <h2 className="font-display text-2xl font-semibold mt-8">1. Information We Collect</h2>
          <p>
            When you interact with Strandly, we may collect:
            <ul className="list-disc list-inside ml-4">
              <li>Personal Information: Name, email address, phone number (if provided).</li>
              <li>Account Details: When you join the waitlist or register on our app.</li>
              <li>Usage Data: IP address, browser type, and how you use our website.</li>
            </ul>
          </p>
          <p>
            We only collect information that is necessary to provide our services and improve your experience.
          </p>
          <h2 className="font-display text-2xl font-semibold mt-8">2. How We Use Your Information</h2>
          <p>
            We use your information to:
            <ul className="list-disc list-inside ml-4">
              <li>Provide and manage our services (e.g., booking with stylists).</li>
              <li>Communicate updates, promotions, and important notices.</li>
              <li>Improve our website, app, and user experience.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </p>
          <p>
            We never sell your data to third parties.
          </p>
          <h2 className="font-display text-2xl font-semibold mt-8">3. Data Sharing</h2>
          <p>
            We only share your data with:
            <ul className="list-disc list-inside ml-4">
              <li>Service providers who support our website and app functionality.</li>
              <li>Legal authorities if required by law.</li>
            </ul>
          </p>
          <p>
            All third-party providers are required to keep your data secure.
          </p>
          <h2 className="font-display text-2xl font-semibold mt-8">4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your information against unauthorized access, loss, or misuse.
          </p>
          <h2 className="font-display text-2xl font-semibold mt-8">5. Your Rights (GDPR)</h2>
          <p>
            If you are in the European Union, you have the right to:
            <ul className="list-disc list-inside ml-4">
              <li>Access and request a copy of your data.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Withdraw consent to our use of your data.</li>
            </ul>
          </p>
          <p>
            To exercise your rights, contact us at: <a href="mailto:privacy@strandly.com" className="text-accent hover:underline">privacy@strandly.com</a>
          </p>
          <h2 className="font-display text-2xl font-semibold mt-8">6. Changes to This Privacy Policy</h2>
          <p>
            We may update this policy from time to time. Any changes will be posted here with a new effective date.
          </p>
          <h2 className="font-display text-2xl font-semibold mt-8">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, reach us at:
            <br />
            Email: <a href="mailto:privacy@strandly.co" className="text-accent hover:underline">privacy@strandly.co</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
