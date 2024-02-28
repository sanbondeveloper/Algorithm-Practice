const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [n, rest] = input;
const N = Number(n);
const arr = rest.split(' ').map(Number);
const visited = Array(N).fill(false);
const result = [];
let answer = Number.MIN_SAFE_INTEGER;
function permutation(cnt) {
  if (cnt === N) {
    let sum = 0;

    for (let i = 0; i < N - 1; i++) {
      sum += Math.abs(result[i] - result[i + 1]);
    }

    answer = Math.max(answer, sum);

    return;
  }

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    result.push(arr[i]);
    permutation(cnt + 1);
    visited[i] = false;
    result.pop();
  }
}

permutation(0);

console.log(answer);
