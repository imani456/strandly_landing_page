# Content Model & API Integration

## 🗄️ Directus Content Models

### Core Entities

#### Stylists
```typescript
interface Stylist {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  bio: string;
  profile_image: string;
  portfolio_images: string[];
  services: Service[];
  availability: AvailabilitySlot[];
  verification_status: 'pending' | 'verified' | 'rejected';
  rating: number;
  review_count: number;
  location: {
    city: string;
    country: string;
    coordinates: [number, number];
  };
  languages: string[];
  experience_years: number;
  specialties: string[];
  created_at: string;
  updated_at: string;
}
```

#### Services
```typescript
interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  duration_minutes: number;
  category: ServiceCategory;
  stylist: Stylist;
  images: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}
```

#### Products
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  variants: ProductVariant[];
  category: ProductCategory;
  brand: string;
  in_stock: boolean;
  stock_quantity: number;
  sku: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  created_at: string;
  updated_at: string;
}

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  sku: string;
  in_stock: boolean;
  stock_quantity: number;
  attributes: Record<string, string>;
}
```

#### Bookings
```typescript
interface Booking {
  id: string;
  client: User;
  stylist: Stylist;
  service: Service;
  date: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  total_price: number;
  deposit_amount: number;
  notes: string;
  location: {
    type: 'stylist_location' | 'client_location' | 'salon';
    address: string;
    coordinates: [number, number];
  };
  created_at: string;
  updated_at: string;
}
```

#### Users (Clients)
```typescript
interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  profile_image: string;
  date_of_birth: string;
  hair_type: string;
  hair_length: string;
  hair_color: string;
  allergies: string[];
  preferences: UserPreferences;
  created_at: string;
  updated_at: string;
}

interface UserPreferences {
  preferred_stylists: string[];
  preferred_services: string[];
  notification_settings: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  language: string;
  timezone: string;
}
```

#### Blog Posts
```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  author: User;
  category: BlogCategory;
  tags: BlogTag[];
  status: 'draft' | 'published' | 'archived';
  published_at: string;
  meta_title: string;
  meta_description: string;
  og_image: string;
  created_at: string;
  updated_at: string;
}
```

### Multilingual Support

#### Translation Keys
```typescript
interface Translation {
  id: string;
  key: string;
  locale: string;
  value: string;
  namespace: string;
  created_at: string;
  updated_at: string;
}

// Example namespaces
const TRANSLATION_NAMESPACES = {
  COMMON: 'common',
  NAVIGATION: 'navigation',
  AUTH: 'auth',
  BOOKING: 'booking',
  SHOP: 'shop',
  PROFILE: 'profile',
  BLOG: 'blog',
  ERRORS: 'errors',
  SUCCESS: 'success'
} as const;
```

## 🔌 API Integration Patterns

### Custom Hooks

#### useStylists
```typescript
export const useStylists = (filters?: StylistFilters) => {
  return useQuery({
    queryKey: ['stylists', filters],
    queryFn: () => directusFetch('/items/stylists', { params: filters }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
```

#### useBookings
```typescript
export const useBookings = (userId?: string) => {
  return useQuery({
    queryKey: ['bookings', userId],
    queryFn: () => directusFetch(`/items/bookings?filter[client][_eq]=${userId}`),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
```

#### useProducts
```typescript
export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => directusFetch('/items/products', { 
      params: category ? { 'filter[category][_eq]': category } : {} 
    }),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
```

### Data Fetching Rules

1. **ALWAYS** use custom hooks for data fetching
2. **ALWAYS** implement proper error handling
3. **ALWAYS** use React Query for caching and synchronization
4. **ALWAYS** implement loading states
5. **ALWAYS** use optimistic updates for better UX

### API Endpoints

#### Stylists
- `GET /items/stylists` - List all stylists
- `GET /items/stylists/:id` - Get stylist details
- `POST /items/stylists` - Create stylist (admin only)
- `PATCH /items/stylists/:id` - Update stylist
- `DELETE /items/stylists/:id` - Delete stylist (admin only)

#### Services
- `GET /items/services` - List all services
- `GET /items/services/:id` - Get service details
- `GET /items/services?filter[stylist][_eq]=:stylistId` - Get stylist services

#### Bookings
- `GET /items/bookings` - List user bookings
- `POST /items/bookings` - Create booking
- `PATCH /items/bookings/:id` - Update booking
- `DELETE /items/bookings/:id` - Cancel booking

#### Products
- `GET /items/products` - List all products
- `GET /items/products/:id` - Get product details
- `GET /items/products?filter[category][_eq]=:categoryId` - Get products by category

## 🔄 Data Synchronization

### Real-time Updates
- Use Directus WebSocket for real-time updates
- Implement optimistic updates for better UX
- Use React Query's invalidation for cache updates

### Cache Management
- Set appropriate stale times for different data types
- Implement cache invalidation strategies
- Use background refetching for critical data

### Error Handling
- Implement retry logic for failed requests
- Show user-friendly error messages
- Log errors for debugging

## 📊 Analytics Integration

### Event Tracking
```typescript
// Track user interactions
const trackEvent = (event: string, properties: Record<string, any>) => {
  // Google Analytics, Mixpanel, etc.
  analytics.track(event, properties);
};

// Example usage
trackEvent('booking_created', {
  stylist_id: booking.stylist.id,
  service_id: booking.service.id,
  total_price: booking.total_price
});
```

### Performance Monitoring
- Track Core Web Vitals
- Monitor API response times
- Track user engagement metrics

## 🧪 Testing Data Models

### Mock Data
```typescript
export const mockStylist: Stylist = {
  id: '1',
  first_name: 'Sarah',
  last_name: 'Johnson',
  email: 'sarah@example.com',
  // ... other fields
};
```

### Test Utilities
```typescript
export const renderWithQuery = (component: React.ReactElement) => {
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
```

## 🔐 Security Considerations

### Data Validation
- Validate all input data on both client and server
- Use TypeScript interfaces for type safety
- Implement proper sanitization

### Access Control
- Implement role-based access control
- Protect sensitive data endpoints
- Use proper authentication tokens

### Privacy
- Implement GDPR compliance
- Handle user data securely
- Provide data export/deletion options
