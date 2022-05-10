function solution(meeting){
  const sorted = meeting.sort((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]);

  let count = 0;
  let acc = 0;
  sorted.forEach(([start, end]) => {
    if (start >= acc) {
      count++;
      acc = end;
    }
  });
  
  return count;
}

let arr=[[1, 4], [2, 3], [3, 5], [4, 6], [5, 7]];
console.log(solution(arr));