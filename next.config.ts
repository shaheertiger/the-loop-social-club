import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // "Welcome 2" is a standalone HTML page served from public/.
      { source: "/welcome-2", destination: "/welcome-2.html" },
    ];
  },
};

export default nextConfig;
