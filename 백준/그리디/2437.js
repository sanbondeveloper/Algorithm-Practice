const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = input[1].split(' ').map(Number);

arr.sort((a, b) => a - b);

let sum = 1;

for (let i = 0; i < N; i++) {
  if (sum < arr[i]) break;

  sum += arr[i];
}

console.log(sum);
