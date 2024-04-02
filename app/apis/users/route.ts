// route는 UI를 렌더하지 않는다.

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  console.log(request);
  return Response.json({ ok: true });
}

export async function POST(request: NextRequest) {
  console.log('this is server action POST');
  const data = await request.json();
  console.log(data);
  return Response.json(data);
}
