// [12865/평범한 배낭](https://www.acmicpc.net/problem/12865)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const arr = [
  [0, 0],
  ...input.slice(1).map((row) => row.split(' ').map(Number)),
];
const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: K + 1 }, () => 0)
);

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= K; j++) {
    const [w, v] = arr[i];

    if (j < w) {
      dp[i][j] = dp[i - 1][j];
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w] + v);
    }
  }
}

console.log(dp[N][K]);
