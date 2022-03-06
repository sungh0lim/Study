function solution(a, b){         
  return a.map((value, index) => {
    if (b[index] === value) return 'D';
    if (value === 1 && b[index] === 3) return 'A';
    if (value === 2 && b[index] === 1) return 'A';
    if (value === 3 && b[index] === 2) return 'A';
    return 'B'
  });
}

let a=[2, 3, 3, 1, 3];
let b=[1, 1, 2, 2, 3];
console.log(solution(a, b));