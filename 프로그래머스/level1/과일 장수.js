function solution(k, m, scores) {
  let answer = 0;
  scores.sort((a, b) => b - a);

  let min = 100;
  let cnt = 0;
  for (const score of scores) {
    min = Math.min(score, min);
    cnt += 1;

    if (cnt === m) {
      answer += min * m;
      cnt = 0;
    }
  }

  return answer;
}

const k = 4;
const m = 3;
const scores = [4, 1, 2, 2, 4, 4, 4, 4, 1, 2, 4, 2];

console.log(solution(k, m, scores));
