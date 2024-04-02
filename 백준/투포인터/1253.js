const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = input[1].split(' ').map(Number);
let answer = 0;

arr.sort((a, b) => a - b);

for (let i = 0; i < N; i++) {
  const target = arr[i];
  let start = 0;
  let end = N - 1;

  while (start < end) {
    const sum = arr[start] + arr[end];

    if (sum < target) {
      start += 1;
    } else if (sum > target) {
      end -= 1;
    } else {
      if (i === start) start += 1;
      else if (i === end) end -= 1;
      else {
        answer += 1;
        break;
      }
    }
  }
}

console.log(answer);
