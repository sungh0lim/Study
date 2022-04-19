const LEFT = '(';
const RIGHT = ')';

const deleteLeft = (array) => {
  const reversedArray = array.reverse();
  let leftIndex = 0;

  for (let i = 0; i < reversedArray.length; i++) {
    if (reversedArray[i] === LEFT) {
      leftIndex = i;
      break;
    }
  }

  return reversedArray.slice(leftIndex + 1).reverse();
}

function solution(s){  

  return s.split('').reduce((acc, c) => {
    if (c !== RIGHT) return [...acc, c];
    return deleteLeft([...acc]);
  }, []).join('');
}

let str="(A(BC)D)EF(G(H)(IJ)K)LM(N)";
console.log(solution(str));