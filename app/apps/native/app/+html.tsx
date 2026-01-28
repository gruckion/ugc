import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

/**
 * Root HTML template for Expo web
 * Adds Open Graph and Twitter Card meta tags for social sharing
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* Primary Meta Tags */}
        <title>UGC Marketplace - Connect Brands with Creators</title>
        <meta
          name="description"
          content="Find authentic user-generated content for your brand. Connect with talented creators and get high-quality UGC that converts."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ugp.gruckion.com/" />
        <meta
          property="og:title"
          content="UGC Marketplace - Connect Brands with Creators"
        />
        <meta
          property="og:description"
          content="Find authentic user-generated content for your brand. Connect with talented creators and get high-quality UGC that converts."
        />
        <meta property="og:image" content="https://ugp.gruckion.com/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="UGC Marketplace - Connect Brands with Creators"
        />
        <meta property="og:site_name" content="UGC Marketplace" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ugp.gruckion.com/" />
        <meta
          name="twitter:title"
          content="UGC Marketplace - Connect Brands with Creators"
        />
        <meta
          name="twitter:description"
          content="Find authentic user-generated content for your brand. Connect with talented creators and get high-quality UGC that converts."
        />
        <meta name="twitter:image" content="https://ugp.gruckion.com/og.png" />
        <meta name="twitter:creator" content="@gruckion" />

        {/* Theme Color */}
        <meta name="theme-color" content="#1DBF73" />

        {/* Apple Web App */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="UGC Marketplace"
        />

        {/* Disable body scrolling on web. This makes ScrollView components work correctly. */}
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
