function solution(arr1, arr2){
  return [...arr1, ...arr2].sort((a, b) => a - b).reduce((acc, current, index, array) => {
    if (index === 0) return acc;
    if (array[index - 1] === current && acc[acc.length] !== current) return [...acc, current];
    return acc;
  }, []);

}

let a=[1, 3, 9, 5, 2];
let b=[3, 2, 5, 7, 8];
console.log(solution(a, b));