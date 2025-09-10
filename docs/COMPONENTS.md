# Component Library

## 🧩 Component Architecture

Strandly's component library follows **Atomic Design principles** with a focus on reusability, consistency, and maintainability.

## 📋 Naming Conventions

### Component Files
- **PascalCase**: `BookingCalendar.tsx`, `ProductCard.tsx`
- **Descriptive Names**: Clear purpose from the name
- **Consistent Suffixes**: `.tsx` for React components

### Component Props
- **camelCase**: `onClick`, `isLoading`, `variant`
- **Boolean Prefixes**: `is`, `has`, `can`, `should`
- **Event Handlers**: `on` + action (e.g., `onClick`, `onSubmit`)

## 🎨 Component Categories

### Atoms (Basic Building Blocks)

#### Button
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  className = '',
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  );
};
```

#### Input
```tsx
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'search';
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  placeholder,
  error,
  required = false,
  disabled = false,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`form-input ${error ? 'error' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? 'error-message' : undefined}
      />
      {error && (
        <div id="error-message" className="error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};
```

#### Badge
```tsx
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className = '',
}) => {
  return (
    <span className={`badge badge-${variant} badge-${size} ${className}`}>
      {children}
    </span>
  );
};
```

### Molecules (Component Combinations)

#### Card
```tsx
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
}) => {
  return (
    <div className={`card card-${variant} card-${padding} ${hover ? 'card-hover' : ''} ${className}`}>
      {children}
    </div>
  );
};
```

#### FormField
```tsx
interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  children: React.ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required = false,
  helpText,
  children,
  className = '',
}) => {
  return (
    <div className={`form-field ${className}`}>
      <label className="form-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      {children}
      {helpText && !error && (
        <p className="form-help-text">{helpText}</p>
      )}
      {error && (
        <p className="form-error-text" role="alert">{error}</p>
      )}
    </div>
  );
};
```

#### SearchBar
```tsx
interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  loading?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  onSearch,
  onClear,
  loading = false,
  className = '',
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <form onSubmit={handleSubmit} className={`search-bar ${className}`}>
      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="search-clear"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {loading && <Spinner size="sm" className="search-spinner" />}
      </div>
    </form>
  );
};
```

### Organisms (Complex Components)

#### BookingCalendar
```tsx
interface BookingCalendarProps {
  stylistId: string;
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  availableSlots: TimeSlot[];
  className?: string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  stylistId,
  selectedDate,
  onDateSelect,
  onTimeSelect,
  availableSlots,
  className = '',
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDateClick = (date: Date) => {
    onDateSelect(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    onTimeSelect(time);
  };

  return (
    <div className={`booking-calendar ${className}`}>
      <div className="calendar-header">
        <button onClick={() => setCurrentMonth(prev => subMonths(prev, 1))}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="calendar-month">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="calendar-grid">
        {getDaysInMonth(currentMonth).map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => handleDateClick(day)}
            className={`calendar-day ${
              isSameDay(day, selectedDate) ? 'selected' : ''
            }`}
            disabled={isBefore(day, new Date())}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="time-slots">
          <h4 className="time-slots-title">Available Times</h4>
          <div className="time-slots-grid">
            {availableSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => handleTimeClick(slot.time)}
                className={`time-slot ${
                  selectedTime === slot.time ? 'selected' : ''
                }`}
                disabled={!slot.available}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

#### ProductCard
```tsx
interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  className = '',
}) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Card hover className={`product-card ${className}`}>
      <div className="product-image-container">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="product-image"
          onLoad={() => setImageLoading(false)}
        />
        {imageLoading && <Skeleton className="product-image-skeleton" />}
        <div className="product-badge">
          {product.isNew && <Badge variant="success">New</Badge>}
          {product.discount && (
            <Badge variant="error">-{product.discount}%</Badge>
          )}
        </div>
      </div>
      
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-rating">
          <StarRating rating={product.rating} />
          <span className="rating-count">({product.reviewCount})</span>
        </div>
        
        <div className="product-price">
          {product.discount ? (
            <div className="price-container">
              <span className="price-current">
                €{product.price - (product.price * product.discount / 100)}
              </span>
              <span className="price-original">€{product.price}</span>
            </div>
          ) : (
            <span className="price-current">€{product.price}</span>
          )}
        </div>
        
        <div className="product-actions">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(product)}
          >
            View Details
          </Button>
          <Button
            size="sm"
            onClick={() => onAddToCart?.(product)}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
