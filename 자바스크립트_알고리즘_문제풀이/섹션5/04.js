function solution(m, arr){
  return arr.map((_, i, array) => {
    let count = 0;
    array.slice(i).reduce((acc, v) => {
      if (acc + v <= m) {
        count++;
      }
      return acc + v;
    }, 0);
    return count;
  }).reduce((acc, v) => acc + v, 0);
}

let a=[1, 3, 1, 2, 3];
console.log(solution(5, a));