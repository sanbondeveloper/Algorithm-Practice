const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, ...arr] = input;

const answer = [];
const stack = [];
for (let i = 0; i < arr.length; i++) {
  const [op, num] = arr[i].split(' ');

  if (op === 'push') {
    stack.push(+num);
  } else if (op === 'pop') {
    const value = stack.pop();
    answer.push(value || -1);
  } else if (op === 'size') {
    answer.push(stack.length);
  } else if (op === 'empty') {
    answer.push(!stack.length ? 1 : 0);
  } else {
    answer.push(!stack.length ? -1 : stack[stack.length - 1]);
  }
}

console.log(answer.join('\n'));
