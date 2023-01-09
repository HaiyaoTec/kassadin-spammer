/** @type {import('next').NextConfig} */

const withImages = require('next-images')

const withTM = require('next-transpile-modules')([
  'react-vant',
]);

const nextConfig = withTM(withImages({
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images:{
    disableStaticImages: true
  }
}))

module.exports = nextConfig
