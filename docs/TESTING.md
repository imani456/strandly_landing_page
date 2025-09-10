# Testing Guidelines

## 🧪 Testing Strategy

### Testing Pyramid
1. **Unit Tests** (70%) - Individual components and functions
2. **Integration Tests** (20%) - Component interactions and API calls
3. **E2E Tests** (10%) - Complete user workflows

### Testing Tools
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Playwright** - E2E testing
- **MSW** - API mocking
- **Testing Library User Event** - User interaction simulation

## 🔧 Unit Testing

### Component Testing
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

const renderWithQuery = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('Button Component', () => {
  it('renders with correct text', () => {
    renderWithQuery(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    renderWithQuery(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('applies correct variant styles', () => {
    renderWithQuery(<Button variant="hero">Hero Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-warm');
  });
});
```

### Hook Testing
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStylists } from '@/hooks/useStylists';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useStylists Hook', () => {
  it('fetches stylists successfully', async () => {
    const { result } = renderHook(() => useStylists(), {
      wrapper: createWrapper(),
    });
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    
    expect(result.current.data).toBeDefined();
  });
  
  it('handles error state', async () => {
    // Mock API error
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('API Error'));
    
    const { result } = renderHook(() => useStylists(), {
      wrapper: createWrapper(),
    });
    
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    
    expect(result.current.error).toBeDefined();
  });
});
```

### Utility Function Testing
```typescript
import { calculateReadingTime, formatPrice, validateEmail } from '@/utils/helpers';

describe('Utility Functions', () => {
  describe('calculateReadingTime', () => {
    it('calculates reading time correctly', () => {
      const content = 'This is a test content with multiple words.';
      const result = calculateReadingTime(content);
      expect(result).toBe(1); // 1 minute for short content
    });
    
    it('handles empty content', () => {
      const result = calculateReadingTime('');
      expect(result).toBe(0);
    });
  });
  
  describe('formatPrice', () => {
    it('formats price with currency', () => {
      const result = formatPrice(29.99, 'EUR');
      expect(result).toBe('€29.99');
    });
    
    it('handles zero price', () => {
      const result = formatPrice(0, 'EUR');
      expect(result).toBe('€0.00');
    });
  });
  
  describe('validateEmail', () => {
    it('validates correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });
    
    it('rejects invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });
});
```

## 🔗 Integration Testing

### API Integration
```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import { StylistList } from '@/components/StylistList';

const server = setupServer(
  rest.get('/api/items/stylists', (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: '1',
            first_name: 'Sarah',
            last_name: 'Johnson',
            bio: 'Professional hairstylist',
            rating: 4.8
          }
        ]
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('StylistList Integration', () => {
  it('fetches and displays stylists', async () => {
    render(<StylistList />);
    
    await waitFor(() => {
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Professional hairstylist')).toBeInTheDocument();
  });
});
```

### Form Integration
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingForm } from '@/components/BookingForm';

describe('BookingForm Integration', () => {
  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.selectOption(screen.getByLabelText(/service/i), 'haircut');
    
    await user.click(screen.getByRole('button', { name: /book now/i }));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        service: 'haircut'
      });
    });
  });
  
  it('shows validation errors', async () => {
    const user = userEvent.setup();
    
    render(<BookingForm onSubmit={jest.fn()} />);
    
    await user.click(screen.getByRole('button', { name: /book now/i }));
    
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });
});
```

## 🎭 E2E Testing

### Playwright Setup
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Examples
```typescript
// e2e/booking-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test('complete booking process', async ({ page }) => {
    // Navigate to booking page
    await page.goto('/book');
    
    // Select service
    await page.click('[data-testid="service-haircut"]');
    
    // Select stylist
    await page.click('[data-testid="stylist-sarah-johnson"]');
    
    // Select date and time
    await page.click('[data-testid="date-picker"]');
    await page.click('[data-testid="date-2024-01-15"]');
    await page.click('[data-testid="time-10:00"]');
    
    // Fill contact information
    await page.fill('[data-testid="name-input"]', 'John Doe');
    await page.fill('[data-testid="email-input"]', 'john@example.com');
    await page.fill('[data-testid="phone-input"]', '+1234567890');
    
    // Submit booking
    await page.click('[data-testid="submit-booking"]');
    
    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('text=Booking confirmed')).toBeVisible();
  });
  
  test('handles booking errors', async ({ page }) => {
    await page.goto('/book');
    
    // Try to submit without filling required fields
    await page.click('[data-testid="submit-booking"]');
    
    // Verify validation errors
    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
  });
});
```

### Mobile E2E Testing
```typescript
// e2e/mobile-responsive.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness', () => {
  test('navigation works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check mobile menu
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
    
    // Open mobile menu
    await page.click('[data-testid="mobile-menu-button"]');
    
    // Verify menu items
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    await expect(page.locator('text=Book Appointment')).toBeVisible();
    await expect(page.locator('text=Shop')).toBeVisible();
  });
  
  test('forms are mobile-friendly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/book');
    
    // Check form inputs are properly sized
    const nameInput = page.locator('[data-testid="name-input"]');
    await expect(nameInput).toBeVisible();
    
    // Check touch targets are at least 44px
    const nameInputBox = await nameInput.boundingBox();
    expect(nameInputBox?.height).toBeGreaterThanOrEqual(44);
  });
});
```

## 🎯 Accessibility Testing

### A11y Testing
```typescript
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '@/components/ui/button';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('button has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('form has proper labels', () => {
    render(
      <form>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />
        <button type="submit">Submit</button>
      </form>
    );
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
  
  it('has proper heading hierarchy', () => {
    render(
      <div>
        <h1>Main Title</h1>
        <h2>Section Title</h2>
        <h3>Subsection Title</h3>
      </div>
    );
    
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(3);
  });
});
```

## 📊 Performance Testing

### Performance Tests
```typescript
import { render, screen } from '@testing-library/react';
import { measurePerformance } from '@testing-library/react-hooks';

