function solution(arr){  
  const maxRow = arr
    .map(row => row.reduce((acc, num) => acc + num, 0))
    .reduce((acc, cal) => acc > cal ? acc : cal, 0);
  
  const maxColumn = new Array(arr.length)
    .fill(0)
    .map((_, index) => arr.reduce((count, row) => count + row[index], 0))
    .reduce((acc, cal) => acc > cal ? acc : cal, 0);

  const left2RightDiagonal = new Array(arr.length)
    .fill(0)
    .map((_, index) => arr[index][index])
    .reduce((acc, num) => acc + num, 0);

  const right2LeftDiagonal = new Array(arr.length)
    .fill(0)
    .map((_, index) => arr[index][arr.length - index - 1])
    .reduce((acc, num) => acc + num, 0);

  return [maxRow, maxColumn, left2RightDiagonal, right2LeftDiagonal]
    .reduce((acc, cal) => acc > cal ? acc : cal, 0);
}

let arr=[[10, 13, 10, 12, 15], 
       [12, 39, 30, 23, 11],
       [11, 25, 50, 53, 15],
       [19, 27, 29, 37, 27],
       [19, 13, 30, 13, 19]];
console.log(solution(arr));