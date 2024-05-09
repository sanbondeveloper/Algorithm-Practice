// [9019](https://www.acmicpc.net/problem/9019)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = +input[0];
const arr = input.slice(1).map((row) => row.split(' ').map(Number));
const answer = [];

for (let i = 0; i < T; i++) {
  const [A, B] = arr[i];

  const result = bfs(A, B);

  answer.push(result);
}

console.log(answer.join('\n'));

function bfs(A, B) {
  const queue = [];
  const visited = [];
  queue.push([A, '']);
  visited[A] = 1;

  while (queue.length > 0) {
    const [n, ops] = queue.shift();

    if (n === B) return ops;

    const D = (2 * n) % 10000;
    if (visited[D] !== 1) {
      queue.push([D, ops + 'D']);
      visited[D] = 1;
    }

    const S = n - 1 < 0 ? 9999 : n - 1;
    if (visited[S] !== 1) {
      queue.push([S, ops + 'S']);
      visited[S] = 1;
    }

    const L = (n % 1000) * 10 + Math.floor(n / 1000);
    if (visited[L] !== 1) {
      queue.push([L, ops + 'L']);
      visited[L] = 1;
    }

    const R = Math.floor(n / 10) + (n % 10) * 1000;
    if (visited[R] !== 1) {
      queue.push([R, ops + 'R']);
      visited[R] = 1;
    }
  }
}
