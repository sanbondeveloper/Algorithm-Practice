const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

let [N, Q] = input[0].split(' ').map(Number);
N = Math.pow(2, N);
const board = input.slice(1, N + 1).map((row) => row.split(' ').map(Number));
const Ls = input[N + 1].split(' ').map(Number);
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const answer = [0, 0];

function turning(a, b, len) {
  let square = len / 2;

  for (let number = 0; number < square; number++) {
    let startX = a + number;
    let startY = b + number;
    let endX = a + len - number - 1;
    let endY = b + len - number - 1;

    let x_idx = endX;
    let y_idx = startY;
    let idx = 0;
    const temp = [];

    for (let i = startX; i < endX; i++) temp.push(board[i][startY]);
    for (let i = startX; i < endX; i++) {
      board[i][startY] = board[endX][y_idx++];
    }
    for (let i = startY; i < endY; i++) board[endX][i] = board[x_idx--][endY];
    for (let i = endX; i > startX; i--) board[i][endY] = board[startX][y_idx--];
    for (let i = endY; i > startY; i--) board[startX][i] = temp[idx++];
  }
}

function bfs(i, j) {
  const queue = [];
  queue.push([i, j]);
  visited[i][j] = true;
  let cnt = 1;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (board[nx][ny] === 0 || visited[nx][ny]) continue;

      visited[nx][ny] = true;
      queue.push([nx, ny]);
      cnt += 1;
    }
  }

  answer[1] = Math.max(cnt, answer[1]);
}

for (let i = 0; i < Q; i++) {
  const len = Math.pow(2, Ls[i]);

  for (let i = 0; i < N; i += len) {
    for (let j = 0; j < N; j += len) {
      turning(i, j, len);
    }
  }

  let nodes = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === 0) continue;

      let cnt = 0;
      for (let k = 0; k < 4; k++) {
        const nx = i + dir[k][0];
        const ny = j + dir[k][1];

        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
        if (board[nx][ny] === 0) continue;

        cnt += 1;
      }

      if (cnt < 3) nodes.push([i, j]);
    }
  }

  for (const [x, y] of nodes) {
    board[x][y] -= 1;
  }
}

const visited = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => false)
);
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 0) continue;
    if (visited[i][j]) continue;

    bfs(i, j);
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    answer[0] += board[i][j];
  }
}

console.log(answer.join('\n'));
