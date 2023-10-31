const getDivisor = (target) => {
  let result = 0;

  for (let i = 1; i <= Math.sqrt(target); i++) {
    if (target % i === 0) {
      result += 1;

      if (i !== target / i) result += 1;
    }
  }

  return result;
};

function solution(number, limit, power) {
  let answer = 0;

  for (let i = 1; i <= number; i++) {
    const count = getDivisor(i);

    answer += limit < count ? power : count;
  }

  return answer;
}

const number = 10;
const limit = 3;
const power = 2;

// console.log(getDivisor(9));

console.log(solution(number, limit, power));
