function solution(s, t){
  const MAX = 100;

  const charIndexes = s.split('').reduce((acc, c, i) => {
    if (c === t) return [...acc, i];
    return acc;
  }, []);

  return s.split('').map((c, i) => {
    return charIndexes.reduce((acc, v) =>  {
      if (c === t || acc === 0) return 0;
      const diff = v > i ? v - i : i - v;
      return acc > diff ? diff : acc;
    }, MAX);
  });
}

let str="teachermode";
console.log(solution(str, 'e'));