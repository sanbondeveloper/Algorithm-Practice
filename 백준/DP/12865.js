const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const [str, ...arr] = input;
const [N, K] = str.split(' ').map(Number);
const items = arr.map((row) => row.split(' ').map(Number));
const dp = Array.from({ length: K + 1 }, () =>
  Array.from({ length: N + 1 }, () => 0)
);

for (let i = 1; i <= K; i++) {
  for (let j = 1; j <= N; j++) {
    const [w, v] = items[j - 1];

    if (i - w < 0) {
      dp[i][j] = dp[i][j - 1];
    } else {
      dp[i][j] = Math.max(dp[i - w][j - 1] + v, dp[i][j - 1]);
    }
  }
}

console.log(dp[K][N]);

/*
 냅색 알고리즘
*/
