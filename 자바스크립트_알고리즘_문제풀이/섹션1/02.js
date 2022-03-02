function solution(a, b, c){
  const total = a + b + c;
  if (a > b && a > c && total > 2 * a) return "YES";
  if (b > a && b > c && total > 2 * b) return "YES";
  if (c > a && c > b && total > 2 * c) return "YES";
  return "NO";
}

console.log(solution(6, 7, 11));
console.log(solution(13, 33, 17));