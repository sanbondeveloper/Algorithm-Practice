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
const height = Math.max(...[].concat(...board));
let visited;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let answer = Number.MIN_SAFE_INTEGER;

const bfs = (i, j, h) => {
  const queue = new Queue();
  queue.push([i, j]);
  visited[i][j] = true;

  while (!queue.isEmpty()) {
    const [x, y] = queue.front();
    queue.pop();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (board[nx][ny] <= h || visited[nx][ny]) continue;

      queue.push([nx, ny]);
      visited[nx][ny] = true;
    }
  }
};

for (let h = height; h >= 0; h--) {
  visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false)
  );
  let count = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] <= h || visited[i][j]) continue;

      bfs(i, j, h);
      count += 1;
    }
  }

  answer = Math.max(answer, count);
}

console.log(answer);
