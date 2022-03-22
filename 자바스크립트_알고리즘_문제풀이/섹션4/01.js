function sum (num) {
  return parseInt(String(num).split('').reduce((acc, v) => acc + parseInt(v), 0));
}

function solution(n, arr){
  return arr.reduce((max, value) => {
    const acc = sum(max);
    const current = sum(value);

    if (acc === current) return max > value ? max : value;
    if (acc > current) return max;
    return value;
  }, 0);
}

let arr=[128, 460, 603, 40, 521, 137, 123];
console.log(solution(7, arr));