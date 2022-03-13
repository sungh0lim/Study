function solution(arr){  
  return arr
    .flat()
    .reduce((count, height, index, array) => {
      const upIndex = index - 5 < 0 ? -1: index - 5;
      const rightIndex = index % 5 === 4 ? -1 : index + 1;
      const downIndex = index + 5 > array.length - 1 ? -1 : index + 5;
      const leftIndex = index % 5 === 0 ? -1 : index - 1;

      const upVal = upIndex === -1 ? 0 : array[upIndex];
      const rightVal = rightIndex === -1 ? 0 : array[rightIndex];
      const downVal = downIndex === -1 ? 0 : array[downIndex];
      const leftVal = leftIndex === -1 ? 0 : array[leftIndex];

      const isVally = [upVal, rightVal, downVal, leftVal].filter((val) => height < val).length === 0;
      return isVally ? count + 1 : count;
    }, 0);
}

let arr=[[5, 3, 7, 2, 3], 
       [3, 7, 1, 6, 1],
       [7, 2, 5, 3, 4],
       [4, 3, 6, 4, 1],
       [8, 7, 3, 5, 2]];
console.log(solution(arr));