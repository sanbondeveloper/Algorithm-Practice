const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

let [N, inside, ...arr] = input;
N = +N;
const graph = {};
let answer = 0;
const visited = Array.from({ length: N + 1 }, () => false);

const dfs = (node) => {
  visited[node] = true;
  let count = 0;

  for (const next of graph[node]) {
    if (inside[next - 1] === '1') count += 1;
    else if (!visited[next] && inside[next - 1] === '0') count += dfs(next);
  }

  return count;
};

for (let i = 1; i <= N; i++) graph[i] = [];
for (let i = 0; i < arr.length; i++) {
  const [a, b] = arr[i].split(' ').map(Number);

  graph[a].push(b);
  graph[b].push(a);

  if (inside[a - 1] === '1' && inside[b - 1] === '1') answer += 2;
}

for (let i = 1; i <= N; i++) {
  if (!visited[i] && inside[i - 1] === '0') {
    const result = dfs(i);
    answer += result * (result - 1);
  }
}

console.log(answer);
