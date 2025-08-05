
import BackButton from "@/components/BackButton";

const TermsOfService = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="mb-8">
          <BackButton />
        </div>
        <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="space-y-6 font-body text-lg">
          <p>
            Effective Date: 01.08.2025
          </p>
          <p>
            Welcome to Strandly, the platform connecting clients and Afro hairstylists across Europe. By using our website or services, you agree to the following terms:
          </p>

          <h2 className="font-display text-2xl font-semibold mt-8">Our Service</h2>
          <p>
            Strandly is a booking platform. We connect clients with hairstylists but do not operate salons or provide hairstyling services directly.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-8">Bookings & Payments</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Bookings are agreements between clients and stylists.</li>
            <li>Payments and cancellations follow the stylist’s terms.</li>
            <li>Strandly is not responsible for service quality but encourages honest reviews to maintain trust.</li>
          </ul>

          <h2 className="font-display text-2xl font-semibold mt-8">User Responsibilities</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Provide accurate information when using the platform.</li>
            <li>Respect stylists and other users in all interactions.</li>
            <li>Do not misuse Strandly for spam, fraud, or harmful activity.</li>
          </ul>

          <h2 className="font-display text-2xl font-semibold mt-8">Stylist Responsibilities</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Share accurate service details and pricing.</li>
            <li>Deliver safe, professional services.</li>
            <li>Comply with local regulations and licensing requirements.</li>
          </ul>

          <h2 className="font-display text-2xl font-semibold mt-8">Liability</h2>
          <p>
            Strandly acts solely as a platform.
            We are not liable for damages, injuries, or dissatisfaction arising from services booked through our site.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-8">Privacy</h2>
          <p>
            We value your privacy.
            See our <a href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</a> for details on how we handle your personal data in line with GDPR.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-8">Contact</h2>
          <p>
            Questions about these terms? Reach us at:
            <br />
            Email: <a href="mailto:legal@strandlyeu.com" className="text-accent hover:underline">legal@strandlyeu.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
