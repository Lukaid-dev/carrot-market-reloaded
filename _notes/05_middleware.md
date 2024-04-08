# Nextjs middleware

미들웨어는 request가 완료되기 전에 특정 코드를 실행할 수 있게한다. 그 후, 들어오는 요청(incoming request)에 따라 요청 또는 응답 헤더를 재작성, 리디렉션, 수정하거나 직접 응답하여 응답을 수정할 수 있다.

```
GET /profile ------> middleware() ------> <Profile>
```

미들웨어를 통해 유저가 특정 쿠키를 가지고 있는지 확인 할 수도 있다. (만약, 쿠키를 가지고있지 않다면, profile로 라우팅 되는것을 허용하지 않을 수 있다.)

middleware를 선언하면, 서비스의 모든 request 하나하나 모두 middleware가 실행 됨

특정 페이지에서만 middleware를 실행하려면, matcher를 사용하자.
matcher를 사용하면 미들웨어를 필터링하여 특정 경로들에서만 실행되도록 할 수 있다.

```ts
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

이렇게 강력한 middleware도 제한이 있는데, PrismaClient를 실행 하는 등의 Edge function에서 하지 못하는 것들은 할 수 없다. (많은 npm package들이 실행 불가)

middleware는 edge runtime에서 실행되고, node.js runtime에서는 실행되지 않는다.

- The **Node.js Runtime** (default) has access to all Node.js APIs and compatible packages from the ecosystem.
- The **Edge Runtime** is based on Web APIs.

middleware가 node runtime에서 실행된다면, 상당히 헤비 할 것

Edge Runtime
In Next.js, the lightweight Edge Runtime is a subset of available Node.js APIs.

https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
