const withPWA = require('next-pwa')({
  dest: 'public'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '',
    domains: [
      'raw.githubusercontent.com',
      'youtube.com',
      'source.unsplash.com',
      'cdn.sanity.io'
    ]
  }
};

module.exports = withPWA(nextConfig);
