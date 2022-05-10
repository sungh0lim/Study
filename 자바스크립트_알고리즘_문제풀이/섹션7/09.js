const getMax = (array) => array.reduce((acc, value) => acc > value ? acc : value, 0);

function solution(times){
  const timeLine = new Array(72).fill(0);
  const count = times.reduce((acc, [start, end]) => {
    for(let i = start; i < end; i++) {
      acc[i] = acc[i] + 1;
    }
    return acc;
  }, timeLine);

  return getMax(count);
}

let arr=[[14, 18], [12, 15], [15, 20], [20, 30], [5, 14]];
console.log(solution(arr));