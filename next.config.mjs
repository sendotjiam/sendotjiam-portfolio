/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/ios-agents-skill',
        destination: '/ios-agent-skills',
      },
      {
        source: '/ios-agent-skill',
        destination: '/ios-agent-skills',
      },
    ];
  },
};

export default nextConfig;
