const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = input[1].split(' ').map(Number);
const answer = [0, 0];

arr.sort((a, b) => a - b);

let start = 0;
let end = arr.length - 1;
let min = Infinity;

while (start < end) {
  let target = arr[start] + arr[end];

  if (min > Math.abs(target)) {
    min = Math.abs(target);
    answer[0] = arr[start];
    answer[1] = arr[end];

    if (target === 0) break;
  }

  if (target < 0) start += 1;
  else end -= 1;
}

console.log(answer.join(' '));
