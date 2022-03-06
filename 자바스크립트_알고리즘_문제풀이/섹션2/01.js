function solution(arr){         
  return arr.reduce((acc, current, index, self) => {
    if (index === 0) return [...acc, current];

    if (current > self[index - 1]) return [...acc, current];
    return acc;
  }, []);
}

let arr=[7, 3, 9, 5, 6, 12];
console.log(solution(arr));