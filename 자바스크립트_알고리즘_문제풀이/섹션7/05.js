const addHead = array => value => [value, ...array];
const deleteTail = array => [...array].slice(0, array.length - 1);
const filterWithValue = array => value => array.filter(v => v === value);
const hasValue = array => value => filterWithValue(array)(value).length > 0;

function solution(size, arr){
  return arr.reduce((acc, value) => {
    if (hasValue(acc)(value)) return addHead(acc.filter(v => v !== value))(value);
    if (acc.length === size) return deleteTail(addHead(acc)(value));
    return addHead(acc)(value);
  }, []);
}

let arr=[1, 2, 3, 2, 6, 2, 3, 5, 7];
console.log(solution(5, arr));