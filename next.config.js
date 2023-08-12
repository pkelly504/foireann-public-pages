/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'static-uat.gaaservers.net',
      'static.gaaservers.net',
    ],
  },
}

module.exports = nextConfig
