const useCouponAll = (tupleArray) => tupleArray.map((tuple) => [tuple[0] / 2, tuple[1]]);
const deleteCouponAll = (tupleArray) => tupleArray.map((tuple) => [tuple[0] * 2, tuple[1]]);
const useCoupon = (tupleArray) => tupleArray.map((tuple, index) => index === 0 ? [tuple[0]/2, tuple[1]] : tuple);
const sumAll =  (tupleArray) => tupleArray.reduce((acc ,tuple) => acc + tuple[0] + tuple[1], 0);

function solution(m, product){
  const sortedByAll = deleteCouponAll(useCouponAll(product).sort((a, b) => (a[0] + a[1]) - (b[0] + b[1])).reverse());

  for (let i = 0; i < product.length; i++) {
    const price = sumAll(useCoupon(sortedByAll.slice(i, product.length)));
    if (price <= m) return product.length - i;
  }

  return 0;
}

let arr=[[6, 6], [2, 2], [4, 3], [4, 5], [10, 3]];
console.log(solution(28, arr));