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

const N = +input[0]; // 배열 길이
const K = +input[1]; // 사과 개수
const L = +input[2 + K]; // 방향 전환 횟수
const board = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => 0)
);
const snake = new Queue();
const timestamp = new Queue();

for (let i = 2; i < 2 + K; i++) {
  const [x, y] = input[i].split(' ').map(Number);
  board[x - 1][y - 1] = 2;
}

for (let i = 3 + K; i < 3 + K + L; i++) {
  const [t, d] = input[i].split(' ');
  timestamp.push([t, d]);
}

snake.push([0, 0]);
board[0][0] = 1;
let curDir = 1;
let cnt = 1;
let x = 0;
let y = 1;
const dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

while (true) {
  if (x < 0 || y < 0 || x >= N || y >= N) break;
  if (board[x][y] === 1) break;

  if (!timestamp.isEmpty()) {
    const [t, d] = timestamp.front();

    if (cnt === +t) {
      if (d === 'L') curDir = (curDir + 1) % 4;
      else curDir = (curDir + 3) % 4;

      timestamp.pop();
    }
  }

  if (board[x][y] === 0) {
    snake.push([x, y]);
    const [tx, ty] = snake.front();
    snake.pop();
    board[tx][ty] = 0;
  } else if (board[x][y] === 2) {
    snake.push([x, y]);
  }

  board[x][y] = 1;

  x = x + dirs[curDir][0];
  y = y + dirs[curDir][1];

  cnt += 1;
}

console.log(cnt);
