function solution(s){  
  return s.reduce((prevArray, currentValue) => {
    const count = prevArray.filter(prev => prev === currentValue).length;
    if (count !== 0) return prevArray;
    return [...prevArray, currentValue];
  }, []);
}
let str=["good", "time", "good", "time", "student"];
console.log(solution(str));