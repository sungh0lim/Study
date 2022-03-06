function solution(s){  
  const sArray = s.split('');
  const center = Math.floor(sArray.length / 2);
  if (sArray.length % 2 === 0) return sArray[center - 1] + sArray[center];
  return sArray[center];
}
console.log(solution("study"));
console.log(solution("good"));