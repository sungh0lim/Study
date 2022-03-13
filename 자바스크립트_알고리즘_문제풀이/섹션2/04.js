function solution(arr){         
  return arr.reduce((acc, num, index) => {
    if (index === 0 || num === 0) {
      acc.push(num);
      return acc;
    }
    if (acc[index - 1] !== 0) {
      acc.push(acc[index - 1] + 1);
      return acc;
    }
    acc.push(num);
    return acc;
  }, []).reduce((acc, num) => acc + num, 0);
}

let arr=[1, 0, 1, 1, 1, 0, 0, 1, 1, 0];
console.log(solution(arr));