function solution(arr){
  for (let i = 1; i < arr.length; i++) {
    let cur = arr[i];
    let left = i - 1;
    while (left >= 0 && arr[left] > cur) {
      arr[left + 1] = arr[left];
      arr[left] = cur;
      cur = arr[left];
      left--;
    }
  }
  return arr;
}

let arr=[11, 7, 5, 6, 10, 9];
console.log(solution(arr));