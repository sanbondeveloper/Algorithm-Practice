const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = input.slice(1).map((row) => row.split(' ').map(Number));
const tree = {};

for (let i = 0; i <= N + 1; i++) tree[i] = [];

for (const [x, y, w] of arr) {
  tree[x].push({ child: y, dist: w });
  tree[y].push({ child: x, dist: w });
}

let visited = new Array(N + 1).fill(false);
let start = 0;
let answer = 0;

dfs(1, 0);
answer = 0;
visited = new Array(N + 1).fill(false);
dfs(start, 0);

console.log(answer);

function dfs(node, weight) {
  if (visited[node]) return;

  visited[node] = true;

  if (answer < weight) {
    start = node;
    answer = weight;
  }

  tree[node].forEach(({ child, dist }) => {
    dfs(child, weight + dist);
  });
}
