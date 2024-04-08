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
const board = input.slice(1).map((row) => row.split(''));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

bfs();

function bfs() {
  const queue = new Queue();
  const visited = new Set();
  queue.insert([0, 0, 0, 0]);
  visited.add('0, 0, 0');

  while (!queue.isEmpty()) {
    const [x, y, wall, cnt] = queue.peekFront();
    queue.remove();

    if (x === N - 1 && y === M - 1) {
      console.log(cnt + 1);
      return;
    }

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (board[nx][ny] === '0') {
        if (visited.has(`${nx}, ${ny}, ${wall}`)) continue;

        queue.insert([nx, ny, wall, cnt + 1]);
        visited.add(`${nx}, ${ny}, ${wall}`);
      } else {
        if (wall === 1 || visited.has(`${nx}, ${ny}, 1`)) continue;

        queue.insert([nx, ny, 1, cnt + 1]);
        visited.add(`${nx}, ${ny}, 1`);
      }
    }
  }

  console.log(-1);
}
