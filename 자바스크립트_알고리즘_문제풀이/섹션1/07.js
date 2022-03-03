function solution(day, arr){
  return arr.filter(carNum => carNum % 10 === day).length;
}

arr=[25, 23, 11, 47, 53, 17, 33];
console.log(solution(3, arr));