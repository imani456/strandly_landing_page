import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n';
import Klaro from 'klaro';
import klaroConfig from './klaro-config';

Klaro.setup(klaroConfig);

createRoot(document.getElementById("root")!).render(<App />);
