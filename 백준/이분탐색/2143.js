const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const T = +input[0];
const N = +input[1];
const A = input[2].split(' ').map(Number);
const M = +input[3];
const B = input[4].split(' ').map(Number);

const aSum = [];
const bSum = [];

for (let i = 0; i < N; i++) {
  let sum = A[i];
  aSum.push(sum);
  for (let j = i + 1; j < N; j++) {
    sum += A[j];
    aSum.push(sum);
  }
}

for (let i = 0; i < M; i++) {
  let sum = B[i];
  bSum.push(sum);
  for (let j = i + 1; j < M; j++) {
    sum += B[j];
    bSum.push(sum);
  }
}

bSum.sort((a, b) => a - b);
let answer = 0;

for (let i = 0; i < aSum.length; i++) {
  const target = T - aSum[i];

  const low = lower_bound(target);
  const high = upper_bound(target);

  answer += high - low;
}

console.log(answer);

function lower_bound(target) {
  let left = 0;
  let right = bSum.length;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (target <= bSum[mid]) right = mid;
    else left = mid + 1;
  }

  return right;
}

function upper_bound(target) {
  let left = 0;
  let right = bSum.length;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (target >= bSum[mid]) left = mid + 1;
    else right = mid;
  }

  return right;
}
