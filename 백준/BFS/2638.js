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

const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1).map((row) => row.split(' ').map(Number));
let answer = 0;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

while (true) {
  let cnt = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 1) cnt += 1;
    }
  }

  if (cnt === 0) break;
  answer += 1;

  bfs();
}

console.log(answer);

function bfs() {
  const queue = new Queue();
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => false)
  );
  const nodes = {};
  queue.insert([0, 0]);
  visited[0][0] = true;

  while (!queue.isEmpty()) {
    const [x, y] = queue.peekFront();
    queue.remove();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (visited[nx][ny]) continue;

      if (board[nx][ny] === 0) {
        visited[nx][ny] = true;
        queue.insert([nx, ny]);
      } else {
        const str = `${nx},${ny}`;

        if (nodes[str]) nodes[str] += 1;
        else nodes[str] = 1;
      }
    }
  }

  for (const str in nodes) {
    if (nodes[str] < 2) continue;

    const [x, y] = str.split(',').map(Number);

    board[x][y] = 0;
  }
}
