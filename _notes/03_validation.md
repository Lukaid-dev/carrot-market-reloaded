# zod

타입스크립트는 작성된 코드의 컴파일 시점에만 타입 검사를 하며, 이것은 오직 개발자를 위한 것입니다.
컴파일을 한 후 자바스크립트 런타임 환경에서는 타입스크립트가 아무런 힘을 쓰지 못합니다.
따라서 zod 와 같은 라이브러리의 도움을 받아서 예측 불가능한 런타임 환경에서도 타입 검사(유효성 검증)을 가능하게 합니다.

https://www.daleseo.com/zod-why-validation/

[Object Schema]
z.object() 로 오브젝트 스키마를 만들 수 있습니다.
예시: const User = z.object( { username: z.string() } );

[.parse]
data의 타입이 유효한지 검사하기 위해 .parse 메소드를 사용할 수 있습니다. 유효한 경우 데이터 전체 정보가 포함된 값이 반환됩니다. 유효하지 않은 경우, 에러가 발생합니다. 보통 try-catch 문으로 감싸서 사용한다고 합니다.

[.safeParse]
.parse를 사용할 때 타입이 유효하지 않은 경우 Zod가 에러를 발생시키는 것을 원하지 않는다면, .safeParse를 사용하면 됩니다.

데이터가 유효한 경우 true값의 success와 데이터 정보가 담긴 data를 반환합니다.
유효하지 않은 경우에는 false값의 success와 에러 정보가 담긴 error를 반환합니다.

예시 : stringSchema.safeParse(12); // => { success: false; error: ZodError }
