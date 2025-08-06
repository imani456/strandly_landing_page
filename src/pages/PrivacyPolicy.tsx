
import BackButton from "@/components/BackButton";

const PrivacyPolicy = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="mb-8">
          <BackButton />
        </div>
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
              <li>Cookie Data: Essential, analytics, and support cookies (with your consent).</li>
            </ul>
          </p>
          <p>
            We only collect information that is necessary to provide our services and improve your experience.
          </p>
          
          <h2 className="font-display text-2xl font-semibold mt-8">2. Legal Basis for Processing (GDPR)</h2>
          <p>
            We process your personal data based on the following legal grounds:
            <ul className="list-disc list-inside ml-4">
              <li><strong>Consent:</strong> For analytics cookies and marketing communications (you can withdraw at any time).</li>
              <li><strong>Legitimate Interest:</strong> For essential website functionality and service provision.</li>
              <li><strong>Contract Performance:</strong> To provide our services when you join the waitlist.</li>
            </ul>
          </p>
          
          <h2 className="font-display text-2xl font-semibold mt-8">3. How We Use Your Information</h2>
          <p>
            We use your information to:
            <ul className="list-disc list-inside ml-4">
              <li>Provide and manage our services (e.g., booking with stylists).</li>
              <li>Communicate updates, promotions, and important notices.</li>
              <li>Improve our website, app, and user experience.</li>
              <li>Comply with legal obligations.</li>
              <li>Analyze website usage to improve our services (with consent).</li>
            </ul>
          </p>
          <p>
            We never sell your data to third parties.
          </p>
          
          <h2 className="font-display text-2xl font-semibold mt-8">4. Data Retention</h2>
          <p>
            We retain your personal data for the following periods:
            <ul className="list-disc list-inside ml-4">
              <li><strong>Waitlist Data:</strong> 2 years from the date of collection, or until you request deletion.</li>
              <li><strong>Website Analytics:</strong> 26 months (Google Analytics standard).</li>
              <li><strong>Cookie Data:</strong> As specified in our Cookie Policy.</li>
              <li><strong>Support/Chat Data:</strong> 1 year from the last interaction.</li>
            </ul>
          </p>
          <p>
            After these periods, we will securely delete or anonymize your data.
          </p>
          
          <h2 className="font-display text-2xl font-semibold mt-8">5. Data Sharing</h2>
          <p>
            We only share your data with:
            <ul className="list-disc list-inside ml-4">
              <li>Service providers who support our website and app functionality (Supabase, Google Analytics, Tawk.to).</li>
              <li>Legal authorities if required by law.</li>
            </ul>
          </p>
          <p>
            All third-party providers are required to keep your data secure and comply with GDPR.
          </p>
          
          <h2 className="font-display text-2xl font-semibold mt-8">6. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your information against unauthorized access, loss, or misuse, including:
            <ul className="list-disc list-inside ml-4">
              <li>Encryption of data in transit and at rest.</li>
              <li>Regular security assessments and updates.</li>
              <li>Access controls and authentication measures.</li>
              <li>Secure data storage with Row Level Security (RLS).</li>
            </ul>
          </p>
          
          <h2 className="font-display text-2xl font-semibold mt-8">7. Data Breach Notification</h2>
          <p>
            In the unlikely event of a data breach that affects your personal data, we will:
            <ul className="list-disc list-inside ml-4">
              <li>Notify the relevant supervisory authority within 72 hours.</li>
              <li>Inform affected individuals without undue delay.</li>
              <li>Take immediate steps to contain and remediate the breach.</li>
              <li>Document all breach-related activities.</li>
            </ul>
          </p>
          
          <h2 className="font-display text-2xl font-semibold mt-8">8. Your Rights (GDPR)</h2>
          <p>
            If you are in the European Union, you have the right to:
            <ul className="list-disc list-inside ml-4">
              <li><strong>Access:</strong> Request a copy of your personal data.</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate data.</li>
              <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten").</li>
              <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format.</li>
              <li><strong>Restriction:</strong> Limit how we process your data.</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests.</li>
              <li><strong>Withdrawal:</strong> Withdraw consent at any time.</li>
            </ul>
          </p>
          <p>
            To exercise your rights, contact us at: <a href="mailto:privacy@strandly.com" className="text-accent hover:underline">privacy@strandly.com</a>
          </p>
          <p>
            We will respond to your request within 30 days.
          </p>
          
          <h2 className="font-display text-2xl font-semibold mt-8">9. International Data Transfers</h2>
          <p>
            Your data may be transferred to and processed in countries outside the European Economic Area (EEA). We ensure appropriate safeguards are in place, including:
            <ul className="list-disc list-inside ml-4">
              <li>Standard Contractual Clauses (SCCs) for data transfers.</li>
              <li>Adequacy decisions by the European Commission.</li>
              <li>Other appropriate safeguards as required by GDPR.</li>
            </ul>
          </p>
          
          <h2 className="font-display text-2xl font-semibold mt-8">10. Changes to This Privacy Policy</h2>
          <p>
            We may update this policy from time to time. Any changes will be posted here with a new effective date. We will notify you of significant changes via email or through our website.
          </p>
          
          <h2 className="font-display text-2xl font-semibold mt-8">11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or want to exercise your GDPR rights, reach us at:
            <br />
            Email: <a href="mailto:privacy@strandly.co" className="text-accent hover:underline">privacy@strandly.co</a>
            <br />
            Data Protection Officer: <a href="mailto:dpo@strandly.co" className="text-accent hover:underline">dpo@strandly.co</a>
          </p>
          <p>
            You also have the right to lodge a complaint with your local data protection authority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
