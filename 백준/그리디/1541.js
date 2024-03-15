const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const arr = input[0].split('-');
let answer = 0;
let x = arr[0]
  .split('+')
  .map(Number)
  .reduce((acc, cur) => acc + cur, 0);

if (input[0] === '-') answer -= x;
else answer += x;

for (let i = 1; i < arr.length; i++) {
  x = arr[i]
    .split('+')
    .map(Number)
    .reduce((acc, cur) => acc + cur, 0);

  answer -= x;
}

console.log(answer);
