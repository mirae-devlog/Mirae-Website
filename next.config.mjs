/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
  // PENTING: Sesuaikan dengan nama repository GitHub Anda persis!
  basePath: '/Mirae-Website',
  
  images: {
    unoptimized: true,
  },
};

export default nextConfig;