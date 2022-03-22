function solution(s){
  const { list } = s.split('').reduce(({ current, count, list }, value) => {
    if (!current) return { current: value, count,  list: [value] };
    if (current === value) return { current: value, count: count + 1, list };
    return { current: value, count: 1, list: [...list, count, value] };
  }, {
    current: undefined,
    count: 1,
    list: []
  });

  return list.join('');
}

let str="KKHSSSSSSSE";
console.log(solution(str));