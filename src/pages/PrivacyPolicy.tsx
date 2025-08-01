
const PrivacyPolicy = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-6 font-body text-lg">
          <p>
            Your privacy is important to us. This privacy statement explains the personal data Strandly processes, how Strandly processes it, and for what purposes.
          </p>
          <h2 className="font-display text-2xl font-semibold mt-8">Information We Collect</h2>
          <p>
            We collect data to operate effectively and provide you with the best experiences with our services. You provide some of this data directly, such as when you create an account, while other data is collected automatically based on your interaction with our services.
          </p>
          <h2 className="font-display text-2xl font-semibold mt-8">How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect Strandly and our users. We also use this information to offer you tailored content – like giving you more relevant search results and ads.
          </p>
          <h2 className="font-display text-2xl font-semibold mt-8">Your Rights Under GDPR/DSGVO</h2>
          <p>
            You have the right to access, rectify, or erase your personal data, as well as the right to restrict or object to certain processing of your data. To exercise these rights, please contact us at <a href="mailto:privacy@strandly.com" className="text-accent hover:underline">privacy@strandly.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
