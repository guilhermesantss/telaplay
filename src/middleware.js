import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAuth = request.cookies.get('auth')?.value === 'true';

  const isProtectedRoute =
    pathname.startsWith('/dashboard') || pathname.startsWith('/criar');

  // Se for rota protegida e não estiver logado → redireciona para login
  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se estiver logado e acessar /login → redireciona pro dashboard
  if (pathname === '/login' && isAuth) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/criar/:path*', '/login'],
};
