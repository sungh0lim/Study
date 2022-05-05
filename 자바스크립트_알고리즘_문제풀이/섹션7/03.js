function solution(arr){
  const result = arr.reduce(({ positive, negative }, value) => {
    return {
      positive: [...positive, ...(value > 0 ? [value] : [])],
      negative: [...negative, ...(value < 0 ? [value] : [])]
    }
  }, {
    positive: [],
    negative: []
  });

  const { positive, negative } = result;
  return [...negative, ...positive];
}

let arr=[1, 2, 3, -3, -2, 5, 6, -6];
console.log(solution(arr));