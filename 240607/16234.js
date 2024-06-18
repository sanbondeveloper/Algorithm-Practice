// [16234/인구 이동](https://www.acmicpc.net/problem/16234)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, L, R] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((row) => row.split(' ').map(Number));
let visited;
let flag;
let answer = 0;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function bfs(i, j) {
  const queue = [[i, j]];
  const nodes = [[i, j]];
  visited[i][j] = true;
  let total = arr[i][j];

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      const diff = Math.abs(arr[x][y] - arr[nx][ny]);
      if (visited[nx][ny] || diff < L || diff > R) continue;

      queue.push([nx, ny]);
      nodes.push([nx, ny]);
      visited[nx][ny] = true;
      total += arr[nx][ny];
    }
  }

  if (nodes.length === 1) return;

  flag = true;

  for (const [x, y] of nodes) {
    arr[x][y] = Math.floor(total / nodes.length);
  }
}

while (true) {
  visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false)
  );
  flag = false;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[i][j]) continue;

      bfs(i, j);
    }
  }

  if (!flag) break;

  answer += 1;
}

console.log(answer);
