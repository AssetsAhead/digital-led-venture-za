import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Hero Section Loading
export const HeroSectionSkeleton = () => (
  <section className="relative overflow-hidden pt-24 pb-12">
    <div className="container relative px-4 md:px-6">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        <div className="flex flex-col space-y-6 lg:w-3/5 text-center lg:text-left">
          <Skeleton className="h-6 w-48 mx-auto lg:mx-0" />
          <Skeleton className="h-16 w-full max-w-2xl mx-auto lg:mx-0" />
          <Skeleton className="h-20 w-full max-w-lg mx-auto lg:mx-0" />
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 w-40" />
          </div>
        </div>
        <div className="lg:w-2/5 flex justify-center">
          <div className="grid grid-cols-1 gap-6 max-w-sm">
            <Skeleton className="aspect-square rounded-lg" />
            <Skeleton className="aspect-square rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Gallery Section Loading
export const GallerySectionSkeleton = () => (
  <section className="py-16 relative">
    <div className="container px-4 md:px-6">
      <div className="text-center mb-12 space-y-4">
        <Skeleton className="h-6 w-24 mx-auto" />
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="overflow-hidden border-0 rounded-lg">
            <Skeleton className="w-full aspect-square" />
          </Card>
        ))}
      </div>
      
      <div className="mt-12">
        <Skeleton className="h-8 w-32 mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="overflow-hidden border-0 rounded-lg">
              <Skeleton className="w-full aspect-square" />
              <div className="p-4">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Pricing Section Loading
export const PricingSectionSkeleton = () => (
  <section className="py-16 relative">
    <div className="container px-4 md:px-6">
      <div className="text-center mb-12 space-y-4">
        <Skeleton className="h-6 w-32 mx-auto" />
        <Skeleton className="h-12 w-48 mx-auto" />
        <Skeleton className="h-6 w-80 mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {Array.from({ length: 2 }).map((_, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <Skeleton className="h-6 w-20 mb-4" />
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="space-y-2 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-full" />
                ))}
              </div>
              <div className="space-y-2 mb-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-5 w-28" />
              </div>
              <Skeleton className="h-11 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// Contact Section Loading
export const ContactSectionSkeleton = () => (
  <section className="py-16 relative">
    <div className="container px-4 md:px-6">
      <div className="text-center mb-12 space-y-4">
        <Skeleton className="h-6 w-32 mx-auto" />
        <Skeleton className="h-12 w-32 mx-auto" />
        <Skeleton className="h-6 w-64 mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-20 w-full" />
              </div>
              <Skeleton className="h-11 w-full" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-5 w-20 mb-1" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
              <div className="pt-4">
                <Skeleton className="h-5 w-20 mb-3" />
                <div className="flex gap-4 justify-center">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-10 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// Form Loading State
export const FormLoadingSkeleton = ({ fields = 5 }: { fields?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: fields }).map((_, index) => (
      <div key={index}>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    ))}
    <Skeleton className="h-11 w-full mt-6" />
  </div>
);

// Generic Loading Spinner
export const LoadingSpinner = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center justify-center", className)}>
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Page Loading Overlay
export const PageLoadingOverlay = ({ message = "Loading..." }: { message?: string }) => (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="text-center space-y-4">
      <LoadingSpinner className="h-12 w-12" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  </div>
);