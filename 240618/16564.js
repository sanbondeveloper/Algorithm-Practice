const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [str, ...rest] = input;

const [N, K] = str.split(' ').map(Number);
const arr = rest.map(Number).sort((a, b) => a - b);

function check(level) {
  let total = K;

  for (const che of arr) {
    if (che < level) {
      total -= level - che;
    }
  }

  return total >= 0;
}

let left = 0;
let right = arr[arr.length - 1] + K;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  if (check(mid)) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(right);
