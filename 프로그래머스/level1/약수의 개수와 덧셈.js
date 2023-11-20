function check(num) {
  let count = 0;

  for (let i = 1; i <= num; i++) {
    if (num % i === 0) count += 1;
  }

  return count % 2 === 0;
}

function solution(left, right) {
  let answer = 0;

  for (let n = left; n <= right; n++) {
    if (check(n)) answer += n;
    else answer -= n;
  }

  return answer;
}
