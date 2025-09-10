# Design System

## 🎨 Brand Identity

Strandly embodies a sophisticated, minimalist aesthetic that reflects the premium nature of Afro hair care services while maintaining accessibility and warmth. The design is inspired by editorial fashion magazines with a focus on clean typography and warm, inviting colors.

## 🎯 Design Principles

- **Minimalist & Editorial**: Clean, sophisticated aesthetic inspired by high-end fashion magazines
- **Warm & Inviting**: Colors and typography that feel welcoming and professional
- **Mobile-First**: Designed primarily for mobile users (our core audience)
- **Accessible**: WCAG AA compliance for inclusive design
- **Consistent**: Unified visual language across all touchpoints
- **Hero-Centric**: Large, impactful hero sections with portrait imagery

## 🎨 Color Palette

### Primary Colors (HSL Format)
```css
/* Warm Beige - Primary Background */
--warm-beige: 34 53% 80%;        /* #e7cfb1 */
--warm-white: 34 53% 80%;        /* #e7cfb1 */
--background: 34 53% 80%;        /* #e7cfb1 */

/* Cocoa Brown - Primary Text & Accents */
--cocoa-brown: 26 100% 10%;      /* #1a0f0a */
--foreground: 26 100% 10%;       /* #1a0f0a */
--primary: 26 100% 10%;          /* #1a0f0a */

/* Caramel Gold - Accent Colors */
--caramel-gold: 26 100% 10%;     /* #1a0f0a */
--soft-caramel: 26 100% 10%;     /* #1a0f0a */
```

### Semantic Colors
```css
/* Muted Colors */
--muted: 34 53% 80%;             /* #e7cfb1 */
--muted-foreground: 26 100% 10%; /* #1a0f0a */

/* Border & Input */
--border: 26 100% 10%;           /* #1a0f0a */
--input: 26 100% 10%;            /* #1a0f0a */
--ring: 26 100% 10%;             /* #1a0f0a */

/* Destructive */
--destructive: 0 84.2% 60.2%;    /* #ef4444 */
--destructive-foreground: 0 0% 100%; /* #ffffff */
```

### Semantic Colors
```css
/* Success */
--success: #22c55e;
--success-light: #4ade80;
--success-dark: #16a34a;

/* Warning */
--warning: #f59e0b;
--warning-light: #fbbf24;
--warning-dark: #d97706;

/* Error */
--error: #ef4444;
--error-light: #f87171;
--error-dark: #dc2626;

/* Info */
--info: #3b82f6;
--info-light: #60a5fa;
--info-dark: #2563eb;
```

## 📝 Typography

### Font Families

#### Headers - Prata
```css
font-family: 'Prata', serif;
```
- **Usage**: All headings (H1-H6), hero text, call-to-actions
- **Characteristics**: Elegant, sophisticated, editorial feel
- **Weights**: 400 (Regular), 600 (SemiBold), 700 (Bold)

#### Body Text - Raleway / Open Sans
```css
font-family: 'Raleway', 'Open Sans', sans-serif;
```
- **Usage**: Body text, captions, form labels, navigation
- **Characteristics**: Clean, readable, modern
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold)

### Typography Scale
```css
/* Display Text - Hero Titles */
.text-display {
  font-size: 5rem;        /* 80px - 8xl */
  line-height: 1.1;
  font-weight: 400;
  font-family: 'Prata', serif;
}

/* Large Headings - Section Titles */
.text-h1 {
  font-size: 5rem;        /* 80px - 6xl */
  line-height: 1.1;
  font-weight: 400;
  font-family: 'Prata', serif;
}

.text-h2 {
  font-size: 3rem;        /* 48px - 5xl */
  line-height: 1.2;
  font-weight: 400;
  font-family: 'Prata', serif;
}

.text-h3 {
  font-size: 1.875rem;    /* 30px - 3xl */
  line-height: 1.3;
  font-weight: 400;
  font-family: 'Prata', serif;
}

/* Body Text - Open Sans */
.text-body-lg {
  font-size: 1.5rem;      /* 24px - 2xl */
  line-height: 1.6;
  font-weight: 400;
  font-family: 'Open Sans', sans-serif;
}

.text-body {
  font-size: 1rem;        /* 16px - base */
  line-height: 1.6;
  font-weight: 400;
  font-family: 'Open Sans', sans-serif;
}

.text-body-sm {
  font-size: 0.875rem;    /* 14px - sm */
  line-height: 1.5;
  font-weight: 400;
  font-family: 'Open Sans', sans-serif;
}
```

