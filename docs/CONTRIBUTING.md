# Contributing Guide

## 🤝 Welcome to Strandly

Thank you for your interest in contributing to Strandly! This guide will help you get started with our development workflow and ensure your contributions align with our project standards.

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm/yarn
- **Git** for version control
- **VS Code** or **Cursor** (recommended)
- **Figma** access for design assets (if working on UI)

### Development Setup
1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/strandly-europage-glow-main.git
   cd strandly-europage-glow-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Configure your environment variables
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌳 Git Workflow

### Branch Strategy
We use **Git Flow** with the following branches:

- **`main`** - Production-ready code
- **`develop`** - Integration branch for features
- **`feature/*`** - Feature development branches
- **`hotfix/*`** - Critical bug fixes
- **`release/*`** - Release preparation branches

### Branch Naming Convention
```bash
# Feature branches
feature/booking-calendar
feature/stylist-profiles
feature/payment-integration

# Bug fix branches
fix/booking-validation-error
fix/mobile-navigation-issue

# Hotfix branches
hotfix/critical-security-patch
hotfix/payment-processing-bug

# Release branches
release/v1.2.0
release/v1.3.0
```

### Commit Convention
We follow **Conventional Commits** specification:

```bash
# Format
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Commit Types
- **`feat`**: New feature
- **`fix`**: Bug fix
- **`docs`**: Documentation changes
- **`style`**: Code style changes (formatting, etc.)
- **`refactor`**: Code refactoring
- **`test`**: Adding or updating tests
- **`chore`**: Maintenance tasks
- **`perf`**: Performance improvements
- **`ci`**: CI/CD changes
- **`build`**: Build system changes

#### Examples
```bash
feat(booking): add calendar component for appointment scheduling

fix(auth): resolve login redirect issue on mobile devices

docs(readme): update installation instructions

style(components): format button component with prettier

refactor(api): simplify booking endpoint logic

test(booking): add unit tests for booking form validation

chore(deps): update dependencies to latest versions

perf(images): optimize image loading with next/image

ci(github): add automated testing workflow

build(webpack): update webpack configuration
```

## 🎨 Code Standards

### TypeScript Guidelines
```typescript
// Use explicit types for function parameters and return values
interface User {
  id: string;
  name: string;
  email: string;
}

const createUser = (userData: Omit<User, 'id'>): Promise<User> => {
  // Implementation
};

// Use enums for constants
enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

// Use type guards for runtime type checking
const isUser = (obj: unknown): obj is User => {
  return typeof obj === 'object' && obj !== null && 'id' in obj;
};
```

### React Best Practices
```tsx
// Use functional components with TypeScript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Use custom hooks for reusable logic
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};
```

### CSS/Styling Guidelines
```css
/* Use CSS custom properties for consistent theming */
:root {
  --color-primary: #4e342e;
  --color-secondary: #f5efe7;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
}

/* Use BEM methodology for CSS classes */
.booking-card {
  background: var(--color-secondary);
  padding: var(--spacing-md);
  border-radius: 8px;
}

.booking-card__header {
  margin-bottom: var(--spacing-sm);
}

.booking-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
}

.booking-card__title--large {
  font-size: 1.5rem;
}

.booking-card__content {
  color: #666;
  line-height: 1.5;
}
```

## 🧪 Testing Guidelines

### Unit Testing
```tsx
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Integration Testing
```tsx
// __tests__/pages/booking.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BookingPage } from '@/app/booking/page';

const server = setupServer(
  rest.get('/api/stylists', (req, res, ctx) => {
    return res(ctx.json({ stylists: mockStylists }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Booking Page', () => {
  it('loads and displays stylists', async () => {
    render(<BookingPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Available Stylists')).toBeInTheDocument();
    });
    
    expect(screen.getAllByTestId('stylist-card')).toHaveLength(3);
  });
});
```

