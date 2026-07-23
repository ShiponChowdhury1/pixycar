import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.ngrok-free.dev",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "*.ngrok-free.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "particularistically-transelementary-owen.ngrok-free.dev",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "particularistically-transelementary-owen.ngrok-free.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
