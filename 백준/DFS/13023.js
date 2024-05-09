// [13023](https://www.acmicpc.net/problem/13023)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((row) => row.split(' ').map(Number));
const graph = {};
let visited;
let answer = 0;

for (let i = 0; i < N; i++) graph[i] = [];
for (let i = 0; i < M; i++) {
  const [a, b] = arr[i];

  graph[a].push(b);
  graph[b].push(a);
}

for (let i = 0; i < N; i++) {
  visited = Array(N).fill(false);

  visited[i] = true;
  dfs(i, 1);

  if (answer === 1) break;
}

console.log(answer);

function dfs(node, cnt) {
  if (cnt >= 5) {
    answer = 1;
    return;
  }

  graph[node].forEach((next) => {
    if (visited[next]) return;

    visited[next] = true;
    dfs(next, cnt + 1);
    visited[next] = false;
  });
}
