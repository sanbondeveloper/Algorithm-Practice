const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const year = +input[0];

if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
  return console.log(1);

return console.log(0);
