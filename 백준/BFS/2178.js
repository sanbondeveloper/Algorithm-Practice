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
const [str, ...arr] = input;
const [N, M] = str.split(' ').map(Number);
const board = arr.map((row) => row.split('').map(Number));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const bfs = (i, j) => {
  const queue = new Queue();
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => false)
  );
  queue.push([i, j, 1]);
  visited[i][j] = true;

  while (!queue.isEmpty()) {
    const [x, y, cnt] = queue.front();
    queue.pop();

    if (x === N - 1 && y === M - 1) return console.log(cnt);

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (board[nx][ny] === 0 || visited[nx][ny]) continue;

      queue.push([nx, ny, cnt + 1]);
      visited[nx][ny] = true;
    }
  }
};

bfs(0, 0);
