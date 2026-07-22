import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*
    Si el usuario va a administración, no redirigimos desde aquí.
    Dejamos que el componente client maneje la interfaz de bloqueo.
  */
  if (pathname.startsWith('/administracion')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-touch-icon.png|android-chrome-192.png).*)',
  ],
};
