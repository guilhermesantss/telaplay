import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAuth = request.cookies.get('auth')?.value === 'true';

  console.log('[middleware] Path:', pathname);
  console.log('[middleware] Auth cookie:', isAuth);

  if (pathname === '/teste') {
    console.log('🔐 Middleware ativo na rota /teste');
  }

  if (!isAuth && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
