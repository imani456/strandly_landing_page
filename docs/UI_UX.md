# UI/UX Guidelines

## 🎯 User Experience Principles

Strandly's user experience is designed around the core principle of **simplicity meets sophistication**. Every interaction should feel intuitive, accessible, and delightful.

## 👥 Target Users

### Primary Users
- **Afro Hair Clients** (Ages 18-45)
  - Mobile-first users (80%+ mobile traffic)
  - Value convenience and quality
  - Seek authentic, culturally-aware services
  - Price-conscious but quality-focused

### Secondary Users
- **Afro Hair Stylists** (Ages 22-50)
  - Business-oriented professionals
  - Need efficient booking management
  - Value client communication tools
  - Seek growth opportunities

## 📱 Mobile-First Design

### Core Mobile Principles
- **Thumb-Friendly Navigation**: All interactive elements within thumb reach
- **One-Handed Operation**: Critical actions accessible with one hand
- **Fast Loading**: < 3 seconds on 3G networks
- **Offline Capability**: Core features work without internet

### Mobile Layout Guidelines
```css
/* Mobile-First Breakpoints */
/* xs: 0px - 479px (Mobile Portrait) */
/* sm: 480px - 767px (Mobile Landscape) */
/* md: 768px - 1023px (Tablet) */
/* lg: 1024px+ (Desktop) */

/* Touch Target Sizes */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 12px;
}

/* Mobile Navigation */
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--white-primary);
  border-top: 1px solid var(--beige-dark);
  z-index: 50;
}
```

## 🎨 Visual Hierarchy

### Information Architecture
1. **Primary Actions**: Book appointment, browse stylists
2. **Secondary Actions**: View profile, read reviews
3. **Tertiary Actions**: Share, save, settings

### Visual Weight
- **High**: Headlines, CTAs, important notifications
- **Medium**: Body text, navigation items, form labels
- **Low**: Captions, metadata, secondary information

### Content Priority
```css
/* Visual Hierarchy Classes */
.priority-high {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--cocoa-primary);
  margin-bottom: var(--space-4);
}

.priority-medium {
  font-size: 1rem;
  font-weight: 500;
  color: var(--cocoa-light);
  margin-bottom: var(--space-3);
}

.priority-low {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--cocoa-light);
  opacity: 0.8;
}
```

## 🔄 User Flows

### Booking Flow (≤ 3 Steps)
1. **Select Service** → Choose hair service type
2. **Choose Stylist** → Browse and select preferred stylist
3. **Confirm Booking** → Select date/time and confirm

### Shop Flow
1. **Browse Products** → Filter and search products
2. **Add to Cart** → Select quantity and add items
3. **Checkout** → Payment and shipping information

### Stylist Onboarding (≤ 5 Steps)
1. **Basic Info** → Name, location, contact
2. **Services** → List offered services and prices
3. **Portfolio** → Upload photos and descriptions
4. **Availability** → Set working hours and schedule
5. **Verification** → Submit documents for approval

## 🎭 Interaction Design

### Micro-interactions
- **Button Press**: Subtle scale animation (0.95x)
- **Card Hover**: Lift effect with shadow increase
- **Form Focus**: Border color change and subtle glow
- **Loading States**: Skeleton screens and progress indicators

### Animation Principles
```css
/* Micro-interaction Animations */
.btn-press {
  transition: transform 0.1s ease;
}

.btn-press:active {
  transform: scale(0.95);
}

.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.input-focus {
  transition: all 0.2s ease;
}

.input-focus:focus {
  border-color: var(--gold-primary);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}
```

### Loading States
- **Skeleton Screens**: For content loading
- **Progress Bars**: For multi-step processes
- **Spinner Animations**: For quick actions
- **Empty States**: Engaging illustrations with helpful text

## 📝 Content Strategy

### Voice & Tone
- **Warm & Professional**: Friendly but authoritative
- **Inclusive & Celebratory**: Embrace Afro hair diversity
- **Clear & Direct**: No jargon, simple language
- **Encouraging & Supportive**: Build confidence

### Content Guidelines
```markdown
# Good Content Examples

## Headlines
✅ "Find Your Perfect Afro Hair Stylist"
✅ "Book Your Dream Hair Appointment"
❌ "Revolutionary Hair Styling Solutions"

## Descriptions
✅ "Professional stylists specializing in natural hair care"
✅ "Book in 3 simple steps - it's that easy!"
❌ "Cutting-edge hair transformation technology"

## CTAs
✅ "Book Now" / "Find Stylists" / "Get Started"
❌ "Click Here" / "Learn More" / "Submit"
```

### Empty States
```jsx
// Empty State Component
const EmptyState = ({ type, action }) => (
  <div className="empty-state">
    <div className="empty-illustration">
      <HairIcon className="w-16 h-16 text-gray-400" />
    </div>
    <h3 className="empty-title">No {type} found</h3>
    <p className="empty-description">
      {type === 'stylists' 
        ? "We're working on bringing more stylists to your area. Check back soon!"
        : "Start exploring our amazing stylists and book your first appointment."
      }
    </p>
    <Button onClick={action} className="mt-4">
      {type === 'stylists' ? 'Browse All Stylists' : 'Find Stylists'}
    </Button>
  </div>
);
```

