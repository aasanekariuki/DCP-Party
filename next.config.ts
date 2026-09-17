import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 1. Specific single domain
      {
        protocol: "https",
        hostname: "peopledaily.digital",
      },
      // 2. Wildcard for all subdomains (e.g., cdn.example.com, images.example.com)
      {
        protocol: "https",
        hostname: "socialsciences.uonbi.ac.ke",
      },
      // 3. Match any domain ending with a specific extension
      {
        protocol: "https",
        hostname: "dcphazina.com",
      },
      // 4. Wildcard matching any path under a specific domain
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-**",
      },
    ],
  },
};

export default nextConfig;