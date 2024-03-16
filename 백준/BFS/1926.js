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

const [n, m] = str.split(' ').map(Number);
const board = arr.map((row) => row.split(' ').map(Number));
const visited = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => false)
);
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const answer = [0, 0];

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

      if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
      if (board[nx][ny] === 0 || visited[nx][ny]) continue;

      queue.push([nx, ny]);
      visited[nx][ny] = true;
      count++;
    }
  }

  answer[1] = Math.max(answer[1], count);
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j] === 0 || visited[i][j]) continue;

    bfs(i, j);
    answer[0] += 1;
  }
}

console.log(answer.join('\n'));

/*
  복습 필요없음
*/