## 🎯 Error Handling

### Error Message Design
- **Clear & Actionable**: Tell users what went wrong and how to fix it
- **Friendly Tone**: Avoid technical jargon
- **Visual Hierarchy**: Use color and typography to indicate severity
- **Recovery Options**: Always provide a way forward

### Error States
```jsx
// Error Message Component
const ErrorMessage = ({ type, message, action }) => (
  <div className={`error-message error-${type}`}>
    <div className="error-icon">
      {type === 'network' && <WifiOff className="w-5 h-5" />}
      {type === 'validation' && <AlertCircle className="w-5 h-5" />}
      {type === 'server' && <Server className="w-5 h-5" />}
    </div>
    <div className="error-content">
      <h4 className="error-title">{getErrorTitle(type)}</h4>
      <p className="error-description">{message}</p>
      {action && (
        <Button onClick={action} variant="outline" size="sm">
          Try Again
        </Button>
      )}
    </div>
  </div>
);
```

### Common Error Scenarios
1. **Network Errors**: "Connection lost. Check your internet and try again."
2. **Validation Errors**: "Please check your information and try again."
3. **Server Errors**: "Something went wrong on our end. We're fixing it!"
4. **Not Found**: "The page you're looking for doesn't exist."

## ♿ Accessibility Guidelines

### WCAG AA Compliance
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order

### Accessibility Checklist
```jsx
// Accessible Button Component
const AccessibleButton = ({ children, onClick, disabled, ariaLabel }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className="btn-primary"
    type="button"
  >
    {children}
  </button>
);

// Accessible Form Field
const AccessibleInput = ({ label, error, required, ...props }) => (
  <div className="form-field">
    <label htmlFor={props.id} className="form-label">
      {label}
      {required && <span className="required-asterisk" aria-label="required">*</span>}
    </label>
    <input
      {...props}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? `${props.id}-error` : undefined}
      className={`form-input ${error ? 'error' : ''}`}
    />
    {error && (
      <div id={`${props.id}-error`} className="error-message" role="alert">
        {error}
      </div>
    )}
  </div>
);
```

## 📊 Performance Guidelines

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Performance Best Practices
```jsx
// Lazy Loading Images
const LazyImage = ({ src, alt, ...props }) => (
  <Image
    src={src}
    alt={alt}
    loading="lazy"
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,..."
    {...props}
  />
);

// Code Splitting
const LazyComponent = lazy(() => import('./HeavyComponent'));

// Memoization
const MemoizedComponent = memo(({ data }) => {
  return <ExpensiveComponent data={data} />;
});
```

## 🎨 Responsive Design Patterns

### Mobile Navigation
```jsx
// Mobile-First Navigation
const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="mobile-nav">
      <div className="nav-items">
        <NavItem icon={Home} label="Home" href="/" />
        <NavItem icon={Search} label="Find Stylists" href="/stylists" />
        <NavItem icon={Calendar} label="Bookings" href="/bookings" />
        <NavItem icon={ShoppingBag} label="Shop" href="/shop" />
        <NavItem icon={User} label="Profile" href="/profile" />
      </div>
    </nav>
  );
};
```

### Responsive Grid
```css
/* Responsive Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 🧪 Testing Strategy

### User Testing
- **Usability Testing**: Regular testing with target users
- **A/B Testing**: Test different UI variations
- **Accessibility Testing**: Screen reader and keyboard testing
- **Mobile Testing**: Real device testing across different screen sizes

### Testing Tools
- **Playwright**: E2E testing
- **Jest + RTL**: Component testing
- **Lighthouse**: Performance auditing
- **axe-core**: Accessibility testing

## 📈 Analytics & Metrics

### Key Metrics
- **Conversion Rate**: Booking completion rate
- **User Engagement**: Time on site, page views
- **Mobile Usage**: Mobile vs desktop traffic
- **Error Rates**: 404s, form errors, API failures

### Tracking Implementation
```jsx
// Analytics Hook
const useAnalytics = () => {
  const trackEvent = (eventName, properties) => {
    // Google Analytics 4
    gtag('event', eventName, properties);
    
    // Custom analytics
    analytics.track(eventName, properties);
  };
  
  return { trackEvent };
};

// Usage in Components
const BookingButton = () => {
  const { trackEvent } = useAnalytics();
  
  const handleClick = () => {
    trackEvent('booking_started', {
      service_type: 'hair_styling',
      stylist_id: stylist.id
    });
  };
  
  return <Button onClick={handleClick}>Book Now</Button>;
};
```

---

These UI/UX guidelines ensure that Strandly delivers a consistent, accessible, and delightful user experience across all devices and touchpoints.
