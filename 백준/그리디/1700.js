const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const [str, arr] = input;
const [N, K] = str.split(' ').map(Number);
const order = arr.split(' ').map(Number);
const tap = Array.from({ length: N }, () => 0);
let answer = 0;

for (let i = 0; i < K; i++) {
  let flag = false;

  for (let j = 0; j < N; j++) {
    if (order[i] === tap[j]) {
      flag = true;
      break;
    }
  }

  if (flag) continue;

  for (let j = 0; j < N; j++) {
    if (tap[j] === 0) {
      tap[j] = order[i];
      flag = true;
      break;
    }
  }

  if (flag) continue;

  let w = -1;
  let index = -1;

  for (let j = 0; j < N; j++) {
    let temp = 0;

    for (let k = i + 1; k < K; k++) {
      if (order[k] === tap[j]) break;

      temp += 1;
    }

    if (temp > w) {
      w = temp;
      index = j;
    }
  }

  tap[index] = order[i];
  answer += 1;
}

console.log(answer);
