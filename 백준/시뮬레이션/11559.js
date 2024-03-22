class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.front == null && this.rear === null;
  }
  insert(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) this.front = newNode;
    else this.rear.next = newNode;

    this.rear = newNode;
    this.length += 1;
  }

  remove() {
    if (this.isEmpty()) return;
    this.front = this.front.next;

    if (!this.front) this.rear = null;
    this.length -= 1;
  }

  peekFront() {
    if (this.isEmpty()) return -404;
    return this.front.data;
  }

  display() {
    if (this.isEmpty()) return;
    let curr = this.front;
    process.stdout.write('(FRONT) ');

    while (curr != this.rear) {
      process.stdout.write(`${curr.data} ---> `);
      curr = curr.next;
    }
    process.stdout.write(`${this.rear.data} (REAR)\n`);
  }
}

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const board = input.map((row) => row.split(''));
let visited = Array.from({ length: 12 }, () =>
  Array.from({ length: 6 }, () => false)
);
let crash = 0;
const queue = new Queue();
let v = [];
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let flag = false;

const bfs = (i, j) => {
  queue.insert([i, j]);
  v.push([i, j]);
  visited[i][j] = true;

  while (!queue.isEmpty()) {
    const [x, y] = queue.peekFront();
    queue.remove();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= 12 || ny >= 6) continue;
      if (visited[nx][ny]) continue;

      if (board[x][y] === board[nx][ny]) {
        queue.insert([nx, ny]);
        v.push([nx, ny]);
        visited[nx][ny] = true;
      }
    }
  }
};

while (true) {
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      if (board[i][j] === '.' || visited[i][j]) continue;
      bfs(i, j);

      if (v.length >= 4) flag = true;
      else {
        for (const [x, y] of v) {
          visited[x][y] = false;
        }
      }

      v = [];
    }
  }

  if (flag) crash += 1;
  else break;

  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      if (visited[i][j]) board[i][j] = 0;
    }
  }

  for (let i = 11; i > 0; i--) {
    if (!board[i].some((v) => v === 0)) continue;

    for (let j = 0; j < 6; j++) {
      for (let k = i - 1; k >= 0 && board[i][j] === 0; k--) {
        if (board[k][j] !== 0) {
          board[i][j] = board[k][j];
          board[k][j] = 0;
          break;
        }
      }
    }
  }

  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      if (board[i][j] === 0) board[i][j] = '.';
    }
  }

  flag = false;
  visited = Array.from({ length: 12 }, () =>
    Array.from({ length: 6 }, () => false)
  );
}

console.log(crash);
