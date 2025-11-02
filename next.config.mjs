import { createMDX } from 'fumadocs-mdx/next';


const withMDX = createMDX();


/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  turbopack: {
    root: '/home/stanoriz/Documents/Projects/akibapamoja-docs',
  },
  serverExternalPackages: [],
  webpack: (config, {dev}) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['node_modules/**/*', 'build/**/*', 'public/**/*'],
      }
    }
    return config;
  }
};

export default withMDX(config);
