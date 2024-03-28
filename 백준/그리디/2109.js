const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = input.slice(1).map((row) => row.split(' ').map(Number));
const result = Array(10001).fill(0);

arr.sort((a, b) => b[0] - a[0]);

for (let i = 0; i < N; i++) {
  const [p, d] = arr[i];

  for (let j = d; j > 0; j--) {
    if (result[j] === 0) {
      result[j] = p;
      break;
    }
  }
}

const answer = result.reduce((acc, cur) => acc + cur, 0);
console.log(answer);
