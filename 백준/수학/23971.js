const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [H, W, N, M] = input[0].split(' ').map(Number);

const a = Math.ceil(H / (N + 1));
const b = Math.ceil(W / (M + 1));

console.log(a * b);
