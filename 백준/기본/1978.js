const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, rest] = input;
const arr = rest.split(' ').map(Number);
let answer = 0;

for (let i = 0; i < N; i++) {
  const target = arr[i];
  let isPrime = true;

  for (let j = 2; j < target; j++) {
    if (target % j === 0) {
      isPrime = false;
      break;
    }
  }

  if (target !== 1 && isPrime) answer += 1;
}

console.log(answer);