## 📐 Spacing System

### Base Unit: 8px
```css
/* Spacing Scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Component Spacing
```css
/* Padding */
.p-sm { padding: var(--space-2); }
.p-md { padding: var(--space-4); }
.p-lg { padding: var(--space-6); }
.p-xl { padding: var(--space-8); }

/* Margin */
.m-sm { margin: var(--space-2); }
.m-md { margin: var(--space-4); }
.m-lg { margin: var(--space-6); }
.m-xl { margin: var(--space-8); }
```

## 🎭 Component Design

### Landing Page Layout Patterns

#### Hero Section Layout
```tsx
// Two-column grid with image and content
<section className="min-h-screen grid lg:grid-cols-2 items-center bg-background">
  {/* Left Image - Portrait fills height */}
  <div className="relative order-2 lg:order-1 h-full flex items-end justify-center lg:justify-end">
    <img src={heroPortrait} alt="Woman with natural afro hair" 
         className="w-full h-full object-cover object-bottom" />
  </div>
  
  {/* Right Content */}
  <div className="space-y-8 pt-12 sm:pt-28 lg:pt-0 order-1 lg:order-2">
    <h1 className="font-display text-5xl md:text-6xl lg:text-8xl text-foreground leading-tight">
      {title}
    </h1>
    <p className="font-body text-base md:text-2xl text-foreground leading-relaxed">
      {subtitle}
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <Button variant="hero-outline" size="xl">Learn More</Button>
      <Button variant="hero" size="xl">Join Waitlist</Button>
    </div>
  </div>
