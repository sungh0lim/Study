function solution(arr){
  const sorted = [...arr].sort((a, b) => a - b);

  return arr.reduce((acc, value, index) => {
    if (value === sorted[index]) return acc;
    return [...acc, index + 1];
  }, []);
}

let arr=[120, 125, 152, 130, 135, 135, 143, 127, 160];
console.log(solution(arr));