function solution(test){
  let mentoCount = 0;
  const peopleCount = test[0]?.length ?? 0;

  for (let i = 1; i <= peopleCount; i++) {
    for (let j = 1; j <= peopleCount; j++) {
      let count = 0;

      for (let k = 0; k < test.length; k++) {
        let pi = 0;
        let pj = 0;

        for (let l = 0; l < peopleCount; l++) {
          if (test[k][l] === i) pi = l;
          if (test[k][l] === j) pj = l;
        }

        if (pi < pj) count++;
      }
      
      if (count === test.length) mentoCount++;
    }
  }

  return mentoCount;
}

let arr=[[3, 4, 1, 2], [4, 3, 2, 1], [3, 1, 4, 2]];
console.log(solution(arr));