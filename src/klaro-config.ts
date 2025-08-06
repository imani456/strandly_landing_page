import { t } from 'i18next';

const klaroConfig = {
  version: 1,
  elementID: "klaro",
  cookieName: "klaro",
  cookieExpiresAfterDays: 365,
  privacyPolicy: "/datenschutzerklaerung",
  default: false,
  acceptAll: true,
  hideDeclineAll: false,
  
  translations: {
    de: {
      consentModal: {
        title: "Wir verwenden Cookies",
        description: "Wir nutzen Cookies, um unsere Website für Sie zu optimieren und Ihnen die bestmögliche Nutzererfahrung zu bieten. Sie können selbst entscheiden, welche Kategorien Sie zulassen. Essenzielle Cookies sind für den Betrieb der Website erforderlich."
      },
      consentNotice: {
        learnMore: "Einstellungen",
        description: "Wir nutzen Cookies, um unsere Website zu optimieren. Sie können Ihre Auswahl jederzeit ändern."
      },
      decline: "Nur notwendige akzeptieren",
      ok: "Alle akzeptieren",
      save: "Einstellungen speichern"
    },
    en: {
      consentModal: {
        title: "We use cookies",
        description: "We use cookies to optimize our website and provide the best possible user experience. You can choose which categories to allow. Essential cookies are required for the basic functionality of the website."
      },
      consentNotice: {
        learnMore: "Settings",
        description: "We use cookies to optimize our website. You can change your selection at any time."
      },
      decline: "Accept only necessary",
      ok: "Accept all",
      save: "Save settings"
    }
  },
  apps: [
    {
      name: "necessary",
      title: {
        de: "Essentiell",
        en: "Essential"
      },
      purposes: ["necessary"],
      required: true,
      cookies: [
        ["sessionid", "/", ".strandlyeu.com"]
      ]
    },
    {
      name: "analytics",
      title: {
        de: "Analytik",
        en: "Analytics"
      },
      purposes: ["analytics"],
      required: false,
      cookies: [
        ["_ga", "/", ".strandlyeu.com"],
        ["_gid", "/", ".strandlyeu.com"]
      ]
    },
    {
      name: "support",
      title: {
        de: "Support / Chat",
        en: "Support / Chat"
      },
      purposes: ["support"],
      required: false,
      cookies: [
        ["tawkto_session", "/", ".strandlyeu.com"]
      ]
    }
  ]
};

export default klaroConfig;