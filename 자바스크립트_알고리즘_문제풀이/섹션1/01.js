function solution(a, b, c){
  if (a < b && a < c) return a;
  if (b < a && b < c) return b;
  return c;
}

console.log(solution(11, 5, 7));