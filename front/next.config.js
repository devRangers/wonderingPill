/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "production" ? false : true,
    dest: "public",
  },
  nextConfig,
  images: {
    domains: ["storage.googleapis.com", "storage.cloud.google.com"],
  },
  async redirects() {
    return [
      ...["/account/:path*", "/login/:path*", "/register/:path*"].map(
        (source) => ({
          source,
          has: [
            {
              type: "cookie",
              key: "AccessToken",
            },
          ],
          permanent: false,
          destination: "/",
        }),
      ),
    ];
  },
});
