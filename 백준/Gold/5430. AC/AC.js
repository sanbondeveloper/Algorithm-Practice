// [5430](https://www.acmicpc.net/problem/5430)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = +input[0];

let index = 1;
let count = 0;
const answer = [];

while (true) {
  if (count === T) break;

  const p = input[index];
  const n = input[index + 1];
  const x = input[index + 2]
    .replace('[', '')
    .replace(']', '')
    .split(',')
    .filter((v) => v !== '')
    .map(Number);
  let isReverse = false;
  let isError = false;

  for (const op of p) {
    if (op === 'R') {
      isReverse = !isReverse;
    } else if (op === 'D') {
      if (x.length === 0) {
        isError = true;
        break;
      }

      if (isReverse) x.pop();
      else x.shift();
    }
  }

  if (isError) {
    answer.push('error');
  } else {
    if (isReverse) x.reverse();
    answer.push(JSON.stringify(x));
  }

  index += 3;
  count += 1;
}

console.log(answer.join('\n'));
