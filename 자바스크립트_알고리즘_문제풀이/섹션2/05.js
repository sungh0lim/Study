function solution(arr) {
  return arr
    .map((score, index) => ({ score, num: index + 1 }))
    .sort((a, b) => b.score - a.score)
    .map(({ num }) => num);
}

let arr = [87, 89, 92, 100, 76];
console.log(solution(arr));

function solution(arr) {
  let n = arr.length;
  let answer = Array.from({ length: n }, () => 1);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[j] > arr[i]) answer[i]++;
    }
  }
  return answer;
}

let arr = [87, 89, 92, 100, 76];
console.log(solution(arr));
