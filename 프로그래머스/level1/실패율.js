function solution(N, stages) {
  const answer = [];
  const n = stages.length;
  let pos = 0;
  stages.sort((a, b) => a - b);

  for (let i = 1; i <= N; i++) {
    let cur = 0;

    while (true) {
      if (stages[pos] !== i) {
        break;
      }

      pos += 1;
      cur += 1;
    }

    const reach = n - (pos - cur);

    if (reach === 0 || cur === 0) answer.push([i, 0]);
    else answer.push([i, cur / reach]);
  }

  return answer.sort((a, b) => b[1] - a[1]).map((v) => v[0]);
}
