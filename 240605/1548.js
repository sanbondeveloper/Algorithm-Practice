// [1548/부분 삼각 수열](https://www.acmicpc.net/problem/1548)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const arr = input[1].split(' ').map(Number);
arr.sort((a, b) => a - b);

if (N <= 2) return console.log(N);

let len = 2;
for (let i = 0; i < N - 2; i++) {
  let end = i + 2;

  while (true) {
    if (arr[i] + arr[i + 1] > arr[end]) {
      len = Math.max(len, end - i + 1);
      end += 1;

      if (end === N) break;
    } else {
      break;
    }
  }
}

console.log(len);
