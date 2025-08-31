import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // 在构建过程中完全禁用ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 配置允许的图片域名
  images: {
    domains: ['qiniu-storage.weweknow.com'],
  },

  // 禁用静态资源缓存
  generateEtags: false,
  
  // 配置缓存控制
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
