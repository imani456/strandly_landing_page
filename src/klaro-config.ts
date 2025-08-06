import { t } from 'i18next';
import i18n from './i18n';

// Function to get current language
const getCurrentLanguage = () => {
  return i18n.language || 'en';
};

const klaroConfig = {
  version: 1,
  elementID: "klaro",
  cookieName: "klaro",
  cookieExpiresAfterDays: 365,
  privacyPolicy: "/datenschutzerklaerung",
  default: false,
  acceptAll: true,
  hideDeclineAll: false,
  
  // Use i18n language detection - will be set dynamically
  lang: getCurrentLanguage(),
  
  // Modern theme configuration
  styling: {
    theme: ['base', 'top'],
    additionalClass: 'modern-klaro-theme'
  },
  
  // CSS for modern theme
  cssVars: {
    '--klaro-accent-color': '#a16207',
    '--klaro-accent-hover-color': '#92400e',
    '--klaro-background-color': '#1f2937',
    '--klaro-text-color': '#ffffff',
    '--klaro-border-color': '#374151',
    '--klaro-button-background': '#374151',
    '--klaro-button-hover-background': '#4b5563',
    '--klaro-primary-button-background': '#a16207',
    '--klaro-primary-button-hover-background': '#92400e',
    '--klaro-border-radius': '8px',
    '--klaro-font-family': 'Inter, system-ui, sans-serif',
    '--klaro-font-size': '14px',
    '--klaro-line-height': '1.5',
    '--klaro-padding': '16px',
    '--klaro-margin': '8px',
    '--klaro-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '--klaro-transition': 'all 0.2s ease-in-out'
  },
  
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
    },
    fr: {
      consentModal: {
        title: "Nous utilisons des cookies",
        description: "Nous utilisons des cookies pour optimiser notre site web et vous offrir la meilleure expérience utilisateur possible. Vous pouvez choisir quelles catégories autoriser. Les cookies essentiels sont nécessaires au fonctionnement de base du site web."
      },
      consentNotice: {
        learnMore: "Paramètres",
        description: "Nous utilisons des cookies pour optimiser notre site web. Vous pouvez modifier votre sélection à tout moment."
      },
      decline: "Accepter seulement les nécessaires",
      ok: "Accepter tout",
      save: "Enregistrer les paramètres"
    },
    es: {
      consentModal: {
        title: "Utilizamos cookies",
        description: "Utilizamos cookies para optimizar nuestro sitio web y brindarle la mejor experiencia de usuario posible. Puede elegir qué categorías permitir. Las cookies esenciales son necesarias para la funcionalidad básica del sitio web."
      },
      consentNotice: {
        learnMore: "Configuración",
        description: "Utilizamos cookies para optimizar nuestro sitio web. Puede cambiar su selección en cualquier momento."
      },
      decline: "Aceptar solo las necesarias",
      ok: "Aceptar todo",
      save: "Guardar configuración"
    },
    pt: {
      consentModal: {
        title: "Usamos cookies",
        description: "Usamos cookies para otimizar nosso site e fornecer a melhor experiência de usuário possível. Você pode escolher quais categorias permitir. Cookies essenciais são necessários para a funcionalidade básica do site."
      },
      consentNotice: {
        learnMore: "Configurações",
        description: "Usamos cookies para otimizar nosso site. Você pode alterar sua seleção a qualquer momento."
      },
      decline: "Aceitar apenas os necessários",
      ok: "Aceitar tudo",
      save: "Salvar configurações"
    },
    nl: {
      consentModal: {
        title: "We gebruiken cookies",
        description: "We gebruiken cookies om onze website te optimaliseren en u de best mogelijke gebruikerservaring te bieden. U kunt zelf kiezen welke categorieën u toestaat. Essentiële cookies zijn vereist voor de basisfunctionaliteit van de website."
      },
      consentNotice: {
        learnMore: "Instellingen",
        description: "We gebruiken cookies om onze website te optimaliseren. U kunt uw keuze op elk moment wijzigen."
      },
      decline: "Alleen noodzakelijke accepteren",
      ok: "Alles accepteren",
      save: "Instellingen opslaan"
    },
    pl: {
      consentModal: {
        title: "Używamy plików cookie",
        description: "Używamy plików cookie, aby zoptymalizować naszą stronę internetową i zapewnić najlepsze możliwe doświadczenie użytkownika. Możesz wybrać, które kategorie chcesz zezwolić. Niezbędne pliki cookie są wymagane do podstawowej funkcjonalności strony internetowej."
      },
      consentNotice: {
        learnMore: "Ustawienia",
        description: "Używamy plików cookie, aby zoptymalizować naszą stronę internetową. Możesz zmienić swój wybór w dowolnym momencie."
      },
      decline: "Zaakceptuj tylko niezbędne",
      ok: "Zaakceptuj wszystko",
      save: "Zapisz ustawienia"
    },
    cs: {
      consentModal: {
        title: "Používáme cookies",
        description: "Používáme cookies k optimalizaci našeho webu a poskytnutí nejlepší možné uživatelské zkušenosti. Můžete si vybrat, které kategorie povolit. Základní cookies jsou nutné pro základní funkčnost webu."
      },
      consentNotice: {
        learnMore: "Nastavení",
        description: "Používáme cookies k optimalizaci našeho webu. Svůj výběr můžete kdykoli změnit."
      },
      decline: "Přijmout pouze nezbytné",
      ok: "Přijmout vše",
      save: "Uložit nastavení"
    }
  },
  services: [
    {
      name: "necessary",
      title: {
        de: "Essentiell",
        en: "Essential",
        fr: "Essentiel",
        es: "Esencial",
        pt: "Essencial",
        nl: "Essentieel",
        pl: "Niezbędne",
        cs: "Základní"
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
        en: "Analytics",
        fr: "Analytique",
        es: "Analítica",
        pt: "Analytics",
        nl: "Analytics",
        pl: "Analityka",
        cs: "Analytika"
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
        en: "Support / Chat",
        fr: "Support / Chat",
        es: "Soporte / Chat",
        pt: "Suporte / Chat",
        nl: "Support / Chat",
        pl: "Wsparcie / Czat",
        cs: "Podpora / Chat"
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