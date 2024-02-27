const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const str = input[0];

console.log(
  str
    .trim()
    .split(' ')
    .filter((v) => v !== '').length
);
