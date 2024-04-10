const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const T = +input[0];
let count = 0;
let index = 1;
let N, arr, visited, graph, cnt, done;
const answer = [];

while (true) {
  if (count === T) break;

  N = +input[index];
  arr = input[index + 1].split(' ').map(Number);
  visited = new Array(N + 1).fill(false);
  done = new Array(N + 1).fill(false);
  graph = {};
  cnt = 0;

  for (let i = 1; i <= N; i++) graph[i] = arr[i - 1];

  for (let i = 1; i <= N; i++) {
    if (visited[i]) continue;
    dfs(i);
  }

  answer.push(N - cnt);

  index += 2;
  count += 1;
}

console.log(answer.join('\n'));

function dfs(node) {
  visited[node] = true;
  const next = graph[node];

  if (!visited[next]) {
    dfs(next);
  } else if (!done[next]) {
    for (let i = next; i !== node; i = graph[i]) {
      cnt += 1;
    }
    cnt += 1;
  }

  done[node] = true;
}
