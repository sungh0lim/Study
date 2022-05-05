function solution(s){
  const result = s.split('').reduce(({ stack, count }, current, index, array) => {
    if (current === '(') return { stack: [...stack, current], count };
    stack.pop();
    if (array[index - 1] === '(') return { stack, count: count + stack.length };
    return { stack, count: count + 1 };
  }, {
    stack: [],
    count: 0
  });

  return result.count;
}

let a="()(((()())(())()))(())";
console.log(solution(a));
let b="(((()(()()))(())()))(()())";
console.log(solution(b));