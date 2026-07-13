/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
 remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // এই ডোমেইনটি যুক্ত করুন
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com', // আপনার আরেকটি ডোমেইন যদি থাকে
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
