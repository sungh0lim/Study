function solution(s){         
  const upperCaseArray = s.toUpperCase().split('');
  return s.split('').filter((char, index) => upperCaseArray[index] === char).length;
}

let str="KoreaTimeGood";
console.log(solution(str));