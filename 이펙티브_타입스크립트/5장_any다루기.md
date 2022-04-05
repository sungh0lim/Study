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
