let n = 1; // n의 타입을 number로 판단
let b = true; // b의 타입을 boolean으로 판단
let s = "hello"; // s의 타입을 string으로 판단
let o = {}; // o의 타입을 object로 판단

let o2: object = { name: "Jack", age: 32 };
o2 = { first: 1, second: 2 };

interface IPerson2 {
  name: string; // 필수 속성
  age: number; // 필수 속성
  etc?: boolean; // 선택 속성
}

let ai: {
  name: string;
  age: number;
  etc?: boolean;
} = { name: "Jack", age: 32 };

class A {
  static initValue = 1;
}

let initVal = A.initValue; // 1

let person: object = { name: "Jack", age: 32 };
person.name;
(<{ name: string }>person).name;
