const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const dp = Array(N + 2).fill(0);

const queue = [];
for (let i = 1; i <= 9; i++) {
  queue.push(i);
  dp[i] = i;
}

if (0 <= N && N <= 10) {
  console.log(N);
  return;
}

let idx = 10;
while (idx <= N && queue.length > 0) {
  const num = queue.shift();

  const last = num % 10;
  for (let i = 0; i < last; i++) {
    queue.push(num * 10 + i);
    dp[idx++] = num * 10 + i;
  }
}

console.log(dp[N] === 0 ? -1 : dp[N]);
