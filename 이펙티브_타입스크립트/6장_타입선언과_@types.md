# 6장. 타입 선언과 @types

타입스크립트에서 의존성이 어떻게 동작하는지를 설명함.

## 아이템45. devDependencies에 typescript와 @types 추가하기

npm은 세 가지 종류의 의존성을 구분해서 관리하며, 각각의 의존성은 `package.json` 파일 내의 별도 영역에 들어 있습니다.

- `dependencies`
  - 현재 프로젝트를 진행하는데 필수적인 라이브러리들이 포함
  - ex. `react` , `ramda` ...
- `devDependencies`
  - 현재 프로젝트를 개발하고 테스트하는 데 사용되지만, 런타임에는 필요 없는 라이브러리들이 포함
  - ex. `@types/react` , `@types/ramda` , `eslint` , `husky`
- `peerDependencies`
  - 런타임에 필요하긴 하지만, 의존성을 직접 관리하지 않는 라이브러리들
  - ex. 제이쿼리의 플러그인 (?)

타입스크립트는 개발 도구일 뿐이고 타입 정보는 런타임에 존재하지 않기 때문에, 타입스크립트와 관련된 라이브러리는 일반적으로 `devDependencies` 에 포함.

### 타입스크립트 프로젝트에서 공통적으로 고려해야할 의존성 두 가지

- 타입스크립트 자체 의존성을 고려해야함. 타입스크립트를 시스템 레벨로 설치할 수 있지만, 다음 두 가지 이유 때문에 추천하지는 않음
  1. 팀원들 모두가 항상 동일한 버전을 설치한다는 보장이 없음
  2. 프로젝트를 셋업할 때 별도의 단계가 추가됨
  - 따라서 타입스크립트를 `devDependencies` 에 포함시키자.
