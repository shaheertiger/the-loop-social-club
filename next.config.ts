import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Only the site's own domains may embed the form bridge.
        source: "/submit-bridge",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://www.theloopsocial.ca https://theloopsocial.ca https://*.vercel.app",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
