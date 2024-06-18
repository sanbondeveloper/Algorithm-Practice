// [13904/과제](https://www.acmicpc.net/problem/13904)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const arr = input.slice(1).map((row) => row.split(' ').map(Number));
const answer = Array(1001).fill(0);

arr.sort((a, b) => b[1] - a[1]);

for (let i = 0; i < N; i++) {
  const [d, w] = arr[i];

  if (answer[d] === 0) answer[d] = w;
  else {
    for (let j = d; j >= 1; j--) {
      if (answer[j] < w) {
        answer[j] = w;
        break;
      }
    }
  }
}

console.log(answer.reduce((acc, cur) => acc + cur, 0));
