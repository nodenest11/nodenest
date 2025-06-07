/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  // Customize output directory for static export
  distDir: 'dist',
  // Configure build output
  output: 'standalone',
  // Disable React DevTools in production
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^data-test'] } : false,
  },
  // Bypass TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // Bypass ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig; 