```

#### StylistCard
```tsx
interface StylistCardProps {
  stylist: Stylist;
  onBook?: (stylist: Stylist) => void;
  onViewProfile?: (stylist: Stylist) => void;
  className?: string;
}

const StylistCard: React.FC<StylistCardProps> = ({
  stylist,
  onBook,
  onViewProfile,
  className = '',
}) => {
  return (
    <Card hover className={`stylist-card ${className}`}>
      <div className="stylist-image-container">
        <Image
          src={stylist.avatar}
          alt={stylist.name}
          width={200}
          height={200}
          className="stylist-avatar"
        />
        <div className="stylist-status">
          <Badge
            variant={stylist.isAvailable ? 'success' : 'warning'}
          >
            {stylist.isAvailable ? 'Available' : 'Busy'}
          </Badge>
        </div>
      </div>
      
      <div className="stylist-content">
        <h3 className="stylist-name">{stylist.name}</h3>
        <p className="stylist-location">
          <MapPin className="w-4 h-4" />
          {stylist.location}
        </p>
        
        <div className="stylist-rating">
          <StarRating rating={stylist.rating} />
          <span className="rating-text">
            {stylist.rating} ({stylist.reviewCount} reviews)
          </span>
        </div>
        
        <div className="stylist-specialties">
          {stylist.specialties.map((specialty) => (
            <Badge key={specialty} variant="outline" size="sm">
              {specialty}
            </Badge>
          ))}
        </div>
        
        <div className="stylist-price">
          Starting from €{stylist.startingPrice}
        </div>
        
        <div className="stylist-actions">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewProfile?.(stylist)}
          >
            View Profile
          </Button>
          <Button
            size="sm"
            onClick={() => onBook?.(stylist)}
            disabled={!stylist.isAvailable}
          >
            {stylist.isAvailable ? 'Book Now' : 'Not Available'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
```

## 🎨 Component Styling

### CSS Classes Structure
```css
/* Component Base Classes */
.btn {
  @apply inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2;
  @apply disabled:pointer-events-none disabled:opacity-50;
}

.btn-primary {
  @apply bg-cocoa-primary text-white hover:bg-cocoa-light;
}

.btn-secondary {
  @apply bg-transparent text-cocoa-primary border border-cocoa-primary hover:bg-cocoa-primary hover:text-white;
}

/* Size Variants */
.btn-sm {
  @apply h-8 px-3 text-xs;
}

.btn-md {
  @apply h-10 px-4 py-2;
}

.btn-lg {
  @apply h-12 px-6 text-base;
}
```

### Responsive Design
```css
/* Mobile-First Responsive Components */
.product-grid {
  @apply grid grid-cols-1 gap-4;
}

@media (min-width: 640px) {
  .product-grid {
    @apply grid-cols-2;
  }
}

@media (min-width: 1024px) {
  .product-grid {
    @apply grid-cols-3;
  }
}
```

## 🔧 Component Props Patterns

### Common Props Interface
```tsx
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

interface InteractiveProps extends BaseComponentProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

interface FormProps extends BaseComponentProps {
  error?: string;
  required?: boolean;
  helpText?: string;
}
```

### Event Handler Patterns
```tsx
// Consistent event handler naming
interface EventHandlers {
  onClick?: () => void;
  onSubmit?: (data: FormData) => void;
  onChange?: (value: string) => void;
  onSelect?: (item: Item) => void;
  onToggle?: (isOpen: boolean) => void;
}
```

## 🧪 Component Testing

### Testing Utilities
```tsx
// Test utilities for components
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/contexts/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

// Custom matchers for component testing
expect.extend({
  toBeInTheDocument: (element) => ({
    pass: element !== null,
    message: () => 'Expected element to be in the document'
  })
});
```

### Component Test Examples
```tsx
// Button component test
describe('Button', () => {
  it('renders with correct text', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## 📚 Component Documentation

### Storybook Integration
```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
};
```

## 🚀 Component Performance

### Optimization Techniques
```tsx
// Memoization for expensive components
const ExpensiveComponent = memo(({ data }: { data: ComplexData }) => {
  const processedData = useMemo(() => {
    return processComplexData(data);
  }, [data]);

  return <div>{/* Render processed data */}</div>;
});

// Lazy loading for heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Virtual scrolling for large lists
const VirtualizedList = ({ items }: { items: Item[] }) => {
  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={80}
      itemData={items}
    >
      {ItemRenderer}
    </FixedSizeList>
  );
};
```

---

This component library ensures consistency, reusability, and maintainability across the entire Strandly application.
