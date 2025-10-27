import { createMDX } from 'fumadocs-mdx/next';


const withMDX = createMDX();

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  turbopack: {
    root: '/home/stanoriz/Documents/Projects/akibapamoja-docs',
  },
  serverExternalPackages: ['fumadocs-openapi', 'xml-js'],
  webpack: (config, {dev}) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['node_modules/**/*', 'build/**/*', 'public/**/*'],
      }
    }
    // Fix for xml-js module resolution in Fumadocs OpenAPI
    config.resolve.alias = {
      ...config.resolve.alias,
      'xml-js/lib/js2xml': require.resolve('xml-js/lib/js2xml.js'),
    };
    return config;
  }
};

export default withMDX(config);
