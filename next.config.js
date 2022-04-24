/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'raw.githubusercontent.com',
      'youtube.com',
      'source.unsplash.com',
      'cdn.sanity.io'
    ]
  }
};

module.exports = nextConfig;
