const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, X] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
const answer = [];
// arr.sort((a, b) => a - b);

for (let i = 0; i < arr.length; i++) {
  if (arr[i] >= X) continue;

  answer.push(arr[i]);
}

console.log(answer.join(' '));
