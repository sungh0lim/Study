function solution(s){
  const array = s.split('').map(c => c.toLowerCase());
  const reversedClone = [...array].reverse();

  return array.reduce((_, c, index) => c === reversedClone[index] ? 'YES' : 'NO', '');
}

let str="goooG";
console.log(solution(str));