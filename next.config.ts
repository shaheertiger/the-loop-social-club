import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // "Welcome 2" and "Welcome 3" are standalone HTML pages served from public/.
      { source: "/welcome-2", destination: "/welcome-2.html" },
      { source: "/welcome-3", destination: "/welcome-3.html" },
    ];
  },
};

export default nextConfig;
