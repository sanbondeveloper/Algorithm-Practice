// 쉽다고 문제를 읽고 바로 구현하지말고 좀 더 생각할 필요가 있다.
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [num1, num2] = input.map(Number);
const arr = String(num2).split('').map(Number);
const answer = [];

for (let i = arr.length - 1; i >= 0; i--) {
  answer.push(num1 * arr[i]);
}
answer.push(num1 * num2);

console.log(answer.join('\n'));
