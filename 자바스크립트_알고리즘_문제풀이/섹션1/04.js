function solution(n){
  if (n === 0) return 0;
  return n + solution(n-1);
}

console.log(solution(6));
console.log(solution(10));