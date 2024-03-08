const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
let [N, ...arr] = input;
N = +N;
const graph = {};
const visited = Array.from({ length: N + 1 }, () => false);
const answer = Array.from({ length: N - 1 }, () => 1);

for (let i = 1; i <= N; i++) graph[i] = [];
for (let i = 0; i < arr.length; i++) {
  const [a, b] = arr[i].split(' ').map(Number);

  graph[a].push(b);
  graph[b].push(a);
}

function dfs(node) {
  visited[node] = true;

  graph[node].forEach((next) => {
    if (visited[next]) return;

    answer[next - 2] = node;
    dfs(next);
  });
}

dfs(1);
console.log(answer.join('\n'));
