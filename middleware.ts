import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && request.nextUrl.pathname === '/auth') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!user) {
    if (request.nextUrl.pathname === '/account') {
      return NextResponse.redirect(new URL('/account', request.url));
      // all protected routes here
    }
    if (request.nextUrl.pathname === '/api/generateQuestion') {
      // Code to execute if the requested page is /api/generateQuestion

      const cookie = request.cookies.get('jrl_gl');
      if (cookie) {
        const cookieNumber = Number(cookie.value[0]);
        if (cookieNumber < 1) {
          return new NextResponse(
            JSON.stringify({ success: false, error: 'Demo Ended' }),
            { status: 401, headers: { 'content-type': 'application/json' } }
          );
        } else if (typeof cookieNumber === 'number') {
          const newCookieNumber = cookieNumber - 1;
          const response = NextResponse.next();
          response.cookies.set(
            'jrl_gl',
            `${newCookieNumber.toString()}86989461
        1568194684564687368`
          );
          return response;
        }
      }

      const response = NextResponse.next();
      response.cookies.set(
        'jrl_gl',
        `486989461
    1568194684564687368`
      );
      return response;
    }

    return response;
  }
}

export const config = {
  matcher: ['/api/generateQuestion/', '/auth', '/account'],
  api: {
    bodyParser: false,
  },
};
