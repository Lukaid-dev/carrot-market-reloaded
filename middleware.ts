import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

interface Routes {
  [key: string]: boolean;
}

// object에서 포함여부를 검색하는 것이, array에서 포함여부를 검색하는 것보다 빠름
const publicOnlyUrls: Routes = {
  '/': true,
  '/login': true,
  '/sms': true,
  '/create-account': true,
};

export default async function middleware(req: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[req.nextUrl.pathname];
  if (!session.id) {
    if (exists) {
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL('/profile', req.nextUrl.origin));
    }
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
