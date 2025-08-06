import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n';
import { setup } from 'klaro';
import klaroConfig from './klaro-config';
import i18n from './i18n';

// Initialize Klaro with current language
const initializeKlaro = () => {
  // Update the language in the config
  klaroConfig.lang = i18n.language || 'en';
  setup(klaroConfig);
};

// Initialize Klaro on startup
initializeKlaro();

// Reinitialize Klaro when language changes
i18n.on('languageChanged', () => {
  initializeKlaro();
});

createRoot(document.getElementById("root")!).render(<App />);
