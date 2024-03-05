/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['es'],
    defaultLocale: 'es'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com'
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com'
      }
    ],
    minimumCacheTTL: 50
  }
}

module.exports = nextConfig
