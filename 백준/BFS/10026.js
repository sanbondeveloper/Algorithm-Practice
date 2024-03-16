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
const board = arr.map((row) => row.split(''));
let visited = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => false)
);
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const answer = [0, 0];

const bfs = (i, j, color, type) => {
  const queue = new Queue();
  queue.push([i, j]);
  visited[i][j] = true;
  const check1 = (target) => target !== color;
  const check2 = (target) =>
    color === 'B' ? !(target === color) : !['R', 'G'].includes(target);
  const condi = type === 'blindness' ? check2 : check1;

  while (!queue.isEmpty()) {
    const [x, y] = queue.front();
    queue.pop();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (condi(board[nx][ny]) || visited[nx][ny]) continue;

      queue.push([nx, ny]);
      visited[nx][ny] = true;
    }
  }
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j]) continue;

    bfs(i, j, board[i][j], '');
    answer[0] += 1;
  }
}

visited = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => false)
);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j]) continue;

    bfs(i, j, board[i][j], 'blindness');
    answer[1] += 1;
  }
}

console.log(answer.join(' '));
