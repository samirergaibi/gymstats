/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  redirects: async () => [
    {
      source: '/exercises',
      destination: '/404',
      permanent: false,
    },
  ],
};

module.exports = withPWA(nextConfig);
