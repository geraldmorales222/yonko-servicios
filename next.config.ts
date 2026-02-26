// Configuración de Next.js para Yonko Servicios
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permitimos que Next.js optimice imágenes de Cloudinary para mejorar el LCP
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  reactCompiler: true, // Habilita las optimizaciones del nuevo compilador de React

  async headers() {
    return [
      {
        // Aplicamos cabeceras de seguridad a todas las rutas del sitio
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            /* Definimos la CSP para mitigar ataques XSS.
               Añadimos dominios de Firebase y Cloudinary para permitir la carga de assets y autenticación.
            */
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://www.gstatic.com https://upload-widget.cloudinary.com https://*.firebaseapp.com;", 
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              // 'img-src self' es vital para que carguen los iconos de la carpeta public
              "img-src 'self' data: blob: https: res.cloudinary.com https://lh3.googleusercontent.com;", 
              "font-src 'self' data: https://fonts.gstatic.com;",
              "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.firebaseapp.com https://api.cloudinary.com wss://*.firebaseio.com;", 
              "frame-src 'self' https://*.firebaseapp.com https://*.google.com https://upload-widget.cloudinary.com;",
              "frame-ancestors 'none';",
            ].join(" "),
          },
          { key: "X-Frame-Options", value: "DENY" }, // Evita que el sitio sea embebido en iframes
          { key: "X-Content-Type-Options", value: "nosniff" }, // Previene el sniffing de MIME types
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        ],
      },
    ];
  },
};

export default nextConfig;