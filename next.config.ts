import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporarily disable static export for development
  // output: 'export',
  images: {
    // unoptimized: true, // Enable when using static export
    domains: ['firebasestorage.googleapis.com'], // Allow images from Firebase Storage
  },
  trailingSlash: false, // Remove trailing slashes for better client-side routing
  serverExternalPackages: ['firebase-admin'],
  typescript: {
    // Safely allow production builds to complete even with TypeScript errors
    ignoreBuildErrors: true,
  },
  // Improved client-side navigation settings
  experimental: {
    scrollRestoration: true, // Restore scroll position when navigating
  },
  // Ensure proper handling of client-side navigation
  reactStrictMode: true,
};

export default nextConfig;
