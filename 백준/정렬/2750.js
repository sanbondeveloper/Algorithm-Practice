const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, ...arr] = input;

arr.sort((a, b) => a - b);

console.log(arr.join('\n'));
