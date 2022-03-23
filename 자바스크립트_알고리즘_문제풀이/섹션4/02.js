function reverse(s) {
  return parseInt(String(s).split('').reverse().join(''));
}

function isPrime(num) {
  if (num === 1) return false;
  for (var i = 2; i < num; i++) {
    if (num % i === 0) return false; 
  }
  return true;
}

function solution(arr){
  return arr.reduce((acc, value) => {
    const reversed = reverse(value);
    if (isPrime(reversed)) return [...acc, reversed];
    return acc;
  }, [])
}

let arr=[32, 55, 62, 20, 250, 370, 200, 30, 100];
console.log(solution(arr));