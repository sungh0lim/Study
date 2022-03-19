function solution(str){
  return parseInt(str.toLowerCase().replace(/[a-z]/g, ''));
}

let str="g0en2T0s8eSoft";
console.log(solution(str));