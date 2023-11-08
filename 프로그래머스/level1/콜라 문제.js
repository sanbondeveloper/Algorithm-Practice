function solution(a, b, n) {
  let answer = 0;

  while (n >= a) {
    const count = Math.floor(n / a);
    n -= a * count;
    n += b * count;
    answer += b * count;
  }

  return answer;
}
