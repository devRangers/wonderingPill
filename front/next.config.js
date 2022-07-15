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
});