describe('Performance Tests', () => {
  it('renders large list efficiently', async () => {
    const { result } = await measurePerformance(() => {
      return render(<StylistList stylists={largeStylistArray} />);
    });
    
    expect(result.current).toBeDefined();
    expect(result.current.renderTime).toBeLessThan(100); // 100ms
  });
  
  it('handles rapid state updates', async () => {
    const { result } = await measurePerformance(() => {
      const { rerender } = render(<Counter />);
      
      // Simulate rapid updates
      for (let i = 0; i < 100; i++) {
        rerender(<Counter count={i} />);
      }
    });
    
    expect(result.current).toBeDefined();
  });
});
```

## 🧪 Test Utilities

### Custom Render Function
```typescript
// test-utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Mock Data
```typescript
// mocks/data.ts
export const mockStylist = {
  id: '1',
  first_name: 'Sarah',
  last_name: 'Johnson',
  email: 'sarah@example.com',
  bio: 'Professional hairstylist with 5 years experience',
  rating: 4.8,
  review_count: 120,
  profile_image: '/images/sarah.jpg',
  services: ['haircut', 'coloring', 'styling'],
  availability: [
    { day: 'monday', start: '09:00', end: '17:00' },
    { day: 'tuesday', start: '09:00', end: '17:00' }
  ]
};

export const mockBooking = {
  id: '1',
  client: {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com'
  },
  stylist: mockStylist,
  service: {
    id: '1',
    title: 'Haircut',
    price: 50,
    duration_minutes: 60
  },
  date: '2024-01-15',
  start_time: '10:00',
  end_time: '11:00',
  status: 'confirmed'
};
```

## 📋 Testing Checklist

### Before Committing
- [ ] All unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Accessibility tests pass
- [ ] Performance tests pass
- [ ] Code coverage > 80%
- [ ] No console errors
- [ ] No TypeScript errors

### Test Coverage
- [ ] Components render correctly
- [ ] User interactions work
- [ ] API calls are handled
- [ ] Error states are shown
- [ ] Loading states are shown
- [ ] Form validation works
- [ ] Navigation works
- [ ] Responsive design works
- [ ] Accessibility requirements met
- [ ] Performance requirements met

### Continuous Integration
- [ ] Tests run on every commit
- [ ] Tests run on every PR
- [ ] Tests run on multiple browsers
- [ ] Tests run on multiple devices
- [ ] Coverage reports generated
- [ ] Test results reported
- [ ] Failed tests block deployment
