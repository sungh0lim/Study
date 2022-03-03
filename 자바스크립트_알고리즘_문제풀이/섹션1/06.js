function solution(arr) {
  return [
    arr.filter(num => num % 2 !== 0).reduce((prev, current) => prev + current, 0), 
    arr.filter(num => num % 2 !== 0).reduce((prev, current) => {
      if (prev === 0 || prev > current) return current;
      return prev;
    }, 0)
  ];
}

arr=[12, 77, 38, 41, 53, 92, 85];
console.log(solution(arr));