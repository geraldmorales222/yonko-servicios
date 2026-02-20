// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Definimos las rutas que queremos proteger
  // Esto cubrirá /administracion-yonko-gerald y cualquier subruta como /mensajes
  if (pathname.startsWith('/administracion')) {
    
    // NOTA TÉCNICA: En el Middleware no tenemos acceso directo a Firebase Auth 
    // porque Firebase Auth vive en el cliente (browser). 
    // Por ahora, haremos una protección por "Email Ofuscado" o "Token de sesión".
    
    // Una técnica simple para producción es verificar una Cookie de sesión 
    // que tú mismo generes al loguearte.
    const session = request.cookies.get('admin_session');

    if (!session) {
      // Si no hay sesión, redirigimos al home o a una página 404 para "desaparecer" la ruta
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// 2. Configuramos en qué rutas se debe ejecutar este middleware
export const config = {
  matcher: ['/administracion/:path*'],
};