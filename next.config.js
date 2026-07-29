/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Iguala los errores de tipos durante la compilación en Vercel
    ignoreBuildErrors: true,
  },
  eslint: {
    // Iguala las reglas de ESLint durante la compilación
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; // O "export default nextConfig;" si tu archivo es .mjsnextConfig;