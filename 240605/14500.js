// [14500/테트로미노](https://www.acmicpc.net/problem/14500)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((row) => row.split(' ').map(Number));
let answer = 0;
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function dfs(x, y, cnt, sum) {
  if (cnt === 4) {
    answer = Math.max(answer, sum);
    return;
  }

  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (visited[nx][ny]) continue;

    if (cnt === 2) {
      visited[nx][ny] = true;
      dfs(x, y, cnt + 1, sum + arr[nx][ny]);
      visited[nx][ny] = false;
    }

    visited[nx][ny] = true;
    dfs(nx, ny, cnt + 1, sum + arr[nx][ny]);
    visited[nx][ny] = false;
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    visited[i][j] = true;
    dfs(i, j, 1, arr[i][j]);
    visited[i][j] = false;
  }
}

console.log(answer);
