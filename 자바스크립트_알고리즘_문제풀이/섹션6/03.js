function solution(board, moves){
  const machine = [
    [],
    [],
    [],
    [],
    []
  ];

  [...board].reverse().forEach((row) => {
    row.forEach((v, j) => {
      if (v === 0) return;
      machine[j].push(v);
    });
  });

  const basket = [];
  return moves.reduce((acc, move) => {
    const get = machine[move - 1].pop() ?? 0;

    if (get === 0) return acc;

    if (get === basket[basket.length - 1]) {
      basket.pop();
      return acc + 2;
    }

    basket.push(get);
    return acc;
  }, 0);
}

let a=[[0,0,0,0,0],
     [0,0,1,0,3],
     [0,2,5,0,1],
     [4,2,4,4,2],
     [3,5,1,3,1]];

let b=[1, 5, 3, 5, 1, 2, 1, 4];

console.log(solution(a, b));