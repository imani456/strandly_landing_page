# State Management

## 🔄 State Management Strategy

### State Types
1. **Server State** - Data from APIs (React Query)
2. **Client State** - UI state, user preferences (React Context)
3. **Form State** - Form inputs and validation (React Hook Form)
4. **Cache State** - Optimized data storage (React Query)

### State Management Tools
- **React Query** - Server state management
- **React Context** - Global client state
- **React Hook Form** - Form state management
- **Zustand** - Lightweight state management (optional)

## 🗄️ Server State (React Query)

### Query Client Setup
```typescript
// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
});
```

### Custom Hooks for Data Fetching
```typescript
// hooks/useStylists.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { directusFetch } from '@/lib/directus';

export const useStylists = (filters?: StylistFilters) => {
  return useQuery({
    queryKey: ['stylists', filters],
    queryFn: async () => {
      const response = await directusFetch('/items/stylists', {
        params: filters
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export const useStylist = (id: string) => {
  return useQuery({
    queryKey: ['stylists', id],
    queryFn: async () => {
      const response = await directusFetch(`/items/stylists/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCreateStylist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (stylistData: CreateStylistData) => {
      const response = await directusFetch('/items/stylists', {
        method: 'POST',
        body: JSON.stringify(stylistData)
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stylists'] });
    },
  });
};
```

### Optimistic Updates
```typescript
// hooks/useBookings.ts
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingData: CreateBookingData) => {
      const response = await directusFetch('/items/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData)
      });
      return response.data;
    },
    onMutate: async (newBooking) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['bookings'] });
      
      // Snapshot previous value
      const previousBookings = queryClient.getQueryData(['bookings']);
      
      // Optimistically update
      queryClient.setQueryData(['bookings'], (old: any) => [
        ...(old || []),
        { ...newBooking, id: 'temp-' + Date.now(), status: 'pending' }
      ]);
      
      return { previousBookings };
    },
    onError: (err, newBooking, context) => {
      // Rollback on error
      queryClient.setQueryData(['bookings'], context?.previousBookings);
    },
    onSettled: () => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};
```

### Cache Management
```typescript
// hooks/useCache.ts
export const useCacheManagement = () => {
  const queryClient = useQueryClient();
  
  const clearCache = () => {
    queryClient.clear();
  };
  
  const invalidateQueries = (queryKey: string[]) => {
    queryClient.invalidateQueries({ queryKey });
  };
  
  const prefetchQuery = (queryKey: string[], queryFn: () => Promise<any>) => {
    queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: 5 * 60 * 1000,
    });
  };
  
  return {
    clearCache,
    invalidateQueries,
    prefetchQuery,
  };
};
```

## 🎯 Client State (React Context)

### Auth Context
```typescript
// contexts/AuthContext.tsx
import { createContext, useContext, useReducer, ReactNode } from 'react';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, loading: false, error: null };
    case 'LOGIN_ERROR':
      return { ...state, user: null, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, loading: false, error: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: false,
    error: null,
  });
  
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Theme Context
```typescript
// contexts/ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('system');
  
  const resolvedTheme = theme === 'system' 
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

### UI Context
```typescript
// contexts/UIContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface UIState {
  sidebarOpen: boolean;
  modalOpen: boolean;
  modalContent: ReactNode | null;
  notifications: Notification[];
}

interface UIContextType {
  state: UIState;
  setSidebarOpen: (open: boolean) => void;
  setModalOpen: (open: boolean) => void;
  setModalContent: (content: ReactNode | null) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

const UIContext = createContext<UIContextType | null>(null);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<UIState>({
    sidebarOpen: false,
    modalOpen: false,
    modalContent: null,
    notifications: [],
  });
  
  const setSidebarOpen = (open: boolean) => {
    setState(prev => ({ ...prev, sidebarOpen: open }));
  };
  
  const setModalOpen = (open: boolean) => {
    setState(prev => ({ ...prev, modalOpen: open }));
  };
  
