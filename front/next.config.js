/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  nextConfig,
});
