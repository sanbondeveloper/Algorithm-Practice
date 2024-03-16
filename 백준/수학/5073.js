const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const arr = input.map((row) => row.split(' ').map(Number));
const answer = [];

for (let i = 0; i < arr.length - 1; i++) {
  arr.sort((a, b) => a - b);
  const [a, b, c] = arr[i];

  if (a + b <= c) {
    answer.push('Invalid');
    continue;
  }

  if (a !== b && b !== c && c !== a) {
    answer.push('Scalene');
    continue;
  }

  if (a === b && b === c) {
    answer.push('Equilateral');
  } else {
    answer.push('Isosceles');
  }
}

console.log(answer.join('\n'));
