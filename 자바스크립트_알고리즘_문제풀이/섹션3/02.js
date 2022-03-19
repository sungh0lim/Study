function solution(s){
  s=s.toLowerCase().replace(/[^a-z]/g, '');
  const array = s.split('').map(c => c.toLowerCase());
  const reversedClone = [...array].reverse();

  return array.reduce((_, c, index) => c === reversedClone[index] ? 'YES' : 'NO', '');
}

let str="found7, time: study; Yduts; emit, 7Dnuof";
console.log(solution(str));