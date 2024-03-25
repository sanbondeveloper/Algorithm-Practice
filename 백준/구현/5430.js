const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const T = +input[0];
let count = 0;
let index = 1;
const answer = [];

while (true) {
  if (count === T) break;

  const p = input[index].split('');
  const arr = input[index + 2]
    .slice(1, -1)
    .split(',')
    .filter((v) => v !== '');

  let flag = true;
  let isReverse = false;

  for (const op of p) {
    if (op === 'R') {
      isReverse = !isReverse;
    } else {
      if (arr.length === 0) {
        answer.push('error');
        flag = false;
        break;
      } else {
        if (isReverse) arr.pop();
        else arr.shift();
      }
    }
  }

  if (isReverse) arr.reverse();
  if (flag) {
    answer.push('[' + arr.join(',') + ']');
  }

  index += 3;
  count += 1;
}

console.log(answer.join('\n'));
