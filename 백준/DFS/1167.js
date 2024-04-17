const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const V = +input[0];
const arr = input.slice(1).map((row) => row.split(' ').map(Number));
const graph = {};

for (let i = 0; i <= V; i++) graph[i] = [];
for (const temp of arr) {
  const node = temp[0];

  for (let j = 1; j < temp.length - 1; j += 2) {
    const next = temp[j];
    const dist = temp[j + 1];

    graph[node].push({ next, dist });
    // graph[next].push([node, dist]);
  }
}

let visited = new Array(V + 1).fill(false);
let answer = 0;
let start = 0;

dfs(1, 0);

visited = new Array(V + 1).fill(false);
answer = 0;
dfs(start, 0);

console.log(answer);

function dfs(node, weight) {
  if (visited[node]) return;

  visited[node] = true;

  if (answer < weight) {
    answer = weight;
    start = node;
  }

  graph[node].forEach(({ next, dist }) => {
    dfs(next, weight + dist);
  });
}
