function solution(test){
  const result = {};
  for (var i = 0; i < test.length; i++) {
    const exam = test[i];
    console.log('exam: ', exam);
    for (var j = 0; j < exam.length; j++) {
      result[exam[j]] = [...(result[exam[j]] ?? []), j + 1];
    }
  }
  console.log(result);

  const people = Object.keys(result);
  for (var i = 1; i <= people.length; i++) {
    const myScoreList = people[i];
    for (var j = 0; j <= myScoreList.length; j++) {
      const myScore = myScoreList[j];
      for (var k = 1; k <= people.length; k++) {
        // const yourScore = 
      }
    }
  }
}

let arr=[[3, 4, 1, 2], [4, 3, 2, 1], [3, 1, 4, 2]];
console.log(solution(arr));