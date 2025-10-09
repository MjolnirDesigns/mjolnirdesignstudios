/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Keep for compatibility
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;