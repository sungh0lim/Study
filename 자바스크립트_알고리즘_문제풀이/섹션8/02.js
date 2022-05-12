function solution(n) {
  let result = "";

  const getBinary = (n) => {
    if (n === 0) return;
    getBinary(parseInt(n / 2));
    result = result + (n % 2);
  };

  getBinary(n);
  return result;
}

console.log(solution(11));
