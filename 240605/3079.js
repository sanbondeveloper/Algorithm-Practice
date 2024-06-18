// [3079/입국심사](https://www.acmicpc.net/problem/3079)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(Number);

arr.sort((a, b) => a - b);

let left = 1;
let right = arr[0] * M;
let answer = 0;

while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  let sum = 0;

  for (let i = 0; i < N; i++) {
    sum += Math.floor(mid / arr[i]);
  }

  if (sum >= M) {
    if (answer > mid || answer === 0) {
      answer = mid;
    }
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log(answer);

console.log(1000000000 * 100000);
