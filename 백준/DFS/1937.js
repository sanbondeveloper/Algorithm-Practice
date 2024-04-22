const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const board = input.slice(1).map((row) => row.split(' ').map(Number));
const dp = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    answer = Math.max(answer, dfs(i, j));
  }
}

console.log(answer);

function dfs(x, y) {
  if (dp[x][y] !== 0) return dp[x][y];

  dp[x][y] = 1;

  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
    if (board[x][y] >= board[nx][ny]) continue;

    dp[x][y] = Math.max(dp[x][y], dfs(nx, ny) + 1);
  }

  return dp[x][y];
}
