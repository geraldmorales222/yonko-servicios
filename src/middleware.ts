// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* PROTECCIÓN DE SEGURIDAD:
    Solo aplicamos la lógica si la ruta empieza con /administracion.
    Esto evita que el middleware interfiera con los iconos o la home.
  */
  if (pathname.startsWith('/administracion')) {
    const session = request.cookies.get('admin_session');

    if (!session) {
      // Si un intruso intenta entrar sin cookie, lo mandamos al home
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

/* CONFIGURACIÓN DEL MATCHER:
  Es vital excluir los archivos estáticos aquí para que el middleware 
  ni siquiera los toque.
*/
export const config = {
  matcher: [
    /*
     * Match todas las rutas excepto:
     * 1. api (rutas de API)
     * 2. _next/static (archivos compilados)
     * 3. _next/image (optimización de imágenes)
     * 4. favicon.ico, icon.png, etc. (archivos en public)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-touch-icon.png).*)',
    '/administracion/:path*',
  ],
};