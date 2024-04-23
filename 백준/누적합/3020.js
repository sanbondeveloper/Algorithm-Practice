const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, H] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(Number);
const top = new Array(H + 1).fill(0);
const bottom = new Array(H + 1).fill(0);

for (let i = 0; i < N; i++) {
  const h = arr[i];

  if (i % 2 === 0) bottom[h] += 1;
  else top[H - h + 1] += 1;
}

for (let i = 1; i <= H; i++) {
  top[i] += top[i - 1];
  bottom[H - i] += bottom[H - i + 1];
}

let answer = N + 1;
let cnt = 0;

for (let i = 1; i <= H; i++) {
  if (top[i] + bottom[i] < answer) {
    cnt = 1;
    answer = top[i] + bottom[i];
  } else if (top[i] + bottom[i] === answer) {
    cnt += 1;
  }
}

console.log(answer + ' ' + cnt);
