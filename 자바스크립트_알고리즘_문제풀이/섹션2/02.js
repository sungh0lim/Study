function solution(arr){         
  return arr.reduce((acc, current) => {
    if (acc.length === 0) return [current];

    if (acc[acc.length - 1] < current) return [...acc, current];
    return acc;
  }, []).length;
}

let arr=[130, 135, 148, 140, 145, 150, 150, 153];
console.log(solution(arr));