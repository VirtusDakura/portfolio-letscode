/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wgfrnyhstyyzjkivwarb.supabase.co',
      },
    ],
  },
  poweredByHeader: false,
};

export default nextConfig;
