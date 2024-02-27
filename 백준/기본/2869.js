const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [A, B, V] = input[0].split(' ').map(Number);

console.log(Math.floor((V - B - 1) / (A - B)) + 1);
