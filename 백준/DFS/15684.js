const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

/*
  N: 너비, 세로선
  M: 초기 가로선 개수
  H: 높이, 가로선
  arr: 초기 가로선
*/
const [N, M, H] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((row) => row.split(' ').map(Number));
const visited = Array.from({ length: 11 }, () =>
  Array.from({ length: 31 }, () => false)
);
let answer = 9999999;
let flag = false;

for (let i = 0; i < M; i++) {
  const [a, b] = arr[i];

  visited[b][a] = true;
}

function check() {
  for (let i = 1; i <= N; i++) {
    let cur = i;
    for (let j = 1; j <= H; j++) {
      if (visited[cur][j]) cur += 1;
      else if (visited[cur - 1][j]) cur -= 1;
    }

    if (cur !== i) return false;
  }

  return true;
}

function combination(index, count, limit) {
  // if (count >= 4) return;

  if (limit === count) {
    if (check()) {
      answer = Math.min(answer, count);
      flag = true;
    }
    return;
  }

  for (let i = index; i <= H; i++) {
    for (let j = 1; j < N; j++) {
      if (visited[j][i]) continue;
      if (visited[j - 1][i]) continue;
      if (visited[j + 1][i]) continue;

      visited[j][i] = true;
      combination(index, count + 1, limit);
      visited[j][i] = false;
    }
  }
}

for (let i = 0; i < 4; i++) {
  combination(0, 0, i);
  if (flag) break;
}

console.log(answer === 9999999 ? -1 : answer);
