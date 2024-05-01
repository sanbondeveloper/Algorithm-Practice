const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1).map((row) => row.split(''));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let answer = 0;

function bfs(i, j) {
  const queue = [[i, j]];
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => -1)
  );
  visited[i][j] = 0;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    answer = Math.max(visited[x][y], answer);

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (board[nx][ny] === 'W' || visited[nx][ny] !== -1) continue;

      visited[nx][ny] = visited[x][y] + 1;
      queue.push([nx, ny]);
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] !== 'L') continue;

    bfs(i, j);
  }
}

console.log(answer);
