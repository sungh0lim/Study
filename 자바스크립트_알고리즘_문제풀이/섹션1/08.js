function solution(arr){
  const total = arr.reduce((prev, current) => prev + current, 0);

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 1; j < arr.length - 1; j++) {
      if (total - arr[i] - arr[j] !== 100) continue;
      return arr.filter((num, index) => {
        if (index === i || index === j) return false;
        return true;
      });
    }
  }
}

let arr=[20, 7, 23, 19, 10, 15, 25, 8, 13];
console.log(solution(arr));