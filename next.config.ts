import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    ppr: true
  },
  images: {
    localPatterns: [
      {
        pathname: 'images/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
