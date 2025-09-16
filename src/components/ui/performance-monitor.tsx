import { useEffect } from 'react';

interface PerformanceMonitorProps {
  reportWebVitals?: (metric: any) => void;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ reportWebVitals }) => {
  useEffect(() => {
    // Basic performance monitoring without web-vitals dependency
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor basic performance metrics
      const handleMetric = (name: string, value: number) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`${name}: ${value}`);
        }
        reportWebVitals?.({ name, value, id: Date.now().toString(), delta: value });
      };

      // Measure basic metrics
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          handleMetric('DOM Content Loaded', navigation.domContentLoadedEventEnd - navigation.navigationStart);
          handleMetric('Load Complete', navigation.loadEventEnd - navigation.navigationStart);
        }
      }, 1000);
    }
  }, [reportWebVitals]);

  // Monitor resource loading
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Monitor largest contentful paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry && process.env.NODE_ENV === 'development') {
          console.log('LCP:', lastEntry.startTime);
        }
      });

      // Monitor first input delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
        });
      });

      // Monitor layout shifts
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.hadRecentInput) return;
          if (process.env.NODE_ENV === 'development') {
            console.log('CLS shift:', entry.value);
          }
        });
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        fidObserver.observe({ entryTypes: ['first-input'] });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.log('Performance observers not fully supported');
      }

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  return null; // This component doesn't render anything
};

// Hook for manual performance tracking
export const usePerformanceTracking = () => {
  const trackEvent = (eventName: string, duration?: number, metadata?: Record<string, any>) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const now = performance.now();
      
      // Mark the event
      performance.mark(`${eventName}-start`);
      
      if (duration) {
        performance.mark(`${eventName}-end`);
        performance.measure(eventName, `${eventName}-start`, `${eventName}-end`);
      }
      
      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Performance: ${eventName}`, { duration, metadata, timestamp: now });
      }
      
      // Send to analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'custom_performance', {
          event_name: eventName,
          duration: duration || 0,
          ...metadata,
        });
      }
    }
  };

  return { trackEvent };
};

// Preload critical resources
export const preloadCriticalResources = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Preload critical images
      const criticalImages = [
        '/lovable-uploads/72778d36-88d3-4ab2-afb7-5c07ddc172c4.png',
        '/lovable-uploads/dc7e2e62-8fd6-4359-ab6a-3f9f613ad2af.png',
        '/lovable-uploads/f8becb11-4814-46d3-93eb-bd1fc1ad6501.png',
      ];

      criticalImages.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });

      // Preload critical fonts (already done in HTML, but as fallback)
      const fontPreloads = [
        'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZs.woff2',
        'https://fonts.gstatic.com/s/orbitron/v24/yMJEMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWgKVjA.woff2',
      ];

      fontPreloads.forEach((href) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = href;
        document.head.appendChild(link);
      });
    }
  }, []);
};