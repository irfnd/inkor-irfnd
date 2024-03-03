import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const token = request.cookies.get('token')?.value;

	if (path === '/' && !token) return Response.redirect(new URL('/login', request.url));
	if ((path === '/login' || path === '/register') && token) return Response.redirect(new URL('/', request.url));
	if ((path === '/login' || path === '/register') && !token) return;
	if (path !== '/login' && path !== '/register' && !token) return Response.redirect(new URL('/login', request.url));
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'] };
