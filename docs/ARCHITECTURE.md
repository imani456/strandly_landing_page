# Architecture Guide

## 🏗️ System Architecture

Strandly is built using a modern, scalable architecture that prioritizes performance, maintainability, and user experience.

## 🎯 Core Principles

- **Server-First**: Leverage Next.js App Router and Server Components
- **Content-Driven**: Directus CMS for all dynamic content
- **Mobile-Optimized**: Mobile-first responsive design
- **Performance**: Core Web Vitals optimization
- **Scalability**: Microservices-ready architecture

## 🛠️ Technology Stack

### Frontend
- **Next.js 14+** with App Router
- **React 18+** with Server Components
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Shadcn UI** for component library
- **Framer Motion** for animations

### Backend & CMS
- **Directus** as headless CMS
- **PostgreSQL** as primary database
- **Directus MCP** for seamless integration
- **REST API** for data fetching

### Infrastructure
- **Vercel** for hosting and deployment
- **Edge Functions** for serverless operations
- **CDN** for static asset delivery
- **Redis** for caching (future)

## 📁 Folder Structure

```
app/
├── [locale]/                 # Internationalized routes
│   ├── page.tsx             # Homepage
│   ├── about/
│   │   └── page.tsx         # About page
│   ├── bookings/
│   │   ├── page.tsx         # Booking listing
│   │   ├── [id]/
│   │   │   └── page.tsx     # Individual booking
│   │   └── new/
│   │       └── page.tsx     # New booking form
│   ├── shop/
│   │   ├── page.tsx         # Product catalog
│   │   ├── [slug]/
│   │   │   └── page.tsx     # Product detail
│   │   └── cart/
│   │       └── page.tsx     # Shopping cart
│   ├── stylists/
│   │   ├── page.tsx         # Stylist directory
│   │   └── [id]/
│   │       └── page.tsx     # Stylist profile
│   ├── blog/
│   │   ├── page.tsx         # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx     # Blog post
│   └── contact/
│       └── page.tsx         # Contact page
├── api/                     # API routes
│   ├── bookings/
│   ├── payments/
│   └── webhooks/
├── globals.css              # Global styles
├── layout.tsx               # Root layout
└── loading.tsx              # Global loading UI

components/
├── ui/                      # Shadcn UI components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── ...
├── forms/                   # Form components
│   ├── BookingForm.tsx
│   ├── ContactForm.tsx
│   └── SearchForm.tsx
├── layout/                  # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   └── Sidebar.tsx
├── features/                # Feature-specific components
│   ├── booking/
│   │   ├── BookingCalendar.tsx
│   │   ├── ServiceCard.tsx
│   │   └── BookingWizard.tsx
│   ├── shop/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── CartItem.tsx
│   └── stylists/
│       ├── StylistCard.tsx
│       ├── StylistProfile.tsx
│       └── PortfolioGallery.tsx
└── common/                  # Shared components
    ├── LoadingSpinner.tsx
    ├── ErrorBoundary.tsx
    └── SEO.tsx

lib/
├── directus.ts              # Directus client configuration
├── utils.ts                 # Utility functions
├── validations.ts           # Form validation schemas
├── constants.ts             # App constants
├── hooks/                   # Custom React hooks
│   ├── useBookings.ts
│   ├── useProducts.ts
│   ├── useStylists.ts
│   └── useLocalStorage.ts
└── types/                   # TypeScript type definitions
    ├── booking.ts
    ├── product.ts
    ├── stylist.ts
    └── common.ts

i18n/
├── en.json                  # English translations
├── de.json                  # German translations
├── fr.json                  # French translations
└── config.ts                # i18n configuration

styles/
├── globals.css              # Global styles
├── components.css           # Component-specific styles
└── utilities.css            # Utility classes
```

## 🔄 Data Flow

### 1. Content Management
```
Directus CMS → Directus MCP → Next.js API Routes → React Components
```

