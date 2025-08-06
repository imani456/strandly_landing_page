import { t } from 'i18next';

const klaroConfig = {
  lang: 'en',
  
  translations: {
    en: {
      consentModal: {
        title: t('cookie_consent.title'),
        description: t('cookie_consent.description'),
        privacyPolicy: t('cookie_consent.privacyPolicy'),
        imprint: t('cookie_consent.imprint'),
        save: t('cookie_consent.save'),
        acceptAll: t('cookie_consent.acceptAll'),
        declineAll: t('cookie_consent.declineAll'),
      },
      app: {
        optOut: t('cookie_consent.app.optOut'),
        optIn: t('cookie_consent.app.optIn'),
        toggle: t('cookie_consent.app.toggle'),
        toggleAll: t('cookie_consent.app.toggleAll'),
      },
      necessary: {
        title: t('cookie_consent.necessary.title'),
        description: t('cookie_consent.necessary.description'),
      },
      // Add other service translations here as needed
      'google-analytics': {
        title: t('cookie_consent.analytics.title'),
        description: t('cookie_consent.analytics.description'),
      },
      'microsoft-clarity': {
        title: t('cookie_consent.microsoft_clarity.title'),
        description: t('cookie_consent.microsoft_clarity.description'),
      },
      'tawk-to': {
        title: t('cookie_consent.tawk_to.title'),
        description: t('cookie_consent.tawk_to.description'),
      },
    },
  },
  apps: [
    {
      title: t('cookie_consent.necessary.title'),
      name: 'necessary',
      purposes: ['necessary'],
      required: true,
      default: true,
      description: t('cookie_consent.necessary.description'),
    },
    {
      title: t('cookie_consent.analytics.title'),
      name: 'google-analytics',
      purposes: ['analytics'],
      cookies: [
        /^_ga/,
        /^_gid/,
        /^_gat/,
        /^_gac_/,
        /^_ga_/,
      ],
      default: false,
      description: t('cookie_consent.analytics.description'),
    },
    {
      title: t('cookie_consent.microsoft_clarity.title'),
      name: 'microsoft-clarity',
      purposes: ['analytics'],
      cookies: [
        /^MUID/,
        /^CLID/,
        /^ANON/,
        /^MR/,
        /^SM/,
        /^SR/,
        /^__Host-MSFPC/,
      ],
      default: false,
      description: t('cookie_consent.microsoft_clarity.description'),
    },
    {
      title: t('cookie_consent.tawk_to.title'),
      name: 'tawk-to',
      purposes: ['support'],
      cookies: [
        /^Tawk_/, // Tawk.to cookies often start with Tawk_
      ],
      default: false,
      description: t('cookie_consent.tawk_to.description'),
    },
  ],
};

export default klaroConfig;