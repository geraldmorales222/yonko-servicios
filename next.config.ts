// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permitimos la optimización de imágenes desde Cloudinary
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
              // Scripts autorizados para autenticación y widgets
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://www.gstatic.com https://upload-widget.cloudinary.com;", 
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              /* SOLUCIÓN: Añadimos 'self' y el wildcard HTTPS para imágenes.
                 Esto permite que el navegador encuentre los iconos en /public 
                 incluso durante la redirección 307.
              */
              "img-src 'self' data: blob: https: res.cloudinary.com https://*.googleusercontent.com;", 
              "font-src 'self' data: https://fonts.gstatic.com;",
              // Conexiones para Firebase y APIs externas
              "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.firebaseapp.com https://api.cloudinary.com;", 
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