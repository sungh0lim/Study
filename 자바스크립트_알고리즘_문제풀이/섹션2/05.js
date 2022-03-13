function solution(arr){  
  return arr
    .map((score, index) => ({ score, num: index + 1 }))
    .sort((a, b) => b.score - a.score)
    .map(({ num }) => num);
}

let arr=[87, 89, 92, 100, 76];
console.log(solution(arr));