
import BackButton from "@/components/BackButton";
import { useTranslation } from "react-i18next";

const CookiePolicy = () => {
  const { t } = useTranslation();
  const lastUpdated = "August 5, 2025"; // Current date

  return (
    <div className="bg-warm-white text-cocoa-brown min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="mb-8">
          <BackButton />
        </div>
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cocoa-brown mb-4">
            Cookie Policy
          </h1>
          <p className="font-body text-lg text-cocoa-brown/80">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="space-y-8 font-body text-lg">
          {/* English Section */}
          <section className="bg-white/50 rounded-xl p-8 shadow-soft">
            <h2 className="font-display text-2xl font-semibold mb-6 text-cocoa-brown">
              Cookie Policy (English)
            </h2>
            <p className="mb-6 text-cocoa-brown leading-relaxed">
              This website, Strandly (strandlyeu.com), uses cookies to improve your browsing experience and provide essential website functionality.
            </p>

            <h3 className="font-display text-xl font-semibold mb-3 text-cocoa-brown">1. What Are Cookies?</h3>
            <p className="mb-6 text-cocoa-brown leading-relaxed">
              Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences and improve overall user experience.
            </p>

            <h3 className="font-display text-xl font-semibold mb-3 text-cocoa-brown">2. Types of Cookies We Use</h3>
            <ul className="list-disc list-inside space-y-3 mb-6 text-cocoa-brown">
              <li><strong>Essential Cookies:</strong> Required for the basic operation of our website.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website so we can improve it.</li>
              <li><strong>Support/Chat Cookies:</strong> Enable customer support and chat features.</li>
            </ul>

            <h3 className="font-display text-xl font-semibold mb-3 text-cocoa-brown">3. Your Choices</h3>
            <p className="mb-6 text-cocoa-brown leading-relaxed">
              You can choose which cookies to allow using our cookie banner. Essential cookies are always active. You can also delete cookies in your browser settings at any time.
            </p>

            <h3 className="font-display text-xl font-semibold mb-3 text-cocoa-brown">4. More Information</h3>
            <p className="text-cocoa-brown leading-relaxed">
              For more details about how we process your personal data, please see our{" "}
              <a href="/privacy-policy" className="text-cocoa-brown underline hover:text-brown-custom transition-colors">
                Privacy Policy
              </a>.
            </p>
          </section>

          {/* German Section */}
          <section className="bg-white/50 rounded-xl p-8 shadow-soft">
            <h2 className="font-display text-2xl font-semibold mb-6 text-cocoa-brown">
              Cookie-Richtlinie (Deutsch)
            </h2>
            <p className="mb-6 text-cocoa-brown leading-relaxed">
              Diese Website, Strandly (strandlyeu.com), verwendet Cookies, um Ihre Nutzererfahrung zu verbessern und die grundlegende Funktionalität der Website zu gewährleisten.
            </p>

            <h3 className="font-display text-xl font-semibold mb-3 text-cocoa-brown">1. Was sind Cookies?</h3>
            <p className="mb-6 text-cocoa-brown leading-relaxed">
              Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie eine Website besuchen. Sie helfen dabei, Einstellungen zu speichern und die Nutzung der Website zu optimieren.
            </p>

            <h3 className="font-display text-xl font-semibold mb-3 text-cocoa-brown">2. Arten von Cookies, die wir verwenden</h3>
            <ul className="list-disc list-inside space-y-3 mb-6 text-cocoa-brown">
              <li><strong>Essentielle Cookies:</strong> Für den Betrieb der Website unbedingt erforderlich.</li>
              <li><strong>Analyse-Cookies:</strong> Helfen uns zu verstehen, wie Besucher die Website nutzen, um sie zu verbessern.</li>
              <li><strong>Support/Chat-Cookies:</strong> Ermöglichen Kunden-Support und Chat-Funktionen.</li>
            </ul>

            <h3 className="font-display text-xl font-semibold mb-3 text-cocoa-brown">3. Ihre Auswahlmöglichkeiten</h3>
            <p className="mb-6 text-cocoa-brown leading-relaxed">
              Über unser Cookie-Banner können Sie auswählen, welche Cookies Sie zulassen möchten. Essentielle Cookies sind immer aktiv. Sie können Cookies jederzeit über die Einstellungen Ihres Browsers löschen.
            </p>

            <h3 className="font-display text-xl font-semibold mb-3 text-cocoa-brown">4. Weitere Informationen</h3>
            <p className="text-cocoa-brown leading-relaxed">
              Details zur Verarbeitung personenbezogener Daten finden Sie in unserer{" "}
              <a href="/privacy-policy" className="text-cocoa-brown underline hover:text-brown-custom transition-colors">
                Datenschutzerklärung
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
