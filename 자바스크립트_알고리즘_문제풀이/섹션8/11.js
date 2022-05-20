function solution(n) {
  const list = Array.from({ length: n }, (v, i) => i + 1);
  return list.reduce((acc, v) => acc * v, 1);
}

console.log(solution(5));
