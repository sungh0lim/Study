function solution(s){
  return s.split('').map(char => {
    if (char === char.toUpperCase()) return char.toLowerCase();
    return char.toUpperCase();
  }).join('');
}

console.log(solution("StuDY"));