import React, { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  skeletonClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  skeletonClassName,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before the image enters viewport
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, isInView]);

  // Generate WebP source URLs
  const generateSources = (originalSrc: string) => {
    // Convert to WebP if supported
    const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return {
      webp: webpSrc,
      original: originalSrc,
    };
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const sources = generateSources(src);

  return (
    <div ref={imgRef} className="relative overflow-hidden">
      {/* Skeleton loader */}
      {!isLoaded && !hasError && (
        <Skeleton
          className={cn(
            "absolute inset-0 w-full h-full",
            skeletonClassName
          )}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined,
          }}
        />
      )}

      {/* Image */}
      {(isInView || priority) && (
        <picture>
          <source srcSet={sources.webp} type="image/webp" />
          <img
            src={sources.original}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className={cn(
              "transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
              hasError && "hidden",
              className
            )}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        </picture>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          className
        )}>
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};