// [2293/동전 1](https://www.acmicpc.net/problem/2293)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(Number);
const dp = Array(K + 1).fill(0);

dp[0] = 1;

// [1, 2, 5]
for (let i = 0; i < N; i++) {
  for (let j = arr[i]; j <= K; j++) {
    dp[j] += dp[j - arr[i]];
  }
}

console.log(dp[K]);
