function solution(s, t){
  return s.split("").filter(char => char === t).length;
}

let str="COMPUTERPROGRAMMING";
console.log(solution(str, 'R'));