const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [M, N] = input[0].split(' ').map(Number);
const board = input.slice(1).map((row) => row.split(' ').map(Number));
const dp = Array.from({ length: M }, () => Array.from({ length: N }, () => -1));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function dfs(x, y) {
  // 목적지에 도착했을 때 + 1
  if (x === M - 1 && y === N - 1) return 1;
  // 이전에 이미 방문했다면 다시 확인할 필요없이 해당 위치에 대한 경우의 수 반환
  if (dp[x][y] !== -1) return dp[x][y];

  // 방문 표시
  dp[x][y] = 0;

  // 4방향 DFS 수행, DP가 없었다면 4^(N * N)
  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
    if (board[x][y] <= board[nx][ny]) continue;

    dp[x][y] += dfs(nx, ny);
  }

  // 1. 현재 위치의 경우의 수 반환
  // 2. 최종적으로 (0, 0)의 경우의 수를 반환
  return dp[x][y];
}

console.log(dfs(0, 0));
