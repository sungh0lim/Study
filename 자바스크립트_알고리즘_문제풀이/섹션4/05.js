function solution(_, k, card){
  const all = [];
  for (let i = 0; i < card.length; i++) {
    for (let j = i + 1; j < card.length; j++) {
      for (let k = j + 1; k < card.length; k++) {
        all.push(card[i] + card[j] + card[k]);
      }
    }
  }
  return all.sort((a, b) => b - a)[k];
}

let arr=[13, 15, 34, 23, 45, 65, 33, 11, 26, 42];
console.log(solution(10, 3, arr));