const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const arr = input.map(Number);
const positive = [];
const negative = [];
let answer = 0;

for (let i = 1; i < arr.length; i++) {
  const num = arr[i];
  if (num <= 0) negative.push(num);
  else if (num === 1) answer += 1;
  else positive.push(num);
}

positive.sort((a, b) => b - a);
negative.sort((a, b) => a - b);

if (positive.length % 2 !== 0) {
  positive.push(1);
}
if (negative.length % 2 !== 0) {
  negative.push(1);
}
for (let i = 0; i < positive.length; i += 2) {
  answer += positive[i] * positive[i + 1];
}
for (let i = 0; i < negative.length; i += 2) {
  answer += negative[i] * negative[i + 1];
}

console.log(answer);
