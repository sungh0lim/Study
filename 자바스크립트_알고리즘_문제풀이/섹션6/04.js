const isNum = (char) => /[0-9]/g.test(char);
const calculator = (operator) => ([left, right]) => {
  if (operator === '+') return right + left;
  if (operator === '-') return right - left;
  if (operator === '*') return right * left;
  if (operator === '/') return Math.floor(right / left);
  return 0;
}

function solution(s){
  return s.split('').reduce((acc, v) => {
    const value = isNum(v) ? Number(v) : calculator(v)([acc.pop(), acc.pop()]);
    acc.push(value);
    return acc;
  }, [])[0];
}

let str="352+*9-";
console.log(solution(str));