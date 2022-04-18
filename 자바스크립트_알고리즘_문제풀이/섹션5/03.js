function solution(m, arr){
  return arr.map((_, i, array) => array
  .slice(i)
  .reduce((acc, num) => {
    if (acc === m || acc + num === m) return m;
    return acc + num;
  }, 0))
    .filter(result => result === m)
    .length;
}

let a=[1, 2, 1, 3, 1, 1, 1, 2];
console.log(solution(6, a));