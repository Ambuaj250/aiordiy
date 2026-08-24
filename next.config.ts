import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  // Pin workspace root: multiple lockfiles (~ and project) confuse auto-detection.
  outputFileTracingRoot: import.meta.dirname,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
