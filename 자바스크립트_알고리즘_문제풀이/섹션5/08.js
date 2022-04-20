const countCharMap = (str) => {
  return str.split('').reduce((acc, char) => {
    if (!acc[char]) {
      acc[char] = 1;
    } else {
      acc[char] += 1;
    }
    return acc;
  }, {});
}

const countAnagram = (object1, object2) => {
  return Object.keys(object1).reduce((acc, key) => {
    const count = Math.floor(object2[key] / object1[key]);

    if (acc === -1) return count;
    if (acc > count) return count;
    return acc;
  }, -1);
}

function solution(s, t){
  const fullMap = countCharMap(s);
  const compareMap = countCharMap(t);

  return countAnagram(compareMap, fullMap);
}

let a="bacaAacba";
let b="abc";
console.log(solution(a, b));