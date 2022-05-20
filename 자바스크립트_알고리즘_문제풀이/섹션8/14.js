function solution(n, m) {
  const list = Array.from({ length: m }, (v, i) => n - i);
  const count = list.reduce((acc, v) => acc * v, 1);
  return count / m;
}

console.log(solution(4, 2));
