/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig={

  // ... other config options
  productionBrowserSourceMaps: true
};
module.exports = withBundleAnalyzer(nextConfig),{
  
  async middleware() {
    return ["/", "/home","/waterQuality"];
  },
  
};