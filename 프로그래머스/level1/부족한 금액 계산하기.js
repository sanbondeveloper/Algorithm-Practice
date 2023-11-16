function solution(price, money, count) {
  let sum = 0;

  for (let i = 1; i <= count; i++) {
    sum += price * i;
  }

  const answer = sum - money;

  return answer < 0 ? 0 : answer;
}
