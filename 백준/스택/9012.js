const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, ...arr] = input;
const answer = [];

const check = (PS) => {
  const stack = [];

  for (const ch of PS) {
    stack.push(ch);

    while (
      stack.length >= 2 &&
      stack[stack.length - 2] === '(' &&
      stack[stack.length - 1] === ')'
    ) {
      stack.pop();
      stack.pop();
    }
  }

  return stack.length === 0;
};

for (let i = 0; i < arr.length; i++) {
  if (check(arr[i])) answer.push('YES');
  else answer.push('NO');
}

console.log(answer.join('\n'));
