import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  reactCompiler: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              // Permitimos scripts de Google y el Widget de Cloudinary
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://www.gstatic.com https://upload-widget.cloudinary.com;", 
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              // Permitimos imágenes de tu dominio, Cloudinary y el avatar de Google
              "img-src 'self' blob: data: res.cloudinary.com https://lh3.googleusercontent.com;", 
              "font-src 'self' data: https://fonts.gstatic.com;",
              // Conexiones de API para Firebase y Cloudinary
              "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.firebaseapp.com https://api.cloudinary.com;", 
              // Permitimos el iframe de login y el widget
              "frame-src 'self' https://*.firebaseapp.com https://*.google.com https://upload-widget.cloudinary.com;",
              "frame-ancestors 'none';",
            ].join(" "),
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // ESTA LÍNEA ES VITAL PARA EL POPUP DE GOOGLE:
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        ],
      },
    ];
  },
};

export default nextConfig;