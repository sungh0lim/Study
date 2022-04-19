function solution(s){  
 const studentsMap = {};
 
 s.split('').forEach(student => {
  if (!studentsMap[student]) {
    studentsMap[student] = 1;
  } else {
    studentsMap[student] = studentsMap[student] + 1;
  }
 });

 return Object.keys(studentsMap).reduce((acc, key) => {
  if (acc === '') return key;
  if (studentsMap[acc] > studentsMap[key]) return acc;
  return key;
 }, '');
}

let str="BACBACCACCBDEDE";
console.log(solution(str));