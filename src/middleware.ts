// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* MODIFICACIÓN TÉCNICA: 
     Si el usuario va a administración, ya no lo redirigimos desde aquí.
     Dejamos que el componente 'use client' maneje la interfaz de bloqueo.
  */
  
  // Eliminamos o comentamos la redirección forzada:
  /* if (pathname.startsWith('/administracion')) {
    const session = request.cookies.get('admin_session');
    if (!session) {
       return NextResponse.redirect(new URL('/', request.url));
    }
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: [
    /* Mantenemos las exclusiones para evitar el "mundo gris" en los iconos,
       pero permitimos que el middleware pase de largo en las rutas de admin.
    */
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-touch-icon.png|android-chrome-192.png).*)',
  ],
};