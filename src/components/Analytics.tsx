import React from 'react';
import { TrackingPixel } from '@/components/ui/tracking-pixel';
import { ProductStructuredData, OrganizationStructuredData, WebPageStructuredData } from '@/components/seo/structured-data';

const Analytics = () => {
  return (
    <>
      {/* Add your tracking pixels here */}
      {/* Example: Facebook Pixel */}
      {/* <TrackingPixel provider="facebook" pixelId="YOUR_FACEBOOK_PIXEL_ID" /> */}
      
      {/* Example: Google Analytics */}
      {/* <TrackingPixel provider="google" pixelId="YOUR_GA_TRACKING_ID" /> */}
      
      {/* Example: Custom tracking pixel */}
      {/* <TrackingPixel provider="custom" customUrl="https://your-analytics-endpoint.com/track" /> */}

      {/* Structured Data for SEO */}
      <ProductStructuredData
        name="Programmable LED Backpack"
        description="South Africa's premier programmable LED backpack with customizable display, smartphone app control, waterproof construction, and Bluetooth connectivity."
        price="2520"
        currency="ZAR"
        availability="InStock"
        brand="AssetsAhead"
        category="Electronics > Bags & Cases > Backpacks"
        image="/lovable-uploads/f8becb11-4814-46d3-93eb-bd1fc1ad6501.png"
        sku="LED-BACKPACK-SA-001"
        condition="NewCondition"
        aggregateRating={{
          ratingValue: 4.8,
          reviewCount: 127
        }}
        offers={[
          {
            price: "2520",
            currency: "ZAR",
            availability: "https://schema.org/InStock"
          },
          {
            price: "139",
            currency: "USD",
            availability: "https://schema.org/InStock"
          }
        ]}
      />

      <OrganizationStructuredData
        name="AssetsAhead"
        url="https://assetsahead.com"
        logo="/favicon.ico"
        description="South Africa's premier provider of programmable LED backpacks and innovative tech solutions for businesses and individuals."
        contactInfo={{
          telephone: "+27 67 874 6540",
          email: "assetsahead.sa@gmail.com"
        }}
        socialMediaUrls={[
          "https://www.facebook.com/assetsahead",
          "https://www.instagram.com/createcontent247"
        ]}
      />

      <WebPageStructuredData
        name="AssetsAhead - Programmable LED Backpacks"
        description="South Africa's premier programmable LED backpacks. Stand out from the crowd with customizable LED displays you control from your smartphone."
        url="https://assetsahead.com"
        breadcrumbs={[
          { name: "Home", url: "https://assetsahead.com" },
          { name: "LED Backpacks", url: "https://assetsahead.com/#products" }
        ]}
      />
    </>
  );
};

export default Analytics;