### 2. User Interactions
```
User Action → React Component → Custom Hook → API Route → Directus → Database
```

### 3. State Management
- **Server State**: React Query for API data
- **Client State**: React Context + useReducer
- **Form State**: React Hook Form + Zod validation
- **URL State**: Next.js router for navigation

## 🎨 Component Architecture

### Atomic Design Pattern

#### Atoms
- `Button`, `Input`, `Badge`, `Icon`
- Basic UI elements with no dependencies

#### Molecules
- `SearchForm`, `ProductCard`, `ServiceCard`
- Combinations of atoms with specific functionality

#### Organisms
- `Header`, `Footer`, `BookingWizard`, `ProductGrid`
- Complex components with multiple molecules

#### Templates
- `PageLayout`, `DashboardLayout`, `AuthLayout`
- Page structure and layout components

#### Pages
- `HomePage`, `BookingPage`, `ShopPage`
- Complete page implementations

## 🔌 API Integration

### Directus Integration
```typescript
// lib/directus.ts
export const directus = new Directus(process.env.DIRECTUS_URL);

// Custom hooks for data fetching
export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => directus.items('bookings').readByQuery()
  });
};
```

### API Routes
```typescript
// app/api/bookings/route.ts
export async function GET() {
  const bookings = await directus.items('bookings').readByQuery();
  return Response.json(bookings);
}
```

## 🚀 Performance Optimization

### Server Components
- Use Server Components for static content
- Minimize client-side JavaScript
- Leverage React Suspense for loading states

### Caching Strategy
- **Static Generation**: ISR for blog posts and product pages
- **Server Caching**: Directus query caching
- **Client Caching**: React Query for API data
- **CDN**: Vercel Edge Network for static assets

### Image Optimization
- Next.js Image component with lazy loading
- WebP format with fallbacks
- Responsive images with multiple sizes

## 🔒 Security

### Authentication
- NextAuth.js for user authentication
- JWT tokens for API authentication
- Role-based access control (RBAC)

### Data Protection
- Input validation with Zod
- SQL injection prevention via Directus
- XSS protection with DOMPurify
- CSRF protection for forms

### Privacy
- GDPR compliance for EU users
- Cookie consent management
- Data anonymization for analytics

## 📱 Mobile Optimization

### Responsive Design
- Mobile-first CSS approach
- Touch-friendly interface elements
- Optimized for various screen sizes

### Performance
- Core Web Vitals optimization
- Lazy loading for images and components
- Service worker for offline functionality

## 🌍 Internationalization

### Multi-language Support
- next-intl for translation management
- Locale-based routing
- Dynamic content translation via Directus

### SEO Optimization
- Meta tags for each locale
- Structured data markup
- Sitemap generation
- Open Graph and Twitter Cards

## 🧪 Testing Strategy

### Unit Tests
- Jest + React Testing Library
- Component testing
- Hook testing
- Utility function testing

### Integration Tests
- API route testing
- Database integration testing
- Third-party service mocking

### E2E Tests
- Playwright for user journeys
- Cross-browser testing
- Mobile device testing

## 🚀 Deployment

### Vercel Configuration
- Automatic deployments from Git
- Preview deployments for PRs
- Environment variable management
- Edge function deployment

### CI/CD Pipeline
1. Code push to repository
2. Automated testing
3. Build and deployment
4. Health checks and monitoring

## 📊 Monitoring & Analytics

### Performance Monitoring
- Vercel Analytics
- Core Web Vitals tracking
- Error monitoring with Sentry

### Business Analytics
- User behavior tracking
- Conversion funnel analysis
- A/B testing capabilities

## 🔮 Future Considerations

### Scalability
- Microservices architecture
- Database sharding
- CDN expansion
- Caching layers

### Features
- Real-time notifications
- Video consultations
- Mobile app development
- AI-powered recommendations

---

This architecture provides a solid foundation for building a scalable, maintainable, and user-friendly platform that can grow with Strandly's business needs.