  const setModalContent = (content: ReactNode | null) => {
    setState(prev => ({ ...prev, modalContent: content }));
  };
  
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    setState(prev => ({
      ...prev,
      notifications: [...prev.notifications, { ...notification, id }]
    }));
  };
  
  const removeNotification = (id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== id)
    }));
  };
  
  return (
    <UIContext.Provider value={{
      state,
      setSidebarOpen,
      setModalOpen,
      setModalContent,
      addNotification,
      removeNotification,
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
```

## 📝 Form State (React Hook Form)

### Form Setup
```typescript
// hooks/useBookingForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const bookingSchema = z.object({
  stylistId: z.string().min(1, 'Please select a stylist'),
  serviceId: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  clientName: z.string().min(2, 'Name must be at least 2 characters'),
  clientEmail: z.string().email('Please enter a valid email'),
  clientPhone: z.string().min(10, 'Please enter a valid phone number'),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export const useBookingForm = () => {
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      stylistId: '',
      serviceId: '',
      date: '',
      time: '',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      notes: '',
    },
  });
  
  return form;
};
```

### Form Validation
```typescript
// utils/validation.ts
import { z } from 'zod';

export const emailSchema = z.string().email('Please enter a valid email address');
export const phoneSchema = z.string().regex(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number');
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/\d/, 'Password must contain at least one number');

export const validateForm = (schema: z.ZodSchema, data: any) => {
  try {
    schema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, err) => {
        const path = err.path.join('.');
        acc[path] = err.message;
        return acc;
      }, {} as Record<string, string>);
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};
```

## 🔄 State Synchronization

### Real-time Updates
```typescript
// hooks/useRealtimeUpdates.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';

export const useRealtimeUpdates = () => {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_URL || 'ws://localhost:3001');
    
    socket.on('booking_created', (booking) => {
      queryClient.setQueryData(['bookings'], (old: any) => [
        ...(old || []),
        booking
      ]);
    });
    
    socket.on('booking_updated', (booking) => {
      queryClient.setQueryData(['bookings'], (old: any) =>
        (old || []).map((b: any) => b.id === booking.id ? booking : b)
      );
    });
    
    socket.on('booking_deleted', (bookingId) => {
      queryClient.setQueryData(['bookings'], (old: any) =>
        (old || []).filter((b: any) => b.id !== bookingId)
      );
    });
    
    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
};
```

### State Persistence
```typescript
// hooks/usePersistedState.ts
import { useState, useEffect } from 'react';

export const usePersistedState = <T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });
  
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Handle localStorage quota exceeded
    }
  }, [key, state]);
  
  return [state, setState];
};
```

## 🧪 State Testing

### Context Testing
```typescript
// __tests__/AuthContext.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const TestComponent = () => {
  const { state, dispatch } = useAuth();
  
  return (
    <div>
      <div data-testid="user">{state.user?.name || 'No user'}</div>
      <div data-testid="loading">{state.loading ? 'Loading' : 'Not loading'}</div>
      <button onClick={() => dispatch({ type: 'LOGIN_START' })}>
        Start Login
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  it('provides initial state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId('user')).toHaveTextContent('No user');
    expect(screen.getByTestId('loading')).toHaveTextContent('Not loading');
  });
  
  it('handles login start action', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    fireEvent.click(screen.getByText('Start Login'));
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading');
  });
});
```

### Hook Testing
```typescript
// __tests__/useStylists.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStylists } from '@/hooks/useStylists';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useStylists', () => {
  it('fetches stylists successfully', async () => {
    const { result } = renderHook(() => useStylists(), {
      wrapper: createWrapper(),
    });
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    
    expect(result.current.data).toBeDefined();
  });
});
```

## 📋 State Management Checklist

### Before Implementing
- [ ] Identify state type (server, client, form, cache)
- [ ] Choose appropriate tool (React Query, Context, Hook Form)
- [ ] Design state structure
- [ ] Plan state updates and synchronization
- [ ] Consider performance implications

### During Implementation
- [ ] Use TypeScript for type safety
- [ ] Implement proper error handling
- [ ] Add loading states
- [ ] Implement optimistic updates where appropriate
- [ ] Add proper cache management
- [ ] Test state changes

### After Implementation
- [ ] Test all state scenarios
- [ ] Verify performance
- [ ] Check memory leaks
- [ ] Validate state persistence
- [ ] Test error recovery
- [ ] Document state structure
