# Strandly - Afro Hair Styling Platform

> **Connecting Afro hair stylists with clients across Europe**

Strandly is a comprehensive platform that bridges the gap between skilled Afro hair stylists and clients seeking quality hair care services. Built with modern web technologies and a focus on user experience, accessibility, and scalability.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: TailwindCSS + Shadcn UI
- **CMS**: Directus (MCP integration)
- **Internationalization**: next-intl
- **State Management**: React Query / SWR
- **Animations**: Framer Motion
- **Payments**: Stripe / PayPal
- **Deployment**: Vercel
- **Database**: PostgreSQL (via Directus)

## 🎯 Core Features

### For Clients
- **Stylist Discovery**: Browse verified stylists by location, specialty, and availability
- **Booking System**: Seamless appointment scheduling with calendar integration
- **Product Shop**: Curated hair care products with reviews and recommendations
- **Community**: Reviews, ratings, and social features
- **Multilingual Support**: English, German, French (expandable)

### For Stylists
- **Profile Management**: Professional profiles with portfolio and services
- **Booking Management**: Calendar, client communication, and payment tracking
- **Business Tools**: Analytics, marketing tools, and client management
- **Onboarding**: Streamlined registration and verification process

## 📁 Project Structure

```
strandly-europage-glow-main/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── bookings/      # Booking system
│   │   ├── shop/          # E-commerce
│   │   ├── stylists/      # Stylist profiles
│   │   └── blog/          # Content management
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn UI components
│   └── forms/            # Form components
├── lib/                  # Utilities and configurations
│   ├── directus.ts       # CMS client
│   ├── utils.ts          # Helper functions
│   └── validations.ts    # Form validations
├── i18n/                 # Translation files
├── styles/               # Global styles
├── docs/                 # Documentation
└── public/               # Static assets
```

## 🎨 Design Philosophy

- **Minimalist & Editorial**: Clean, sophisticated aesthetic
- **Mobile-First**: Optimized for mobile users (primary audience)
- **Accessibility**: WCAG AA compliance
- **Brand Colors**: Warm beige, cocoa brown, gold accents
- **Typography**: Prata (headers), Raleway/Open Sans (body)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd strandly-europage-glow-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Configure your Directus URL and API keys
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

- [Architecture Guide](./ARCHITECTURE.md) - Technical architecture and patterns
- [Design System](./DESIGN.md) - Visual design guidelines
- [UI/UX Guidelines](./UI_UX.md) - User experience best practices
- [Component Library](./COMPONENTS.md) - Reusable component documentation
- [Internationalization](./I18N.md) - Multi-language support
- [Contributing Guide](./CONTRIBUTING.md) - Development workflow

## 🌍 Internationalization

Strandly supports multiple languages to serve the diverse European market:
- **English** (default)
- **German** (Deutsch)
- **French** (Français) - Future expansion

## 🔧 Development

### Code Quality
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Conventional Commits** for commit messages

### Testing
- **Jest** + **React Testing Library** for unit tests
- **Playwright** for end-to-end testing
- **Storybook** for component development

### Deployment
- **Vercel** for production deployment
- **Preview branches** for staging
- **Automatic deployments** on merge to main

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is proprietary to Strandly. All rights reserved.

## 📞 Support

For technical support or questions about the platform, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for the Afro hair community in Europe**
