function solution(n){
  const DAS = 12;
  
  return Math.ceil(n / DAS);
}

console.log(solution(25));
console.log(solution(178));