- 타입 의존성(`@types`)을 고려해야 함.
  - [https://definitelytyped.org/](https://definitelytyped.org/)

## 아이템46. 타입 선언과 관련된 세 가지 버전 이해하기

타입스크립트는 의존성 관리를 오히려 더 복잡하게 만듬.

- 라이브러리의 버전
- 타입 선언(`@types`)의 버전
- 타입스크립트의 버전

세 가지 버전 중 하나라도 맞지 않으면, 엉뚱한 오류가 발생할 수 있습니다.

### 시멘틱 버전

![https://i.imgur.com/5zT7ZrI.png](https://i.imgur.com/5zT7ZrI.png)

### 라이브러리 버전 / 타입 선언 버전

패치버전만 업데이트가 있는 경우, 일반적으로 공개 API의 사양을 변경하지 않아 타입 선언을 업데이트할 필요가 없습니다.

### 라이브러리 버전 / 타입스크립트 버전

실제 라이브러리와 타입 정보의 버전이 별도로 관리되는 방식은 네가지 문제점이 있습니다.

- 라이브러리를 업데이트 했지만 실수로 타입 선언은 업데이트 하지않는 경우
  - 타입 오류가발생하거나 런타임에 오류가 발생
  - 해결책 두 가지
    - 보강(augmentation) 기법: 사용하는 새 함수와 메서드의 타입 정보를 프로젝트 자체에 추가
    - 타입 선언의 업데이트를 직접 작성하고 공개하여 커뮤니티에 기여
- 라이브러리보다 타입 선언의 버전이 최신인 경우
  - 해결책
    - 타입 선언의 버전을 내린다.
    - 라이브러리 버전을 올린다.
- 프로젝트에서 사용하는 타입스크립트 버전보다 라이브러리에서 필요로 하는 타입스크립트 버전이 최신인 경우
  - `@types` 선언 자체에서 타입 오류가 발생하게 됨.
  - 해결책
    - 타입스크립트 버전을 올리거나
    - 라이브러리 타입 선언의 버전을 원래대로 내리거나
    - declare modules 선언으로 타입 정보를 없애버리면 된다.
    - 라이브러리에서 `typesVersions` 를 통해 타입스크립트 버전별로 다른 타입 선언을 제공하는 방법도 있다. (제공하는 라이브러리가 적다)
    ```tsx
    $ npm install --save-dev @types/lodash@ts3.1
    ```
- `@types` 의존성이 중복될 수도 있다.
  - `@types/bar` 가 현재 프로젝트와 호환되지않는 버전의 `@types/foo` 에 의존한다면 npm은 중첩된 폴더에 별도로 해당 버전을 설치하여 문제를 해결하려 합니다.
  ```tsx
  node_modules/
    @types/
      foo/
        index.d.ts @1.2.3
      bar/
        index.d.ts
        node_modules/
          @types/
            foo/
              index.d.ts @2.3.4
  ```
  - 런타임에 사용되는 모듈이라면 괜찬을 수 있지만, 전역 네임스페이스(namespace)에 있는 타입 선언 모듈이라면 대부분 문제가 발생합니다.
    - 이런 경우 `npm ls @types/foo` 를 실행하여 어디서 중복이 발생했는지 추적할 수 있음.
    - 해결책
      - `@types/foo` 를 업데이트 하거나
      - `@types/bar` 를 업데이트
      - `@types` 가 전이(transitive) 의존성을 가지도록 만드느 것은 종종 문제를 일으키기도 합니다. (타 `@types` 에 영항을 끼치는 것은 문제를 일으킨다...? 고로 문제를 피하기 위해서는 아이템 51을 참고하라)
  ### d.ts
  타입스크립트로 작성된 라이브러리들은 자체적으로 타입 선언을 포함하게 됩니다.
  `package.json` 의 `types` 필드에서 `.d.ts` 파일을 가리키도록 함
  ```tsx
  {
    "name": "@yogiyo/design-token",
    "version": "1.6.0",
    "main": "dist/index.js",
    "module": "dist/index.esm.js",
    "types": "dist/index.d.ts",
    // ...
  }
  ```
  `"types": "index.d.ts"` 만 추가하면 될 거같지만 번들링 방식에는 네 가지 문제점이 있다.
  - 번들된 타입 선언에 보강 기법으로 해결할 수 없는 오류가 있는 경우, 공개 시점에는 잘 동작했지만 타입스크립트 버전이 올라가면서 오류가 발생하는 경우 (은근슬쩍 두 개...?!)
    - 번들된 타입에서는 `@types` 버전 선택이 불가능합니다.
  - 프로젝트 내의 타입 선언이 다른 라이브러리의 타입 선언에 의존하는 경우
    - 다른 사용자가 프로젝트를 설치하는 경우, 일반적으로 `devDependencies` 에 있는 `@types` 가 설치되지 않을 것이고 타입 오류가 발생하게 됨
      - 아이템 51에서 이러한 상황에 표준 해결책을 다룸 (이것도 역시 다음에 보자)
  - 프로젝트의 과거 버전에 있는 타입 선언에 문제가 있는 경우
    - 라이브러리를 업데이트해야함
  - 타입 선언의 패치 업데이트를 자주 하기 어려움
    - `@types` 는 커뮤니티에서 관리되어서 쉽지만 관리자가 라이브러리를 계속 패치하기는 어려움

### 마무리

라이브러리를 공개하려는 경우, `d.ts` 를 포함하는 것과 `@types` 중에 선택잘하자.

권장사항은 라이브러리가 타입스크립트로 작성된 경우만 타입 선언(`d.ts`)을 라이브러리에 포함하는 것 → 타입스크립트 컴파일러가 타입 선언을 대신 생성해줌(declaration 컴파일러 옵션 사용)

## 아이템47. 공개 API에 등장하는 모든 타입을 익스포트하기

라이브러리 제작자라면 괜히 숨기지 말고 라이브러리 사용자를 위해 타입을 명시적으로 익스포트하는 것이 좋다.

### 예시

```tsx
interface SecretName {
  first: string;
  last: string;
}

interface SecretSanta {
  name: SecretName;
  gift: string;
}

export function getGift(name: SecretName, gift: string): SecretSanta {
  // COMPRESS
  return {
    name: {
      first: "Dan",
      last: "Van",
    },
    gift: "MacBook Pro",
  };
  // END
}
```

### 예시 - 사용자

```tsx
import { getGift } from "./01";

type MySanta = ReturnType<typeof getGift>; // SecretSanta
type MyName = Parameters<typeof getGift>[0]; // SecretName
```

`export` 안해줘서 쓸데없이 사용자가 `ReturnType` , `Parameters` 를 사용해야함.

## 아이템48. API 주석에 TSDoc 사용하기

[https://tsdoc.org/](https://tsdoc.org/)

에디터가 잘되어있어서 JSDoc, TSDoc은 잘 안사용하는 추세...

## 아이템49. 콜백에서 this에 대한 타입 제공하기

`let` 이나 `const` 와 다르게 `this` 는 다이나믹 스코프입니다. 다이나믹 스코프의 값은 ‘정의된’ 방식이 아니라 ‘호출된’ 방식에 따라 달라집니다.

```tsx
class C {
  vals = [1, 2, 3];
  logSquares() {
    for (const val of this.vals) {
      console.log(val * val);
    }
  }
}
const c = new C();
const method = c.logSquares;
method();
// ~~ Uncaught TypeError: undefined의 'vals'속성을 읽을 수 없습니다.
```

`call` 메소드를 사용하면 `this` 바인딩을 제어할 수 있다.

```tsx
const c = new C();
const method = c.logSquares;
method.call(c); // Logs the squares again
```

### Class 내부 this 바인딩

```tsx
class ResetButton {
  render() {
    return makeButton({ text: "Reset", onClick: this.onClick });
  }
  onClick() {
    alert(`Reset ${this}`);
  }
}
```

`ResetButton` 에서 `onClick()` 을 실행시키면 오류가 발생

### 생성자에서 this 바인딩

```tsx
class ResetButton {
  constructor() {
    this.onClick = this.onClick.bind(this);
  }
  render() {
    return makeButton({ text: "Reset", onClick: this.onClick });
  }
  onClick() {
    alert(`Reset ${this}`);
  }
}
```

`constructor()` 에서 `this` 를 바인딩 시켜 해결

### 화살표 함수

```tsx
class ResetButton {
  render() {
    return makeButton({ text: "Reset", onClick: this.onClick });
  }
  onClick = () => {
    alert(`Reset ${this}`); // "this" always refers to the ResetButton instance.
  };
}
```

### 작성 중인 라이브러리에 this를 사용하는 콜백 함수가 있는 경우

```tsx
declare function makeButton(props: { text: string; onClick: () => void }): void;
function addKeyListener(
  el: HTMLElement,
  fn: (this: HTMLElement, e: KeyboardEvent) => void
) {
  el.addEventListener("keydown", (e) => {
    fn.call(el, e);
  });
}
```

만약 라이브러리 사용자가 콜백을 화살표 함수로 작성하고 `this` 를 참조하려고 하면 타입스크립트가 문제를 잡아냅니다.

```tsx
declare function makeButton(props: { text: string; onClick: () => void }): void;
function addKeyListener(
  el: HTMLElement,
  fn: (this: HTMLElement, e: KeyboardEvent) => void
) {
  el.addEventListener("keydown", (e) => {
    fn(e);
    // ~~~~~ The 'this' context of type 'void' is not assignable
    //       to method's 'this' of type 'HTMLElement'
  });
}
class Foo {
  registerHandler(el: HTMLElement) {
    addKeyListener(el, (e) => {
      this.innerHTML;
      // ~~~~~~~~~ Property 'innerHTML' does not exist on type 'Foo'
    });
  }
}
```

## 아이템50. 오버로딩 타입보다는 조건부 타입을 사용하기

```tsx
function double(x: number | string): number | string;
function double(x: any) {
  return x + x;
}
```

함수 오버로딩 개념을 사용하여 타입을 정의하였습니다. 선언이 틀린 것은 아니지만, 모호한 부분이 있습니다.

```tsx
const num = double(12); // string | number
const str = double("x"); // string | number
```

`number` 타입을 매개변수로 넣으면 `number` 타입을 반환하고 `string` 타입을 넣으면 `string` 타입을 반환합니다.

### 제네릭 사용

제네릭을 사용하면 이러한 동작을 모델링할 수 있습니다.

```tsx
function double<T extends number | string>(x: T): T;
function double(x: any) {
  return x + x;
}

const num = double(12); // Type is 12
const str = double("x"); // Type is "x"
```

타입이 너무 구체적으로 좁혀졌습니다. `string` 매개변수를 넣으면 `string` 타입이 반환되어야 합니다.

### 여러가지 타입 선언으로 분리

```tsx
function double(x: number): number;
function double(x: string): string;
function double(x: any) {
  return x + x;
}

const num = double(12); // Type is number
const str = double("x"); // Type is string

function f(x: number | string) {
  return double(x);
  // ~ Argument of type 'string | number' is not assignable
  //   to parameter of type 'string'
}
```

함수 타입이 명확해졌지만, `number | string` 유니온 타입 관련해서는 문제가 발생합니다.

### 조건부 타입을 사용

```tsx
function double<T extends number | string>(
  x: T
): T extends string ? string : number;
function double(x: any) {
  return x + x;
}

const num = double(12); // number
const str = double("x"); // string

// function f(x: string | number): string | number
function f(x: number | string) {
  return double(x);
}
```

## 아이템51. 의존성 분리를 위해 미러 타입 사용하기

필수가 아닌 의존성을 분리할 때는 구조적 타이핑을 사용하면 됩니다.

공개한 라이브러리를 사용하는 사용자가 `@types` 의존성을 가지지 않게 해야합니다.

## 아이템52. 테스팅 타입의 함정에 주의하기

```tsx
declare function map<U, V>(array: U[], fn: (u: U) => V): V[];

// 테스트 파일
map(["2017", "2018", "2019"], (v) => Number(v));
```

첫 번째 매개변수에 배열이 아닌 단일 값이 있었다면 매개변수 타입에 대한 오류를 잡을 수는 있지만, 반환값에 대한 체크가 누락되어있기 때문에 완전한 테스트라고 할 수 없습니다.

```tsx
const square = (x: number) => x * x;
test("square a number", () => {
  square(1);
  square(2);
});
```

이와 같이 반환타입을 체크하지 않는 것은 좋지 않음. `square` 의 구현이 잘못되어 있더라도 이 테스트를 통과하기 때문

### 반환 타입 체크할 수 있는 방법

일반적인 해결책은 변수를 도입하는 대신 헬퍼 함수를 정의하는 것

```tsx
declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
function assertType<T>(x: T) {}

assertType<number[]>(map(["john", "paul"], (name) => name.length));
```

두 타입이 동일한지 체크하는 것이 아니라 할당 가능성을 체크하고 있다.

```tsx
function assertType<T>(x: T) {}
const n = 12; // Type: 12
assertType<number>(n); // OK
```

객체의 타입을 체크하는 경우를 보면 문제가 있다.

```tsx
declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
function assertType<T>(x: T) {}
const beatles = ["john", "paul", "george", "ringo"];
assertType<{ name: string }[]>(
  map(beatles, (name) => ({
    name,
    inYellowSubmarine: name === "ringo",
  }))
); // OK
```

`{ name: string }` 타입이 아니라 `{ name: string; inYellowSubmarine: boolean; }` 타입인데도 OK

`assertType` 에 함수를 넣어보면, 더 이상함

```tsx
declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
function assertType<T>(x: T) {}
const add = (a: number, b: number) => a + b;
assertType<(a: number, b: number) => number>(add); // OK

const double = (x: number) => 2 * x;
assertType<(a: number, b: number) => number>(double); // OK!?
```

### 제대로 만들어보기

`Parameters` 와 `ReturnType` 제네릭 타입을 이용해 함수의 매개변수 타입과 반환 타입만 분리하여 테스트할 수 있습니다.

```tsx
declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
function assertType<T>(x: T) {}
const double = (x: number) => 2 * x;
let p: Parameters<typeof double> = null!;
assertType<[number, number]>(p);
//                           ~ Argument of type '[number]' is not
//                             assignable to parameter of type [number, number]
let r: ReturnType<typeof double> = null!;
assertType<number>(r); // OK
```

콜백 함수 내부에서 매개변수의 타입과 `this` 를 직접 체크해보기

```tsx
declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
function assertType<T>(x: T) {}
const beatles = ["john", "paul", "george", "ringo"];
assertType<number[]>(
  map(beatles, function (name, i, array) {
    // ~~~~~~~ Argument of type '(name: any, i: any, array: any) => any' is
    //         not assignable to parameter of type '(u: string) => any'
    assertType<string>(name);
    assertType<number>(i);
    assertType<string[]>(array);
    assertType<string[]>(this);
    // ~~~~ 'this' implicitly has type 'any'
    return name.length;
  })
);
```

위 예제에서 콜백 함수는 화살표 함수가 아니기 때문에 `this` 의 타입을 테스트할 수 있음

```tsx
declare function map<U, V>(
  array: U[],
  fn: (this: U[], u: U, i: number, array: U[]) => V
): V[];
```

요걸 추가하면 타입 체크를 통과

```tsx
declare module "overbar";
```

와 같이 전체 모듈에 `any` 를 추가하는 경우 모든 테스트를 통과하겠지만 지양해야함.

타입 시스템 내에서 암시적 `any` 타입을 발견해내는 것은 아주 어렵고, 따라서 타입 체커와 독립적으로 동작하는 도구를 사용해서 타입 선언을 테스트하는 방법이 권장됨.
