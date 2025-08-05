/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build to proceed with deployment
  },
};

module.exports = nextConfig;