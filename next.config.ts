// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permitimos optimizar imágenes desde Cloudinary
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
              // Permitimos scripts de Google y Firebase para que no bloqueen el renderizado
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://www.gstatic.com https://upload-widget.cloudinary.com https://*.firebaseapp.com;", 
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              /* SOLUCIÓN AL MUNDO GRIS: 
                 Permitimos imágenes de tu propio dominio, Cloudinary y Google. 
                 Añadir el asterisco (*) en https: ayuda a que Firebase no bloquee el favicon.
              */
              "img-src 'self' data: blob: https: res.cloudinary.com https://*.googleusercontent.com https://www.yonkoservicios.com;", 
              "font-src 'self' data: https://fonts.gstatic.com;",
              // Conexiones de API críticas para Firebase
              "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.firebaseapp.com https://api.cloudinary.com wss://*.firebaseio.com;", 
              // Iframes para el Login de Google/Firebase
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