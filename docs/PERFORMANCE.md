# Performance Optimization

## 🚀 Performance Strategy

### Core Web Vitals
- **LCP** (Largest Contentful Paint) < 2.5s
- **FID** (First Input Delay) < 100ms
- **CLS** (Cumulative Layout Shift) < 0.1

### Performance Tools
- **Lighthouse** - Performance auditing
- **Web Vitals** - Real-time metrics
- **React DevTools** - Component profiling
- **Bundle Analyzer** - Bundle size analysis

## 📦 Bundle Optimization

### Code Splitting
```typescript
// Lazy load components
const BookingPage = lazy(() => import('@/pages/BookingPage'));
const StylistDashboard = lazy(() => import('@/pages/StylistDashboard'));

// Route-based splitting
const AppRoutes = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/book" element={<BookingPage />} />
      <Route path="/stylist" element={<StylistDashboard />} />
    </Routes>
  </Suspense>
);
```

### Tree Shaking
```typescript
// Import only what you need
import { Button } from '@/components/ui/button';
import { debounce } from 'lodash/debounce';

// Avoid importing entire libraries
// ❌ Bad
import _ from 'lodash';

// ✅ Good
import { debounce } from 'lodash/debounce';
```

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx webpack-bundle-analyzer dist/assets/*.js
```

## 🖼️ Image Optimization

### Responsive Images
```typescript
// Use Next.js Image component
import Image from 'next/image';

const StylistCard = ({ stylist }) => (
  <div>
    <Image
      src={stylist.profile_image}
      alt={stylist.name}
      width={300}
      height={300}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={false}
      loading="lazy"
    />
  </div>
);
```

### Image Formats
```typescript
// Use modern formats
const ImageComponent = ({ src, alt }) => (
  <picture>
    <source srcSet={`${src}.webp`} type="image/webp" />
    <source srcSet={`${src}.avif`} type="image/avif" />
    <img src={`${src}.jpg`} alt={alt} loading="lazy" />
  </picture>
);
```

## ⚡ React Performance

### Memoization
```typescript
// Memoize expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: expensiveCalculation(item)
    }));
  }, [data]);
  
  return <div>{/* Render processed data */}</div>;
});

// Memoize callbacks
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  return <ChildComponent onClick={handleClick} />;
};
```

### Virtual Scrolling
```typescript
// For large lists
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => (
  <List
    height={600}
    itemCount={items.length}
    itemSize={100}
    itemData={items}
  >
    {({ index, style, data }) => (
      <div style={style}>
        <ItemComponent item={data[index]} />
      </div>
    )}
  </List>
);
```

## 🔄 Data Fetching Optimization

### React Query Configuration
```typescript
// Optimize query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});
```

### Prefetching
```typescript
// Prefetch data
const usePrefetchStylists = () => {
  const queryClient = useQueryClient();
  
  const prefetchStylists = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: ['stylists'],
      queryFn: fetchStylists,
      staleTime: 5 * 60 * 1000,
    });
  }, [queryClient]);
  
  return prefetchStylists;
};
```

## 🎨 CSS Performance

### Critical CSS
```css
/* Inline critical CSS */
<style>
  .hero { background: #e7cfb1; }
  .button { padding: 12px 24px; }
</style>
```

### CSS Optimization
```css
/* Use efficient selectors */
.button { /* ✅ Good */ }
div > .button { /* ❌ Avoid */ }

/* Use transform instead of changing layout */
.animate {
  transform: translateX(100px); /* ✅ Good */
  /* left: 100px; ❌ Avoid */
}
```

## 📱 Mobile Performance

### Touch Optimization
```typescript
// Optimize touch events
const TouchOptimizedButton = () => {
  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    // Handle touch
  }, []);
  
  return (
    <button
      onTouchStart={handleTouchStart}
      style={{ touchAction: 'manipulation' }}
    >
      Touch me
    </button>
  );
};
```

### Viewport Optimization
```html
<!-- Optimize viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

## 🔍 Performance Monitoring

### Web Vitals
```typescript
// Monitor Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric) => {
  // Send to analytics
  console.log(metric);
};

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Performance Budget
```typescript
// Set performance budget
const PERFORMANCE_BUDGET = {
  bundleSize: 500 * 1024, // 500KB
  imageSize: 200 * 1024, // 200KB
  loadTime: 3000, // 3 seconds
  lcp: 2500, // 2.5 seconds
  fid: 100, // 100ms
  cls: 0.1, // 0.1
};
```

## 🧪 Performance Testing

### Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push, pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse CI
        run: |
          npm install
          npm run build
          npx lhci autorun
```

### Performance Tests
```typescript
// Performance test
describe('Performance Tests', () => {
  it('loads page within 3 seconds', async () => {
    const start = performance.now();
    await page.goto('/');
    const end = performance.now();
    
    expect(end - start).toBeLessThan(3000);
  });
});
```

## 📋 Performance Checklist

### Before Deployment
- [ ] Bundle size < 500KB
- [ ] Images optimized
- [ ] Code split implemented
- [ ] Lazy loading enabled
- [ ] Critical CSS inlined
- [ ] Unused code removed
- [ ] Gzip compression enabled
- [ ] CDN configured
- [ ] Caching headers set
- [ ] Performance budget met

### Monitoring
- [ ] Web Vitals tracked
- [ ] Performance alerts set
- [ ] Bundle size monitored
- [ ] Load time tracked
- [ ] User experience measured
- [ ] Performance regressions detected
- [ ] Mobile performance tested
- [ ] Network conditions tested
