function solution(k, arr){
  return arr
    .slice(0, arr.length - k + 1)
    .map((v, i) => v + arr[i + 1] + arr[i + 2])
    .reduce((max, v) => max > v ? max : v, 0);
}

let a=[12, 15, 11, 20, 25, 10, 20, 19, 13, 15];
console.log(solution(3, a));