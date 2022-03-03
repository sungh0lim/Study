function solution(s){
  return s.split("").reduce((prev, current) => prev + current.replace('A', '#'), '');
}

let str="BANANA";
console.log(solution(str));