### E2E Testing
```typescript
// e2e/booking.spec.ts
import { test, expect } from '@playwright/test';

test('user can book an appointment', async ({ page }) => {
  await page.goto('/stylists');
  
  // Select a stylist
  await page.click('[data-testid="stylist-card"]:first-child');
  
  // Choose a service
  await page.selectOption('[data-testid="service-select"]', 'haircut');
  
  // Select date and time
  await page.click('[data-testid="date-picker"]');
  await page.click('[data-testid="time-slot"]:first-child');
  
  // Fill booking form
  await page.fill('[data-testid="name-input"]', 'John Doe');
  await page.fill('[data-testid="email-input"]', 'john@example.com');
  await page.fill('[data-testid="phone-input"]', '+1234567890');
  
  // Submit booking
  await page.click('[data-testid="book-button"]');
  
  // Verify confirmation
  await expect(page.locator('[data-testid="booking-confirmation"]')).toBeVisible();
  await expect(page.locator('text=Booking Confirmed')).toBeVisible();
});
```

## 📝 Pull Request Process

### Before Submitting
1. **Run tests locally**
   ```bash
   npm run test
   npm run test:e2e
   npm run lint
   npm run type-check
   ```

2. **Update documentation** if needed
3. **Add tests** for new features
4. **Update changelog** if applicable

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code is commented where necessary
- [ ] Documentation updated
- [ ] No new warnings introduced
```

### Review Process
1. **Automated checks** must pass
2. **At least one approval** required
3. **No merge conflicts**
4. **All conversations resolved**

## 🐛 Bug Reports

### Bug Report Template
```markdown
## Bug Description
Clear and concise description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Screenshots
If applicable, add screenshots

## Environment
- OS: [e.g. iOS, Windows, macOS]
- Browser: [e.g. Chrome, Safari, Firefox]
- Version: [e.g. 22]

## Additional Context
Any other context about the problem
```

## ✨ Feature Requests

### Feature Request Template
```markdown
## Feature Description
Clear and concise description of the feature

## Problem Statement
What problem does this feature solve?

## Proposed Solution
Describe your proposed solution

## Alternatives Considered
Describe any alternative solutions you've considered

## Additional Context
Add any other context or screenshots about the feature request
```

## 🔧 Development Tools

### VS Code Extensions
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### Pre-commit Hooks
```json
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
npm run type-check
npm run test:unit
```

### Linting Configuration
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

## 📚 Documentation

### Code Documentation
```typescript
/**
 * Calculates the total price for a booking including services and taxes
 * @param services - Array of selected services
 * @param stylist - Selected stylist with pricing information
 * @param taxRate - Tax rate as decimal (e.g., 0.19 for 19%)
 * @returns Object containing subtotal, tax amount, and total price
 */
interface BookingPrice {
  subtotal: number;
  tax: number;
  total: number;
}

const calculateBookingPrice = (
  services: Service[],
  stylist: Stylist,
  taxRate: number = 0.19
): BookingPrice => {
  const subtotal = services.reduce((sum, service) => sum + service.price, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return { subtotal, tax, total };
};
```

### README Updates
- Update installation instructions
- Add new environment variables
- Document new features
- Update API documentation

## 🚀 Release Process

### Version Numbering
We follow **Semantic Versioning** (SemVer):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Release notes prepared
- [ ] Deployment successful

## 🤝 Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior
- Harassment, trolling, or inappropriate comments
- Personal attacks or political discussions
- Public or private harassment
- Publishing private information without permission
- Other unprofessional conduct

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Slack**: Real-time communication (invite required)
- **Email**: contact@strandly.com for sensitive matters

### Resources
- [Project Documentation](./README.md)
- [Architecture Guide](./ARCHITECTURE.md)
- [Design System](./DESIGN.md)
- [Component Library](./COMPONENTS.md)

---

Thank you for contributing to Strandly! Together, we're building something amazing for the Afro hair community. 🌟
