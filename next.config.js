/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  redirects: async () => [
    {
      source: '/exercises',
      destination: '/404',
      permanent: false,
    },
  ],
});
