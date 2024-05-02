const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1).map((row) => row.split(''));
const dp = Array.from({ length: N }, () => Array.from({ length: M }, () => -1));
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);
let flag = false;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 'H') board[i][j] = 0;
    else board[i][j] = +board[i][j];
  }
}

function dfs(x, y) {
  if (x < 0 || y < 0 || x >= N || y >= M || board[x][y] === 0) return 0;

  if (visited[x][y]) {
    flag = true;
    return;
  }
  if (dp[x][y] !== -1) return dp[x][y];

  visited[x][y] = true;
  dp[x][y] = 0;
  for (let k = 0; k < 4; k++) {
    const nx = x + board[x][y] * dir[k][0];
    const ny = y + board[x][y] * dir[k][1];

    dp[x][y] = Math.max(dp[x][y], dfs(nx, ny) + 1);
  }
  visited[x][y] = false;

  if (flag) return -1;

  return dp[x][y];
}

const answer = dfs(0, 0);
console.log(answer);
