# any 다루기

타입스크립트의 타입 시스템은 선택적(optional)이고 점진적(gradual)이기 때문에 정적이면서도 동적인 특성을 동시에 가집니다. 따라서 타입스크립트는 프로그램의 일부분에만 타입 시스템을 적용할 수 있습니다.

## 아이템38. any 타입은 가능한 좁은 범위에서만 사용하기

```tsx
interface Foo {
  foo: string;
}
interface Bar {
  bar: string;
}
declare function expressionReturningFoo(): Foo;
function processBar(b: Bar) {
  /* ... */
}
function f1() {
  const x: any = expressionReturningFoo(); // Don't do this
  processBar(x);
}

function f2() {
  const x = expressionReturningFoo();
  processBar(x as any); // Prefer this
}
```

`f1` 함수가 `x` 를 반환한다면 문제가 커집니다.

```tsx
function f1() {
  const x: any = expressionReturningFoo();
  processBar(x);
  return x;
}

function g() {
  const foo = f1(); // Type is any
  foo.fooMethod(); // This call is unchecked!
}
```

의도하지 않은 타입 안정성의 손실을 피하기 위해서 `any` 의 사용 범위를 최소한으로 좁혀야 합니다.

## 아이템39. any를 구체적으로 변형해서 사용하기

`any` 는 자바스크립트에서 표현할 수 있는 모든 값을 아우르는 매우 큰 범위의 타입입니다.

`any` 보다 더 구체적으로 표현할 수 있는 타입이 존재할 가능성이 높기 때문에 구체적인 타입을 찾아 타입 안정성을 높이도록 해야 합니다.

함수의 매개변수를 구체화할 때, 배열의 배열 형태라면 `any[][]` 처럼 선언하면 됩니다. 그리고 함수의 매개변수가 객체이긴 하지만 값을 알 수 없다면 `{[key: string]: any}` 처럼 선언하면 됩니다.

```tsx
function hasTwelveLetterKey(o: { [key: string]: any }) {
  for (const key in o) {
    if (key.length === 12) {
      return true;
    }
  }
  return false;
}
```

위의 예제처럼 함수의 매개변수가 객체지만 값을 알 수 없다면, `{[key: string]: any}` 대신 모든 비기본형(non-primitive)타입을 포함하는 `object` 타입을 사용할 수도 있습니다.

`object` 타입은 객체의 키를 열거할 수는 있지만 속성에 접근할 수 없다는 점에서 `{[key: string]: any}` 와 약간 다릅니다.

```tsx
function hasTwelveLetterKey(o: object) {
  for (const key in o) {
    if (key.length === 12) {
      console.log(key, o[key]);
      //  ~~~~~~ Element implicitly has an 'any' type
      //         because type '{}' has no index signature
      return true;
    }
  }
  return false;
}
```

객체지만 속성에 접근할 수 없어야 한다면 `unknown` 타입이 필요한 상황일 수 있습니다.

함수의 타입에도 `any` 를 사용해서는 안 됩니다.

```tsx
type Fn0 = () => any; // any function callable with no params
type Fn1 = (arg: any) => any; // With one param
type FnN = (...args: any[]) => any; // With any number of params

const numArgsBad = (...args: any) => args.length; // Returns any
const numArgsGood = (...args: any[]) => args.length; // Returns number
```

## 아이템40. 함수 안으로 타입 단언문 감추기

함수를 작성하다 보면, 외부로 드러난 타입 정의는 간단하지만 내부 로직이 복잡해서 안전한 타입으로 구현하기 어려운 경우가 많습니다.

함수의 모든 부분을 안전한 타입으로 구현하는 것이 이상적이지만, 불필요한 예외 상황까지 고려해 가며 타입 정보를 힘들게 구상할 필요는 없습니다.

함수 내부에는 타입 단언을 사용하고 함수 외부로 드러나는 타입 정의를 명확히 명시하는 정도로 끝내는 게 낫습니다.

```tsx
declare function shallowEqual(a: any, b: any): boolean;
function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null;
  let lastResult: any;
  return function (...args: any[]) {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~
    //          Type '(...args: any[]) => any' is not assignable to type 'T'
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  };
}
```

반환문에 있는 함수와 원본 함수 `T` 타입이 어떤 관련이 있는지 알지 못해 오류가 발생했습니다.

그러나 결과적으로 원본 함수 `T` 타입과 동일한 매개변수로 호출되고 반환값 역시 예상한 결과가 되기 때문에, 타입 단언문을 추가해서 오류를 제거하는 것이 큰 문제가 되지는 않습니다.

`as unknown as T`

```tsx
function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null;
  let lastResult: any;
  return function (...args: any[]) {
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  } as unknown as T;
}
```

## 아이템41. any의 진화를 이해하기

