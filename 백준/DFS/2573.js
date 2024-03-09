const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const [str, ...arr] = input;
const [N, M] = str.split(' ').map(Number);
const board = arr.map((row) => row.split(' ').map(Number));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let answer = 0;
let visited;

const dfs = (x, y) => {
  visited[x][y] = true;

  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (board[nx][ny] === 0 || visited[nx][ny]) continue;

    dfs(nx, ny);
  }
};

const melt = (x, y) => {
  let count = 0;

  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (board[nx][ny] === 0) count += 1;
  }

  return count;
};

while (true) {
  let count = 0;
  const trace = [];
  visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => false)
  );

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 0 || visited[i][j]) continue;
      count += 1;
      dfs(i, j);
    }
  }

  if (count === 0) return console.log(0);
  if (count >= 2) return console.log(answer);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 0) continue;

      const value = board[i][j] - melt(i, j);
      trace.push([i, j, value > 0 ? value : 0]);
    }
  }

  trace.forEach(([x, y, value]) => {
    board[x][y] = value;
  });

  answer += 1;
}

/*
 - 시작부터 빙산이 없거나 빙산이 2개 이상으로 분리되어 있을 수 있기 때문에 가장 먼저 DFS를 수행하여 이를 확인한다.
 - 빙산을 녹이는 기능을 구현할 때는 바로 반영하지 않고 일괄적으로 반영하여 오류를 발생하지 않게 한다.
*/
