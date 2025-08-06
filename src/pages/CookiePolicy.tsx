
import BackButton from "@/components/BackButton";
import { useTranslation } from "react-i18next";

const CookiePolicy = () => {
  const { t } = useTranslation();
  const lastUpdated = "August 5, 2025"; // Current date

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="mb-8">
          <BackButton />
        </div>
        <h1 className="font-display text-4xl font-bold mb-4">Cookie Policy / Cookie-Richtlinie</h1>
        <p className="font-body text-sm text-gray-600 mb-8">
          Last updated: {lastUpdated}
          <br />
          Letzte Aktualisierung: {lastUpdated}
        </p>

        <div className="space-y-8 font-body text-lg">
          {/* English Section */}
          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Cookie Policy (English)</h2>
            <p className="mb-4">
              This website, Strandly (strandlyeu.com), uses cookies to improve your browsing experience and provide essential website functionality.
            </p>

            <h3 className="font-display text-xl font-semibold mb-2">1. What Are Cookies?</h3>
            <p className="mb-4">
              Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences and improve overall user experience.
            </p>

            <h3 className="font-display text-xl font-semibold mb-2">2. Types of Cookies We Use</h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>Essential Cookies:</strong> Required for the basic operation of our website.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website so we can improve it.</li>
              <li><strong>Support/Chat Cookies:</strong> Enable customer support and chat features.</li>
            </ul>

            <h3 className="font-display text-xl font-semibold mb-2">3. Your Choices</h3>
            <p className="mb-4">
              You can choose which cookies to allow using our cookie banner. Essential cookies are always active. You can also delete cookies in your browser settings at any time.
            </p>

            <h3 className="font-display text-xl font-semibold mb-2">4. More Information</h3>
            <p>
              For more details about how we process your personal data, please see our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </section>

          <hr className="border-t border-gray-300 my-8" />

          {/* German Section */}
          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Cookie-Richtlinie (Deutsch)</h2>
            <p className="mb-4">
              Diese Website, Strandly (strandlyeu.com), verwendet Cookies, um Ihre Nutzererfahrung zu verbessern und die grundlegende Funktionalität der Website zu gewährleisten.
            </p>

            <h3 className="font-display text-xl font-semibold mb-2">1. Was sind Cookies?</h3>
            <p className="mb-4">
              Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie eine Website besuchen. Sie helfen dabei, Einstellungen zu speichern und die Nutzung der Website zu optimieren.
            </p>

            <h3 className="font-display text-xl font-semibold mb-2">2. Arten von Cookies, die wir verwenden</h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>Essentielle Cookies:</strong> Für den Betrieb der Website unbedingt erforderlich.</li>
              <li><strong>Analyse-Cookies:</strong> Helfen uns zu verstehen, wie Besucher die Website nutzen, um sie zu verbessern.</li>
              <li><strong>Support/Chat-Cookies:</strong> Ermöglichen Kunden-Support und Chat-Funktionen.</li>
            </ul>

            <h3 className="font-display text-xl font-semibold mb-2">3. Ihre Auswahlmöglichkeiten</h3>
            <p className="mb-4">
              Über unser Cookie-Banner können Sie auswählen, welche Cookies Sie zulassen möchten. Essentielle Cookies sind immer aktiv. Sie können Cookies jederzeit über die Einstellungen Ihres Browsers löschen.
            </p>

            <h3 className="font-display text-xl font-semibold mb-2">4. Weitere Informationen</h3>
            <p>
              Details zur Verarbeitung personenbezogener Daten finden Sie in unserer <a href="/privacy-policy" className="text-blue-600 hover:underline">Datenschutzerklärung</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
