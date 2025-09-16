import React, { useEffect } from 'react';

interface TrackingPixelProps {
  provider: 'facebook' | 'google' | 'linkedin' | 'twitter' | 'custom';
  pixelId?: string;
  customUrl?: string;
  event?: string;
  data?: Record<string, any>;
}

export const TrackingPixel: React.FC<TrackingPixelProps> = ({
  provider,
  pixelId,
  customUrl,
  event = 'PageView',
  data = {},
}) => {
  useEffect(() => {
    const loadPixel = () => {
      try {
        switch (provider) {
          case 'facebook':
            if (pixelId && typeof window !== 'undefined') {
              // Facebook Pixel
              (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
                if (f.fbq) return;
                n = f.fbq = function() {
                  n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = true;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e);
                t.async = true;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode?.insertBefore(t, s);
              })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
              
              (window as any).fbq('init', pixelId);
              (window as any).fbq('track', event, data);
            }
            break;

          case 'google':
            if (pixelId && typeof window !== 'undefined') {
              // Google Analytics 4
              const script = document.createElement('script');
              script.async = true;
              script.src = `https://www.googletagmanager.com/gtag/js?id=${pixelId}`;
              document.head.appendChild(script);

              (window as any).dataLayer = (window as any).dataLayer || [];
              function gtag(...args: any[]) {
                (window as any).dataLayer.push(args);
              }
              gtag('js', new Date());
              gtag('config', pixelId);
              gtag('event', event.toLowerCase(), data);
            }
            break;

          case 'linkedin':
            if (pixelId && typeof window !== 'undefined') {
              // LinkedIn Insight Tag
              (window as any)._linkedin_data_partner_ids = (window as any)._linkedin_data_partner_ids || [];
              (window as any)._linkedin_data_partner_ids.push(pixelId);

              const script = document.createElement('script');
              script.type = 'text/javascript';
              script.async = true;
              script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
              document.head.appendChild(script);
            }
            break;

          case 'twitter':
            if (pixelId && typeof window !== 'undefined') {
              // Twitter Universal Website Tag
              const script = document.createElement('script');
              script.async = true;
              script.src = 'https://static.ads-twitter.com/uwt.js';
              document.head.appendChild(script);

              script.onload = () => {
                (window as any).twq('init', pixelId);
                (window as any).twq('track', event, data);
              };
            }
            break;

          case 'custom':
            if (customUrl && typeof window !== 'undefined') {
              // Custom pixel - simple image pixel
              const img = new Image();
              const params = new URLSearchParams({
                event,
                ...data,
                timestamp: Date.now().toString(),
                url: window.location.href,
                referrer: document.referrer,
              });
              img.src = `${customUrl}?${params.toString()}`;
            }
            break;

          default:
            console.warn(`Unknown tracking provider: ${provider}`);
        }
      } catch (error) {
        console.error(`Error loading ${provider} tracking pixel:`, error);
      }
    };

    // Load pixel on next tick to avoid blocking initial render
    const timer = setTimeout(loadPixel, 100);
    return () => clearTimeout(timer);
  }, [provider, pixelId, customUrl, event, data]);

  // No visible render
  return null;
};

// Hook for easy tracking events
export const useTracking = () => {
  const track = (
    provider: TrackingPixelProps['provider'],
    event: string,
    data: Record<string, any> = {}
  ) => {
    try {
      switch (provider) {
        case 'facebook':
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', event, data);
          }
          break;
        case 'google':
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', event.toLowerCase(), data);
          }
          break;
        default:
          console.log(`Tracking event: ${event}`, data);
      }
    } catch (error) {
      console.error(`Error tracking ${event}:`, error);
    }
  };

  return { track };
};