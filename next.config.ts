// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permitimos que Next.js optimice imágenes de Cloudinary
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
        // Aplicamos estas reglas a todas las páginas
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            /* Explicación de la Política (CSP):
               - default-src 'self': Solo permite recursos de nuestro propio dominio.
               - script-src: Permite Google y Firebase para que el Login funcione.
               - img-src: 'self' permite los iconos de /public. El '*' permite imágenes externas seguras.
            */
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://www.gstatic.com https://upload-widget.cloudinary.com https://*.firebaseapp.com;", 
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              "img-src 'self' data: blob: https: res.cloudinary.com https://lh3.googleusercontent.com;", 
              "font-src 'self' data: https://fonts.gstatic.com;",
              "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.firebaseapp.com https://api.cloudinary.com wss://*.firebaseio.com;", 
              "frame-src 'self' https://*.firebaseapp.com https://*.google.com https://upload-widget.cloudinary.com;",
              "frame-ancestors 'none';",
            ].join(" "),
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        ],
      },
    ];
  },
};

export default nextConfig;