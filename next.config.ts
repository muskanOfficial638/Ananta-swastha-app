import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'], // For using Unsplash images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // For development speed - remove in production
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
