function solution(s){
  const YES = 'YES';
  const NO = 'NO';
  const LEFT = '(';

  const result = s.split('').reduce((acc, char) => {
    if (!Array.isArray(acc)) return acc;
    if (char === LEFT) return [...acc, char];
    if (acc.length === 0) return NO;
    acc.pop();
    return acc;
  }, []);

  return Array.isArray(result) && result.length === 0 ? YES : NO;
}

let a="(()(()))(()";
console.log(solution(a));
let b="(())";
console.log(solution(b));
let c="((";
console.log(solution(c));