let printMe: (string, number) => void = function (
  name: string,
  age: number
): void {};

type stringNumberFunc = (string, number) => void;
let f: stringNumberFunc = function (a: string, b: number): void {};

interface INameable {
  name?: string;
}

function getName(o: INameable) {
  return o.name;
}

// let n = getName(undefined);
// 'undefined' 형식의 인수는 'INameable' 형식의 매개 변수에 할당될 수 없습니다.

function fn(arg1: string, arg2?: number): void {}

// Refused to evaluate a string as JavaScript
// let add = new Function("a", "b", "return a + b");
// let result = add(1, 2);
// console.log(result);

// function add(a, b) {
//   return a + b;
// }

let add = function (a, b) {
  return a + b;
};

let f2 = function (a, b) {
  return a + b;
};
