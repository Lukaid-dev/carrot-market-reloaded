# server action

기존의 리액트 개발에서는 api url을 이용해서 서버와 통신 함 (물론 지금도 잘 동작하고, 제 3자가 제공하는 webhook을 사용해야 한다면 이런 API url을 사용해야 함)

server action은 server component에서만 사용이 가능함!

그래서 client component에서 server action을 사용하고 싶다면, 해당 함수를 별도의 파일로 선언해줘야함

## route.ts

이거도 page.tsx같이 미리 선언된 예약어 같은 파일임

## useFormStatus

react-dom에서 제공되는 form의 상태를 알려주는 훅 (status, message, isLoading, isSuccess, isError, isIdle) 마치, react query의 그것과 비슷함

이 hook은 반드시 form의 자식 요소에서만 사용되어야 한다. 따라서 이 hook은 form의 상태에 따라 변경하고자 하는 component내부에서 사용되어야 함

이 hook은 자동으로 부모의 form을 찾아서 상태를 관찰함

useFormStatus()
useFormStatus Hook은 마지막 폼 제출의 상태 정보를 제공합니다.

useFormStatus는 동일한 컴포넌트에서 렌더링한 form에 대한 상태 정보를 반환하지 않습니다.

useFormStatus Hook은 상위 form에 대한 정보만 반환합니다. Hook을 호출하는 동일한 컴포넌트나 자식 컴포넌트에서 렌더링한 form의 상태 정보는 반환하지 않습니다.

https://ko.react.dev/reference/react-dom/hooks/useFormStatus

## useFormState

추후정리

useFormState(action, initialState, permalink?)
컴포넌트 최상위 레벨에서 useFormState를 호출하여 폼 액션이 실행될 때 업데이트되는 컴포넌트 state를 생성합니다.

useFormState는 두 개의 값이 담긴 배열을 반환합니다.

- state: 첫 번째 렌더링에서는 initialState와 일치합니다. 액션이 실행된 이후에는 액션에서 반환된 값과 일치합니다.
- formAction: form 컴포넌트의 action prop에 전달하거나 폼 내부 button 컴포넌트의 formAction prop에 전달할 수 있는 새로운 액션입니다.

**주의 사항**
useFormState에 전달한 함수는 첫 번째 인수로 이전 혹은 초기 state를 추가로 받습니다.

https://ko.react.dev/reference/react-dom/hooks/useFormState
