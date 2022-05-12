function solution(n) {
  const recursion = (n) => {
    console.log(n);
    n > 1 && recursion(n - 1);
  };

  recursion(n);
}

solution(3);
