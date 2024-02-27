const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [A, B] = input[0].split(' ').map(Number);
const answer = [A + B, A - B, A * B, Math.floor(A / B), A % B];

console.log(answer.join('\n'));
