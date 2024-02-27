const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];

function factorial(n) {
  if (n <= 1) return 1;

  return n * factorial(n - 1);
}

console.log(factorial(N));
