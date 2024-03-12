const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const T = +input[0];
let index = 1;
let count = 0;
const answer = [];

while (true) {
  if (count === T) break;

  const N = +input[index];
  const coins = input[index + 1].split(' ').map(Number);
  const M = +input[index + 2];
  const dp = Array.from({ length: M + 1 }, () => 0);
  dp[0] = 1;

  for (let i = 0; i < N; i++) {
    for (let j = coins[i]; j <= M; j++) {
      dp[j] += dp[j - coins[i]];
    }
  }

  answer.push(dp[M]);
  index += 3;
  count += 1;
}

console.log(answer.join('\n'));
