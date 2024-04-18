const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

let left = Math.max(...arr);
let right = arr.reduce((acc, cur) => acc + cur, 0);

while (left < right) {
  let mid = Math.floor((left + right) / 2);
  let cnt = 0;
  let sum = 0;

  for (let i = 0; i < N; i++) {
    if (sum + arr[i] > mid) {
      sum = 0;
      cnt += 1;
    }

    sum += arr[i];
  }

  if (sum !== 0) cnt += 1;

  if (cnt <= M) {
    right = mid;
  } else {
    left = mid + 1;
  }
}

console.log(right);
