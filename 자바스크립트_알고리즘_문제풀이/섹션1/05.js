function solution(arr){         
  return arr.reduce((prev, current) => {
    if (prev === 0) return current;
    if (current < prev) return current;
    return prev;
  }, 0);
}

let arr=[5, 7, 1, 3, 2, 9, 11];
console.log(solution(arr));