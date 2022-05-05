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
