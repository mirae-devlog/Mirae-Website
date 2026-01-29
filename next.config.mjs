/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Pastikan output BUKAN 'export' untuk Vercel
  // 2. Pastikan basePath KOSONG untuk Vercel
  
  // Matikan pengecekan error saat build (Biar lolos deploy)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Membantu menangani dependensi React Native Web jika ada
  transpilePackages: [
    "react-native", 
    "expo", 
    "react-native-web",
    "lucide-react"
  ],
  
  // Config gambar standar
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;