class Queue {
  constructor() {
    this.data = [];
    this.head = 0;
    this.tail = 0;
  }

  push(item) {
    this.data[this.tail++] = item;
  }

  pop() {
    this.head++;
  }

  front() {
    return this.data[this.head];
  }

  rear() {
    return this.data[this.tail - 1];
  }

  isEmpty() {
    return this.head === this.tail;
  }

  size() {
    return Math.abs(this.head - this.tail);
  }
}

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
let [N, ...arr] = input;
N = +N;
const board = arr.map((row) => row.split(' ').map(Number));
let cnt = 2;
let visited;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let answer = Number.MAX_SAFE_INTEGER;

const bfs = (i, j, cnt) => {
  const queue = new Queue();
  visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false)
  );
  queue.push([i, j]);
  visited[i][j] = true;
  board[i][j] = cnt;

  while (!queue.isEmpty()) {
    const [x, y] = queue.front();
    queue.pop();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (board[nx][ny] !== 1 || visited[nx][ny]) continue;

      queue.push([nx, ny]);
      visited[nx][ny] = true;
      board[nx][ny] = cnt;
    }
  }
};

const bfs_bridge = (i, j) => {
  const queue = new Queue();
  visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false)
  );
  queue.push([i, j, 0]);
  visited[i][j] = true;

  while (!queue.isEmpty()) {
    const [x, y, cnt] = queue.front();
    queue.pop();

    if (cnt >= answer) return;

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (visited[nx][ny]) continue;

      if (board[nx][ny] === 0) {
        queue.push([nx, ny, cnt + 1]);
        visited[nx][ny] = true;
      } else if (board[i][j] !== board[nx][ny]) {
        answer = Math.min(answer, cnt);
      }
    }
  }
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] !== 1) continue;

    bfs(i, j, cnt);
    cnt += 1;
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 0) continue;

    bfs_bridge(i, j);
  }
}

console.log(answer);