타입 좁히기와 다르게 `any` 가 진화하는 경우가 있다.

```tsx
const result = []; // Type is any[]
result.push("a");
result; // Type is string[]
result.push(1);
result; // Type is (string | number)[]
```

### never[]

![https://i.imgur.com/tvvWC5v.png](https://i.imgur.com/tvvWC5v.png)

`nerver[]` 로 초기화된 경우는...?!

책과 예제를 입력했을때 다르게 나온다...?!

```tsx
function somethingDangerous() {}
let val = null; // Type is any
try {
  somethingDangerous();
  val = 12;
  val; // Type is number
} catch (e) {
  console.warn("alas!");
}
val; // Type is number | null
```

![https://i.imgur.com/oSfis7R.png](https://i.imgur.com/oSfis7R.png)

### 정리

- 암시적 `any` 와 `any[]` 타입은 진화할 수 있습니다.
- `any` 를 진화시키는 방식보다 명시적 타입 구문을 사용하는 것이 안전한 타입을 유지하는 방법입니다.

## 아이템42. 모르는 타입 값에는 any 대신 unknown을 사용하기

- 함수 반환값과 관련된 형태
- 변수 선언과 관련된 형태
- 단언문과 관련된 형태
- `unknown` 과 유사하지만 조금 다른 형태

### 함수 반환값과 관련된 unknown

```tsx
function parseYAML(yaml: string): any {
  // ...
}
interface Book {
  name: string;
  author: string;
}
const book = parseYAML(`
  name: Jane Eyre
  author: Charlotte Brontë
`);
alert(book.title); // No error, alerts "undefined" at runtime
book("read"); // No error, throws "TypeError: book is not a
// function" at runtime
```

`book` 변수는 암시적 `any` 타입이 되고, 사용되는 곳마다 타입 오류를 발생시킵니다.

`parseYAML` 이 `unknown` 을 반환하게 만드는 것이 더 안전합니다.

```tsx
function parseYAML(yaml: string): any {
  // ...
}
interface Book {
  name: string;
  author: string;
}
function safeParseYAML(yaml: string): unknown {
  return parseYAML(yaml);
}
const book = safeParseYAML(`
  name: The Tenant of Wildfell Hall
  author: Anne Brontë
`);
alert(book.title);
// ~~~~ Object is of type 'unknown'
book("read");
// ~~~~~~~~~~ Object is of type 'unknown'
```

`any` 가 강력하면서도 위험한 이유는 다음 두 가지 특징으로 부터 비롯됩니다.

- 어떠한 타입이든 `any` 타입에 할당 가능하다.
- `any` 타입은 어떠한 타입으로도 할당 가능하다. (`never` 타입 제외)

`any` 를 사용하면 타입 체커가 무용지물이 됩니다.

`unknown` 은 `any` 대신 쓸 수 있는 타입 시스템에 부합하는 타입입니다.

- 어떠한 타입이든 `unknown` 타입에 할당 가능하다.
- `unknown` 은 오직 `unknown` 과 `any` 에만 할당 가능하다.

`never` 타입은 `unknown` 과 정반대입니다.

- 어떤 타입도 `never` 에 할당할 수 없음
- 어떠한 타입으로도 할당 가능

함수의 반환 타입인 `unknown` 을 그대로 값을 사용할 수 없기 때문에 적절한 타입으로 변환하도록 강제가 필요합니다.

```tsx
function parseYAML(yaml: string): any {
  // ...
}
interface Book {
  name: string;
  author: string;
}
function safeParseYAML(yaml: string): unknown {
  return parseYAML(yaml);
}
const book = safeParseYAML(`
  name: Villette
  author: Charlotte Brontë
`) as Book;
alert(book.name);
alert(book.title);
// ~~~~~ Property 'title' does not exist on type 'Book'
book("read");
// ~~~~~~~~~ this expression is not callable
```

### 변수 선언과 관련된 unknown

어떠한 값이 있지만 그 타입을 모르는 경우에 `unknown` 을 사용합니다.

타입 단언문이 `unknown` 에서 원하는 타입으로 변환하는 유일한 방법은 아닙니다. `instanceof` 를 체크한 후 `unknown` 에서 원하는 타입으로 변활할 수 있습니다.

```tsx
function processValue(val: unknown) {
  if (val instanceof Date) {
    val; // Type is Date
  }
}
```

또한 사용자 정의 타입 가드도 `unknown` 에서 원하는 타입으로 변환할 수 있습니다.

```tsx
function isBook(val: unknown): val is Book {
  return (
    typeof val === "object" && val !== null && "name" in val && "author" in val
  );
}
function processValue(val: unknown) {
  if (isBook(val)) {
    val; // Type is Book
  }
}
```

가끔 `unknown` 대신 제네릭 매개변수가 사용되는 경우도 있습니다.

```tsx
function parseYAML(yaml: string): any {
  // ...
}
function safeParseYAML<T>(yaml: string): T {
  return parseYAML(yaml);
}
```

제네릭을 사용한 스타일은 타입 단언문과 달라 보이지만 기능적으로는 동일합니다.

제네릭보다는 `unknown` 을 반환하고 사용자가 직접 단언문을 사용하거나 원하는 대로 타입을 좁히도록 강제하는 것이 좋습니다.

### 단언문과 관련된 unknown

이중 단언문에서 `any` 대신 `unknown` 을 사용할 수도 있습니다.

```tsx
declare const foo: Foo;
let barAny = foo as any as Bar;
let barUnk = foo as unknown as Bar;
```

`barAny` 와 `barUnk` 는 기능적으로 동일하지만, 나중에 두 개의 단언문을 분리하는 리팩터링을 한다면 `unknown` 의 형태가 더 안전합니다.

### unknown과 유사하지만 조금 다른 타입들

`object` 또는 `{}` 를 사용하는 방법 역시 `unknown` 만큼 범위가 넓은 타입이지만, `unknown` 보다는 범위가 약간 좁습니다.

- `{}` 타입은 `null` 과 `undefined` 를 제외한 모든 값을 포함합니다.

```tsx
let empty: {} = "empty";
empty = 123;
empty = false;
```

- `object` 타입은 비기본형(non-primitive) 타입으로 이루어집니다.

```tsx
let empty: object = [];
empty = {};
empty = 123;
// ~~~ 'number' 형식은 'object' 형식에 할당할 수 없습니다.
empty = false;
// ~~~ 'boolean' 형식은 'object' 형식에 할당할 수 없습니다.
```

`unknown` 타입이 도입되기 전에는 `{}` 가 더 일반적으로 사용되었지만, 최근에는 `{}` 를 사용하는 경우가 꽤 드뭅니다. 정말로 `null` 과 `undefined` 가 불가능하다고 판단되는 경우에만 `unknown` 대신 `{}` 를 사용하면 됩니다.

## 아이템43. 몽키 패치보다는 안전한 타입을 사용하기

자바스크립트의 가장 유명한 특징 중 하나는, 객체와 클래스에 임의의 속성을 추가할 수 있을 만큼 유연하다는 것입니다.

내장 기능들의 프로토타입에도 속성을 추가할 수 있는데 이는 이상한 결과를 보일 때가 있습니다.

```tsx
RegExp.prototype.monkey = "Capuchin";
/123/.monkey; // Capuchin
```

타입스크립트까지 더하면 또 다른 문제가 발생합니다.

```tsx
document.monkey = "Tamarin";
// ~~~~~~ Property 'monkey' does not exist on type 'Document'
```

가장 쉬운 해결방법은 `any` 를 사용하는 것입니다.

```tsx
(document as any).monkey = "Tamarin"; // OK
```

하지만 `any` 를 사용하므로 타입 안정성을 상실합니다.

```tsx
(document as any).monky = "Tamarin"(
  // Also OK, misspelled
  document as any
).monkey = /Tamarin/; // Also OK, wrong type
```

최선의 해결책은 `document` 또는 DOM으로 부터 데이터를 분리하는 것입니다.

분리할 수 없는 경우, 두 가지 차선책이 존재합니다.

### interface의 보강(augmentation)

```tsx
interface Document {
  /** Genus or species of monkey patch */
  monkey: string;
}

document.monkey = "Tamarin"; // OK
```

보강을 사용한 방법이 `any` 보다 나은 점은 다음과 같습니다.

- 타입이 안전합니다. 타입 체커는 오타나 잘못된 타입의 할당을 오류로 표시합니다.
- 속성에 주석을 붙일 수 있습니다.
- 속성에 자동완성을 사용할 수 있습니다.
- 몽키 패치가 어떤 부분에 적용되었는지 정확한 기록이 남습니다.

그리고 모듈의 관점에서 제대로 동작하게 하려면 global 선언을 추가해야 합니다.

```tsx
declare global {
  interface Document {
    /** Genus or species of monkey patch */
    monkey: string;
  }
}
document.monkey = "Tamarin"; // OK
```

어떤 엘리먼트에는 속성이 있고 어떤 엘리먼트에는 속성이 없는 경우 문제가 되는데 이러한 이유로 속성을 `string | undefined` 로 선언할 수 있지만, 다루기에 불편해질 수 있습니다. (왜 불편한거지...?!)

(window 객체에 IE 메소드들 추가할때 사용했던 것으로 기억!)

### 더 구체적인 타입 단언문 사용

```tsx
interface MonkeyDocument extends Document {
  /** Genus or species of monkey patch */
  monkey: string;
}

(document as MonkeyDocument).monkey = "Macaque";
```
