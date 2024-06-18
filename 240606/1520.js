// [1520/내리막 길](https://www.acmicpc.net/problem/1520)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [M, N] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((row) => row.split(' ').map(Number));
const dp = Array.from({ length: M }, () => Array.from({ length: N }, () => -1));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function dfs(x, y) {
  if (x === M - 1 && y === N - 1) return 1;
  if (dp[x][y] !== -1) return dp[x][y];

  dp[x][y] = 0;

  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
    if (arr[x][y] <= arr[nx][ny]) continue;

    dp[x][y] += dfs(nx, ny);
  }

  return dp[x][y];
}

console.log(dfs(0, 0));
