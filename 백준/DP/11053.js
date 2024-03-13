const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
let [N, arr] = input;
N = +N;
arr = arr.split(' ').map(Number);
const dp = new Array({ length: N + 1 }, () => 0);
let answer = 0;

for (let i = 1; i <= N; i++) {
  dp[i] = 1;

  for (let j = i - 1; j >= 1; j--) {
    if (arr[i - 1] > arr[j - 1]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }

  answer = Math.max(answer, dp[i]);
}

console.log(answer);
