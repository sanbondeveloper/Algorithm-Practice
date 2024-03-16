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
let [str, ...arr] = input;
const [M, N, K] = str.split(' ').map(Number);
const board = Array.from({ length: M }, () =>
  Array.from({ length: N }, () => 0)
);
arr = arr.map((row) => row.split(' ').map(Number));
let answer = 0;
const area = [];
const visited = Array.from({ length: M }, () =>
  Array.from({ length: N }, () => false)
);
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

for (let i = 0; i < K; i++) {
  const [sy, sx, ey, ex] = arr[i];

  for (let i = sx; i < ex; i++) {
    for (let j = sy; j < ey; j++) {
      board[i][j] = 1;
    }
  }
}

const bfs = (i, j) => {
  const queue = new Queue();
  let count = 1;
  queue.push([i, j]);
  visited[i][j] = true;

  while (!queue.isEmpty()) {
    const [x, y] = queue.front();
    queue.pop();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
      if (board[nx][ny] === 1 || visited[nx][ny]) continue;

      queue.push([nx, ny]);
      visited[nx][ny] = true;
      count += 1;
    }
  }

  area.push(count);
};

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 1 || visited[i][j]) continue;

    bfs(i, j);
    answer += 1;
  }
}

area.sort((a, b) => a - b);
console.log(answer);
console.log(area.join(' '));

/*
  복습 필요없음
*/
