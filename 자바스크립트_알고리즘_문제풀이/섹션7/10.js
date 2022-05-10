function solution(target, arr){
  const sorted = arr.sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] === target) return i + 1;
  }
}

let arr=[23, 87, 65, 12, 57, 32, 99, 81];
console.log(solution(32, arr));