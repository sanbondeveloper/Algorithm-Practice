const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const N = +input[0];

let answer = 1;
let max = 1;
let add = 6;

while (true) {
  if (N <= max) break;

  max += add;
  add += 6;
  answer += 1;
}

console.log(answer);
