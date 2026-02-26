// Middleware para controlar el acceso a la administración
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* PROTECCIÓN DE RUTA: Solo verificamos sesión si el usuario 
     intenta entrar a /administracion.
  */
  if (pathname.startsWith('/administracion')) {
    const session = request.cookies.get('admin_session');

    // Si no existe la cookie de admin, redirigimos al Home
    if (!session) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

/* MATCHER: Configuramos Next.js para que el middleware ignore 
   archivos estáticos y de sistema, evitando el 'mundo gris' por bloqueos accidentales.
*/
export const config = {
  matcher: [
    /*
     * Excluimos explícitamente los iconos de la carpeta public 
     * para que siempre sean visibles sin importar la sesión.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-touch-icon.png|android-chrome-192.png).*)',
    '/administracion/:path*',
  ],
};