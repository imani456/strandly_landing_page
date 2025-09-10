# Authentication & Authorization

## 🔐 Authentication System

### User Roles & Permissions

#### Client Role
```typescript
interface ClientPermissions {
  can_book: true;
  can_shop: true;
  can_review: true;
  can_cancel_booking: true;
  can_update_profile: true;
  can_view_own_bookings: true;
  can_view_own_orders: true;
  can_contact_support: true;
}
```

#### Stylist Role
```typescript
interface StylistPermissions {
  can_manage_services: true;
  can_view_bookings: true;
  can_update_availability: true;
  can_manage_portfolio: true;
  can_view_earnings: true;
  can_contact_clients: true;
  can_update_profile: true;
  can_view_own_bookings: true;
}
```

#### Admin Role
```typescript
interface AdminPermissions {
  can_manage_users: true;
  can_manage_stylists: true;
  can_manage_services: true;
  can_manage_products: true;
  can_manage_bookings: true;
  can_view_analytics: true;
  can_manage_content: true;
  can_manage_settings: true;
  can_moderate_reviews: true;
}
```

### Authentication Flow

#### Registration
```typescript
interface RegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  role: 'client' | 'stylist';
  terms_accepted: boolean;
  marketing_consent: boolean;
}

const registerUser = async (data: RegistrationData) => {
  const response = await directusFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  
  if (response.data) {
    // Send verification email
    await sendVerificationEmail(data.email);
  }
  
  return response;
};
```

#### Login
```typescript
interface LoginData {
  email: string;
  password: string;
  remember_me?: boolean;
}

const loginUser = async (data: LoginData) => {
  const response = await directusFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  
  if (response.data) {
    // Store tokens securely
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    
    // Update user context
    setUser(response.data.user);
  }
  
  return response;
};
```

#### Logout
```typescript
const logoutUser = async () => {
  try {
    await directusFetch('/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      }
    });
  } finally {
    // Clear local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    // Clear user context
    setUser(null);
  }
};
```

### Token Management

#### Access Token
```typescript
interface AccessToken {
  token: string;
  expires_at: string;
  user: User;
  permissions: string[];
}

const getAccessToken = (): string | null => {
  return localStorage.getItem('access_token');
};

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};
```

#### Refresh Token
```typescript
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refresh_token');
  
  if (!refreshToken) return null;
  
  try {
    const response = await directusFetch('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken })
    });
    
    if (response.data) {
      localStorage.setItem('access_token', response.data.access_token);
      return response.data.access_token;
    }
  } catch (error) {
    // Refresh failed, redirect to login
    logoutUser();
  }
  
  return null;
};
```

### Route Protection

#### Protected Route Component
```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'client' | 'stylist' | 'admin';
  requiredPermissions?: string[];
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requiredPermissions = [],
  fallback = <LoginPage />
}) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <>{fallback}</>;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <UnauthorizedPage />;
  }
  
  if (requiredPermissions.length > 0) {
    const hasPermission = requiredPermissions.every(
      permission => user.permissions.includes(permission)
    );
    
    if (!hasPermission) {
      return <UnauthorizedPage />;
    }
  }
  
  return <>{children}</>;
};
```

#### Route Configuration
```typescript
const routes = [
  {
    path: '/',
    element: <HomePage />,
    public: true
  },
  {
    path: '/book',
    element: (
      <ProtectedRoute requiredRole="client">
        <BookingPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/stylist/dashboard',
    element: (
      <ProtectedRoute requiredRole="stylist">
        <StylistDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    )
  }
];
```

### User Context

#### Auth Context
```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegistrationData) => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

#### Auth Provider
```typescript
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      
      if (token && !isTokenExpired(token)) {
        try {
          const userData = await fetchUserData(token);
          setUser(userData);
        } catch (error) {
          // Token invalid, clear storage
          localStorage.clear();
        }
      }
      
      setLoading(false);
    };
    
    initAuth();
  }, []);
  
  const login = async (data: LoginData) => {
    setLoading(true);
    try {
      await loginUser(data);
      const userData = await fetchUserData(getAccessToken()!);
      setUser(userData);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
    } finally {
      setLoading(false);
    }
  };
  
  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) ?? false;
  };
  
  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      register: registerUser,
      hasPermission,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Password Security

#### Password Requirements
```typescript
const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  forbiddenPatterns: [
    /password/i,
    /123456/i,
    /qwerty/i
  ]
};

const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  
  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (PASSWORD_REQUIREMENTS.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (PASSWORD_REQUIREMENTS.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  for (const pattern of PASSWORD_REQUIREMENTS.forbiddenPatterns) {
    if (pattern.test(password)) {
      errors.push('Password contains forbidden patterns');
      break;
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

### Two-Factor Authentication

#### 2FA Setup
```typescript
const setup2FA = async (): Promise<{ qrCode: string; secret: string }> => {
  const response = await directusFetch('/auth/2fa/setup', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`
    }
  });
  
  return response.data;
};

const verify2FA = async (code: string): Promise<boolean> => {
  const response = await directusFetch('/auth/2fa/verify', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`
    },
    body: JSON.stringify({ code })
  });
  
  return response.data.verified;
};
```

### Social Authentication

#### Google OAuth
```typescript
const loginWithGoogle = async () => {
  const response = await directusFetch('/auth/oauth/google', {
    method: 'POST',
    body: JSON.stringify({
      redirect_uri: window.location.origin + '/auth/callback'
    })
  });
  
  // Redirect to Google OAuth
  window.location.href = response.data.auth_url;
};
```

#### Facebook OAuth
```typescript
const loginWithFacebook = async () => {
  const response = await directusFetch('/auth/oauth/facebook', {
    method: 'POST',
    body: JSON.stringify({
      redirect_uri: window.location.origin + '/auth/callback'
    })
  });
  
  // Redirect to Facebook OAuth
  window.location.href = response.data.auth_url;
};
```

### Session Management

#### Auto-logout
```typescript
const useAutoLogout = (timeoutMinutes: number = 30) => {
  const { logout } = useAuth();
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  useEffect(() => {
    const handleActivity = () => setLastActivity(Date.now());
    
    document.addEventListener('mousedown', handleActivity);
    document.addEventListener('keypress', handleActivity);
    document.addEventListener('scroll', handleActivity);
    
    return () => {
      document.removeEventListener('mousedown', handleActivity);
      document.removeEventListener('keypress', handleActivity);
      document.removeEventListener('scroll', handleActivity);
    };
  }, []);
  
  useEffect(() => {
    const checkTimeout = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;
      const timeoutMs = timeoutMinutes * 60 * 1000;
      
      if (timeSinceLastActivity > timeoutMs) {
        logout();
      }
    };
    
    const interval = setInterval(checkTimeout, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [lastActivity, logout, timeoutMinutes]);
};
```

### Security Best Practices

1. **ALWAYS** use HTTPS in production
2. **ALWAYS** validate input on both client and server
3. **ALWAYS** use secure token storage
4. **ALWAYS** implement rate limiting
5. **ALWAYS** log security events
6. **ALWAYS** use CSRF protection
7. **ALWAYS** implement proper session management
8. **ALWAYS** use strong password requirements
9. **ALWAYS** implement account lockout after failed attempts
10. **ALWAYS** use secure headers
