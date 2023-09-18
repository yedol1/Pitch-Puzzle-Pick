/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ['pbs.twimg.com'],
    domains: ['fm2023-player-images.s3.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
