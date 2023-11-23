import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true,
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

export default withContentlayer(nextConfig);
