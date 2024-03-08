const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

let [K, ...arr] = input;
K = +K;
let count = 0;
let index = 0;
let visited;
let graph;
const answer = [];

const dfs = (node) => {
  if (!visited[node]) visited[node] = 'RED';

  graph[node].forEach((next) => {
    if (visited[next]) return;

    if (visited[node] === 'RED') visited[next] = 'BLUE';
    else visited[next] = 'RED';

    dfs(next);
  });
};

const check = (V) => {
  for (let i = 1; i <= V; i++) {
    for (const next of graph[i]) {
      if (visited[i] === visited[next]) return false;
    }
  }

  return true;
};

while (true) {
  if (count === K) break;

  const [V, E] = arr[index].split(' ').map(Number);
  graph = {};
  visited = Array.from({ length: V + 1 }, () => false);

  for (let i = 1; i <= V; i++) graph[i] = [];
  for (let i = index + 1; i < index + 1 + E; i++) {
    const [a, b] = arr[i].split(' ').map(Number);

    graph[a].push(b);
    graph[b].push(a);
  }

  for (let i = 1; i <= V; i++) {
    if (visited[i]) continue;

    dfs(i);
  }

  if (check(V)) answer.push('YES');
  else answer.push('NO');

  index += 1 + E;
  count += 1;
}

console.log(answer.join('\n'));
