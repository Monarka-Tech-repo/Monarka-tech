import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export has no image-optimization server; source assets are
    // pre-compressed via scripts/optimize-images.mjs instead.
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
