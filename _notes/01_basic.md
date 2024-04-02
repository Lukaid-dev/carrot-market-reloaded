# Next.js

> The React Framework for the Web
>
> Used by some of the world's largest companies, Next.js enables you to create high-quality web applications with the power of React components.

<br>

## Hydration (수분 보충)

> Hydration turns the initial HTML snapshot from the server into a fully interactive app that runs in the browser.

Next.js는 Server Side Rendering(SSR)을 통해 페이지 로딩 속도를 높여 사용자 경험을 향상시키는 프레임워크이다. Hydration은 SSR 과정의 마지막 단계이며, 클라이언트 측에서 JavaScript를 사용하여 서버에서 렌더링된 HTML을 실제 DOM으로 변환하는 과정을 말한다.

간단하게 말해서, 서버에서 렌더된 페이지를 클라이언트에서 재사용하는 것을 말하며, 서버에서 가져온 건조한 HTML을 React Application으로 초기화하는 작업을 말한다.

HTML 요소들을 React 컴포넌트로 변환하고, 이벤트리스너를 부착하여 React DOM에서 관리하게 한다.

<br>

### Hydration의 작동 방식

SSR: Next.js는 서버에서 페이지를 렌더링하고 HTML, CSS 및 JavaScript를 포함하는 정적 파일을 생성한다.
CSR: 클라이언트는 정적 파일을 다운로드하고 JavaScript를 실행한다.
Hydration: JavaScript는 서버에서 렌더링된 HTML을 선택하고 DOM 요소에 이벤트 리스너 및 기타 기능을 연결한다.

<br>

### Hydration 관련 주의 사항

모든 컴포넌트가 Hydration을 지원하는 것은 아니다. Next.js는 getStaticProps 또는 getServerSideProps를 사용하여 렌더링된 컴포넌트만 Hydration을 지원한다.

<br>

## use client

Nextjs에서 모든 컴포넌트와 페이지들은 "use client" 사용 여부와 상관없이, 먼저 서버에서 렌더된다.

"use client"의 역할은, 해당 컴포넌트는 Hydrated 되어야 한다는 것을 명시한다. ("이 컴포넌트는 클라이언트에서 초기화되어야해! 이 컴포넌트는 인터렉티브 하다구!" 라고 말해주는 역할)

"use client"는 해당 컴포넌트가 클라이언트에서만 렌더된다는 것을 의미하는 것이 절대 아니다. (네이밍이 참 구리다. 오해하기 딱 좋음... 서버에서 render되고 클라이언트에서 hydrate됨을 의미하는 것!)

즉, 파일에 "use client"을 정의하면 하위 컴포넌트를 포함하여 해당 파일로 가져온 다른 모든 모듈이 클라이언트 번들의 일부로 간주된다.

다시말해, "use client"가 선언되지 않은 컴포넌트들은 건조한 HTML로 남아있으며, hydrate되지 않고, React Component로 변환되지 않는다.

<br>

## 메타데이터

Next.js에는 향상된 SEO 및 웹 공유성을 위해 애플리케이션 메타데이터(ex: HTML head 엘리먼트 내의 meta 및 link 태그)를 정의하는 데 사용할 수 있는 메타데이터가 존재한다

<br>

### Dynamic Metadata (동적 메타데이터)

generateMetadata 함수를 사용하여 동적 값이 필요한 메타데이터를 가져올 수 있다.

<br>

## 서버컴포넌트 vs 클라이언트컴포넌트

서버 컴포넌트는 서버에서 렌더링되어 HTML로 변환된 후 클라이언트로 전송된다. 이는 페이지 로딩 속도를 높이고 SEO에 도움이 되는 반면, 클라이언트 상호 작용이 제한적일 수 있다. 서버에서 한번 만들어지면, 변경이 되지 않는 정적인 페이지 제작에 적합하다.

클라이언트 컴포넌트는 클라이언트에서 JavaScript를 통해 렌더링된다. 이는 더 많은 상호 작용을 가능하게 하지만, 페이지 로딩 속도가 느리고 SEO에 불리할 수 있다. 동적인 페이지 제작에 적합하다.

서버 컴포넌트 안에 클라이언트 컴포넌트를 포함 할 수 있다. 하지만 일반적으로 클라이언트 컴포넌트 내부에는 서버 컴포넌트를 포함 할 수 없다.

모든 컴포넌트는 기본적으로 서버 컴포넌트이고, 클라이언트 컴포넌트로 변환하려면 "use client"를 사용해야 한다.

클라이언트 컴포넌트를 사용하는 경우는 오직 상호작용이 필요할 때이다. (State를 사용하거나, 디바이스 api, 지리위치 등)

<br>

## data fetching

개인적으로 가장 흥미로웠던 부분이다. 기존 React에서는 fetch나 axios 등을 사용하여 데이터를 가져오고, useEffect나 useState를 사용하여 상태를 관리했다. 하지만 Next.js에서는 이러한 과정을 훨씬 간단하게 만들어주었다.

컴포넌트를 `async` 함수로 만들면, Next.js는 알아서 서버에서 데이터를 가져와서 렌더링해준다.

<br>

### loading page

<br>

http streaming을 이용하여

Loading UI and Streaming

특수 파일 loading.js는 React Suspense를 사용하여 의미 있는 로딩 UI를 만드는 데 도움이 됩니다.
이 규칙을 사용하면 route 세그먼트의 콘텐츠가 로드되는 동안 서버에서 즉시 로딩 상태를 표시할 수 있습니다. 렌더링이 완료되면 새 콘텐츠가 자동으로 교체됩니다.
즉시 로딩 상태는 탐색 시 즉시 표시되는 대체 UI입니다. 스켈레톤, 스피너 등 로딩 표시기나 표지 사진, 제목 등 미래 화면의 작지만 의미 있는 부분을 미리 렌더링할 수 있습니다.

<br>

## type vs interface

For the most part, you can choose based on personal preference, and TypeScript will tell you if it needs something to be the other kind of declaration. If you would like a heuristic, use interface until you need to use features from type.

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
