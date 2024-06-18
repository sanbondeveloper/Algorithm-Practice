const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [H, W] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
let answer = 0;

for (let i = 1; i < W - 1; i++) {
  const left = Math.max(...arr.slice(0, i));
  const right = Math.max(...arr.slice(i + 1));

  const target = arr[i];
  const min = Math.min(left, right);

  if (target < min) {
    answer += min - target;
  }
}

console.log(answer);
