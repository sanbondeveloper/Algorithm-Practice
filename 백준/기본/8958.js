const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [T, ...arr] = input;
const answer = [];

for (let i = 0; i < T; i++) {
  const row = arr[i];
  let count = 0;
  let total = 0;

  for (let j = 0; j < row.length; j++) {
    if (row[j] === 'O') {
      count += 1;
      total += count;
    } else {
      count = 0;
    }
  }

  answer.push(total);
}

console.log(answer.join('\n'));
