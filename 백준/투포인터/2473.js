const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = input[1].split(' ').map(Number);

arr.sort((a, b) => a - b);

let min = 3000000000n;
let answer;
let flag = false;

const abs = (n) => (n === -0 || n < 0n ? -n : n);

for (let k = 0; k < N - 2; k++) {
  let left = k + 1;
  let right = N - 1;

  while (left < right) {
    const target = BigInt(arr[k] + arr[left] + arr[right]);

    if (min > abs(target)) {
      answer = [arr[k], arr[left], arr[right]];
      min = abs(target);
    }

    if (target > 0) {
      right -= 1;
    } else if (target < 0) {
      left += 1;
    } else {
      flag = true;
      break;
    }
  }

  if (flag) break;
}

console.log(answer.sort((a, b) => a - b).join(' '));
