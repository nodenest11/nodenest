/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable strict mode in development to reduce recompilations
  poweredByHeader: false,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config) => {
    // Reduce webpack recompilations by optimizing config
    config.watchOptions = {
      ...config.watchOptions,
      poll: false, // Disable polling
      ignored: ['**/node_modules', '**/.git'],
    };
    return config;
  },
};

module.exports = nextConfig; 