const exceptNum = (num) => (array) => {
  return [
    ...[...array].slice(num, array.length),
    ...[...array].slice(0, num - 1)
  ];
}

const except3 = exceptNum(3);

function solution(n, k){
  const princes = new Array(n).fill(0).map((_, index) => ({
    id: index + 1
  }));

  let result = [...princes];

  for (let i = 0; i < princes.length; i++) {
    result = except3(princes);
  }

  return result[k % result.length].id;
}

console.log(solution(8, 3));