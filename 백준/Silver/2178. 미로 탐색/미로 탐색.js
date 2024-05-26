// [2178/미로 탐색](https://www.acmicpc.net/problem/2178)

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

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((row) => row.split('').map(Number));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function bfs() {
  const queue = new Queue();
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => false)
  );
  queue.insert([0, 0, 1]);
  visited[0][0] = true;

  while (!queue.isEmpty()) {
    const [x, y, cnt] = queue.peekFront();
    queue.remove();

    if (x === N - 1 && y === M - 1) return console.log(cnt);

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (visited[nx][ny] || arr[nx][ny] === 0) continue;

      queue.insert([nx, ny, cnt + 1]);
      visited[nx][ny] = true;
    }
  }
}

bfs();
