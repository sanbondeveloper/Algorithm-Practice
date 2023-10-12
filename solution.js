function solution(t, p) {
  let answer = 0;
  const len = p.length;

  for (let i = 0; i <= t.length - len; i++) {
    let target = t[i];
    let count = 0;

    while (count < len - 1) {
      target += t[i + count + 1];
      count += 1;
    }

    if (+p >= +target) answer += 1;
  }

  return answer;
}

const t = "3141592";
const p = "271";

console.log(solution(t, p));
