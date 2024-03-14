const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const [str, ...arr] = input;

const [N, M] = str.split(' ').map(Number);
const stones = arr.map(Number);
const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: Math.ceil((2 * N) ** 0.5) + 2 }, () => Infinity)
);

dp[1][0] = 0;

for (let i = 2; i <= N; i++) {
  if (stones.includes(i)) continue;
  for (let j = 1; j < Math.ceil((2 * i) ** 0.5) + 1; j++) {
    if (i < j) break;
    dp[i][j] = Math.min(dp[i - j][j - 1], dp[i - j][j], dp[i - j][j + 1]) + 1;
  }
}

const answer = Math.min(...dp[N]);

console.log(answer === Infinity ? -1 : answer);
