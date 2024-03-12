const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const N = +input[0];
const arr = Array.from({ length: N + 1 }, () => 0);
arr[1] = 1;
arr[2] = 2;

for (let i = 3; i <= N; i++) {
  arr[i] = (arr[i - 1] + arr[i - 2]) % 15746;
}

console.log(arr[N]);
