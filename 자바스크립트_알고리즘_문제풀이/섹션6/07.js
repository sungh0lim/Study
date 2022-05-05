const YES = 'YES';
const NO = 'NO';

function solution(need, plan){
  const needs = need.split('');
  let checkIndex = 0;

  const count = plan.split('').reduce((acc, value) => {
    if (value === needs[checkIndex]) {
      checkIndex++;
      return acc++;
    }
    return acc;
  }, 0);

  return count === 0 ? YES : NO;
}

let a="CBA";
let b="CBDAGE";
console.log(solution(a, b));