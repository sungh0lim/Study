function solution(s){  
  return s.split('').reduce((prevArray, currentValue) => {
    const count = prevArray.filter(prev => prev === currentValue).length;
    if (count !== 0) return prevArray;
    return [...prevArray, currentValue];
  }, []).join('');
}
console.log(solution("ksekkset"));