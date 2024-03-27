const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const N = +input[0];
const arr = input.slice(1).map((row) => row.split(' ').map(Number));
const result = Array(1001).fill(0);

arr.sort((a, b) => b[1] - a[1]);

for (let i = 0; i < N; i++) {
  const [d, w] = arr[i];
  for (let j = d; j > 0; j--) {
    if (result[j] === 0) {
      result[j] = w;
      break;
    }
  }
}

const answer = result.reduce((acc, cur) => acc + cur, 0);

console.log(answer);