</section>
```

#### Process Steps Layout
```tsx
// Three-column grid with connecting line
<section className="py-24 bg-background">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
    <div className="relative grid gap-y-12 md:grid-cols-3 md:gap-x-12">
      {/* Dashed connecting line */}
      <div className="absolute top-8 left-0 right-0 hidden md:block">
        <div className="w-full border-t-2 border-dashed border-muted"></div>
      </div>
      
      {steps.map((step, index) => (
        <div key={index} className="relative text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center shadow-warm z-10 relative">
            <img src={step.icon} alt={`Step ${index + 1}`} className="w-8 h-8" />
          </div>
          <h3 className="font-display text-3xl text-foreground pt-4">
            {step.title}
          </h3>
          <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-xs mx-auto">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

#### Dual Content Section
```tsx
// Two-column content with mobile mockup
<section className="py-16 sm:py-20 md:py-24 bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
    <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
      {/* Left Content */}
      <div className="space-y-12">
        <div className="space-y-8">
          <h2 className="font-display text-5xl sm:text-6xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            {title}
          </h2>
          <p className="font-body text-xl text-foreground leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
      
      {/* Right Mobile Mockup */}
      <div className="relative flex justify-center lg:justify-end">
        <img src={mobileMockup} alt="Mobile app interface" 
             className="w-full h-auto drop-shadow-elegant" />
      </div>
    </div>
  </div>
</section>
```

### Atomic Design Structure

#### Atoms
- **Button**: Hero, hero-outline, primary, secondary variants
- **Input**: Text, email, password, search, textarea
- **Badge**: Status, category, notification indicators
- **Icon**: Consistent iconography using Lucide React
- **Avatar**: User profile images with fallbacks

#### Molecules
- **Card**: Content containers with consistent styling
- **Form Field**: Input with label, error, and help text
- **Search Bar**: Input with search icon and clear button
- **Navigation Item**: Link with active states
- **Product Tile**: Product preview with image and details

#### Organisms
- **Header**: Navigation, logo, user menu
- **Footer**: Links, social media, contact info
- **Hero Section**: Two-column layout with image and content
- **Process Steps**: Three-column grid with connecting line
- **Dual Content**: Two-column layout with mobile mockup

## 🎨 Visual Elements

### Shadows
```css
/* Elevation Levels */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

### Border Radius
```css
/* Border Radius Scale */
.rounded-sm { border-radius: 0.125rem; }  /* 2px */
.rounded { border-radius: 0.25rem; }      /* 4px */
.rounded-md { border-radius: 0.375rem; }  /* 6px */
.rounded-lg { border-radius: 0.5rem; }    /* 8px */
.rounded-xl { border-radius: 0.75rem; }   /* 12px */
.rounded-2xl { border-radius: 1rem; }     /* 16px */
.rounded-full { border-radius: 9999px; }  /* Full */
```

### Gradients
```css
/* Brand Gradients */
.gradient-warm {
  background: linear-gradient(135deg, var(--beige-primary) 0%, var(--soft-caramel) 100%);
}

.gradient-cocoa {
  background: linear-gradient(135deg, var(--cocoa-primary) 0%, var(--cocoa-light) 100%);
}

.gradient-gold {
  background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 100%);
}
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
/* xs: 0px - 479px (Mobile) */
/* sm: 480px - 767px (Large Mobile) */
/* md: 768px - 1023px (Tablet) */
/* lg: 1024px - 1279px (Desktop) */
/* xl: 1280px+ (Large Desktop) */
```

### Grid System
```css
/* 12-Column Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-4);
}

/* Responsive Columns */
.col-12 { grid-column: span 12; }
.col-6 { grid-column: span 6; }
.col-4 { grid-column: span 4; }
.col-3 { grid-column: span 3; }

/* Mobile Responsive */
@media (max-width: 767px) {
  .col-mobile-12 { grid-column: span 12; }
  .col-mobile-6 { grid-column: span 6; }
}
```

## 🎭 Animation & Transitions

### Timing Functions
```css
/* Smooth Transitions */
.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-elegant {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.transition-bounce {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Common Animations
```css
/* Hover Effects */
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-fade:hover {
  opacity: 0.8;
}

/* Loading States */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

## 🎨 Component Variants

### Button Variants
```css
/* Primary Button */
.btn-primary {
  background: var(--cocoa-primary);
  color: var(--white-primary);
  border: none;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--rounded-md);
  font-weight: 500;
  transition: var(--transition-smooth);
}

.btn-primary:hover {
  background: var(--cocoa-light);
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--cocoa-primary);
  border: 2px solid var(--cocoa-primary);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--rounded-md);
  font-weight: 500;
  transition: var(--transition-smooth);
}

.btn-secondary:hover {
  background: var(--cocoa-primary);
  color: var(--white-primary);
}
```

### Card Variants
```css
/* Standard Card */
.card {
  background: var(--white-primary);
  border-radius: var(--rounded-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
  transition: var(--transition-smooth);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

/* Elevated Card */
.card-elevated {
  background: var(--white-primary);
  border-radius: var(--rounded-xl);
  box-shadow: var(--shadow-xl);
  padding: var(--space-8);
}
```

## 🌙 Dark Mode (Future)

### Dark Color Palette
```css
/* Dark Mode Colors */
:root[data-theme="dark"] {
  --beige-primary: #2d2a26;
  --cocoa-primary: #f5efe7;
  --white-primary: #1a1a1a;
  --gold-primary: #d4af37;
}
```

## ♿ Accessibility

### Color Contrast
- **AA Compliance**: Minimum 4.5:1 contrast ratio for normal text
- **AAA Compliance**: Minimum 7:1 contrast ratio for large text
- **Focus States**: Clear focus indicators for keyboard navigation

### Typography
- **Readable Font Sizes**: Minimum 16px for body text
- **Line Height**: 1.5x font size for optimal readability
- **Font Weight**: Minimum 400 for body text

### Interactive Elements
- **Touch Targets**: Minimum 44px for mobile touch targets
- **Focus Indicators**: Visible focus states for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML

---

This design system ensures consistency, accessibility, and a premium user experience across all Strandly touchpoints.