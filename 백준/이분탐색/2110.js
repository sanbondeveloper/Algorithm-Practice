const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, C] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(Number);

arr.sort((a, b) => a - b);

let left = 1;
let right = arr[N - 1] - arr[0];
let answer = 0;

while (left <= right) {
  let mid = Math.floor((left + right) / 2);

  if (check(mid)) {
    answer = Math.max(answer, mid);
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(answer);

function check(dist) {
  let prev = arr[0];
  let cnt = 1;

  for (let i = 1; i < N; i++) {
    if (arr[i] - prev >= dist) {
      cnt += 1;
      prev = arr[i];
    }
  }

  return cnt >= C;
}
