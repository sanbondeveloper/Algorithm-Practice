const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);
const edges = input.slice(1, N).map((row) => row.split(' ').map(Number));
const arr = input.slice(N).map((row) => row.split(' ').map(Number));
const graph = {};
const visited = Array(N + 1).fill(false);
const answer = [];

for (let i = 1; i <= N; i++) graph[i] = [];
for (const [a, b, w] of edges) {
  graph[a].push([b, w]);
  graph[b].push([a, w]);
}

function dfs(node, end, dist) {
  if (node === end) {
    answer.push(dist);
  }

  visited[node] = true;

  graph[node].forEach(([next, w]) => {
    if (visited[next]) return;

    dfs(next, end, dist + w);
  });

  visited[node] = false;
}

for (const [a, b] of arr) {
  dfs(a, b, 0);
}

console.log(answer.join('\n'));
