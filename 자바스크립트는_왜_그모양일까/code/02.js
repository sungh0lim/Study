function deconstruct(number) {
  let sign = 1;
  let coefficient = number;
  let exponent = 0;

  if (coefficient < 0) {
    coefficient = -coefficient;
    sign = -1;
  }

  if (Number.isFinite(number) && number !== 0) {
    exponent = -1128; // Number.MIN_VALUE의 지수 값에서 유효 비트 개수, 보너스 비트 개수를 뺀 값
    let reduction = coefficient;

    while (reduction !== 0) {
      exponent += 1;
      reduction /= 2;
    }

    reduction = exponent;

    while (reduction > 0) {
      coefficient /= 2;
      reduction += 1;
    }
  }

  // number = sign * coefficient * 2 ** exponent;

  return {
    sign, // 부호
    coefficient, // 정수 계수
    exponent,
    number,
  };
}

console.log(deconstruct(Number.MAX_SAFE_INTEGER));
console.log(deconstruct(1));
