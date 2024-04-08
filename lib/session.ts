import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContent {
  id?: number;
}

export default function getSession() {
  // carrot-cookie이 있다면 복호화 후 반환하고, 없다면 새로 생성해서 반환
  return getIronSession<SessionContent>(cookies(), {
    cookieName: 'carrot-session',
    password: process.env.COOKIE_PASSWORD!,
  });
}
