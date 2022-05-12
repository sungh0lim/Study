const count = (sortedStable) => (volumn) => {
  const { count } = sortedStable.reduce(
    ({ count, now }, v) => {
      if (now === 0) return { count: count + 1, now: v };

      if (v - now >= volumn) {
        return {
          count: count + 1,
          now: v,
        };
      }

      return {
        count,
        now,
      };
    },
    {
      count: 0,
      now: 0,
    }
  );

  return count;
};

function solution(c, stable) {
  const sorted = stable.sort((a, b) => a - b);
  const min = 1;
  const max = sorted[sorted.length - 1];

  const mid = (min + max) / 2;
  const countStable = count(sorted);

  for (let i = mid; i >= min; i--) {
    if (countStable(i) === c) return i;
  }
}

let arr = [1, 2, 8, 4, 9];
console.log(solution(3, arr));
