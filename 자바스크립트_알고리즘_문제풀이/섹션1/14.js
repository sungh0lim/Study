function solution(s){  
  return s.reduce((prev, current) => {
    if (prev.length < current.length) return current;
    return prev;
  }, '');
}
let str=["teacher", "time", "student", "beautiful", "good"];
console.log(solution(str));