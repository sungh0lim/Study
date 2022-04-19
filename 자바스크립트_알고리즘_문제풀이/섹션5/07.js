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

const checkSameObj = (obj1, obj2) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  let result = true;

  Object.keys(obj1).forEach(key => {
    if (obj1[key] !== obj2[key]) result = false;
  });
  
  return result;
}

function solution(str1, str2){
  const mapStr1 = countCharMap(str1);
  const mapStr2 = countCharMap(str2);

  return checkSameObj(mapStr1, mapStr2) ? 'YES' : 'NO';
}

let a="AbaAeCe";
let b="baeeACA";
console.log(solution(a, b));

let c="abaCC";
let d="Caaab";
console.log(solution(c, d));
