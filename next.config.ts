import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permitimos que Next.js optimice imágenes desde Cloudinary
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
              // Scripts permitidos: Google y Cloudinary
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://www.gstatic.com https://upload-widget.cloudinary.com;", 
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              /* CORRECCIÓN AQUÍ: 
                Añadimos tus dominios y subdominios a img-src. 
                Sin esto, el móvil bloquea el favicon y las imágenes locales.
              */
              "img-src 'self' blob: data: res.cloudinary.com https://lh3.googleusercontent.com https://www.yonkoservicios.com https://yonkoservicios.com;", 
              "font-src 'self' data: https://fonts.gstatic.com;",
              // Conexiones de API
              "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.firebaseapp.com https://api.cloudinary.com;", 
              // Iframes permitidos
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