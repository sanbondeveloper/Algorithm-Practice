// [9205](https://www.acmicpc.net/problem/9205)

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

const T = +input[0];

let N, home, store, dst;

let count = 0;
let index = 1;
const answer = [];
while (true) {
  if (count === T) break;

  N = +input[index];
  home = input[index + 1].split(' ').map(Number);
  store = input
    .slice(index + 2, index + 2 + N)
    .map((row) => row.split(' ').map(Number));
  dst = input[index + 2 + N].split(' ').map(Number);

  const result = bfs(home[0], home[1]);
  answer.push(result ? 'happy' : 'sad');

  count += 1;
  index = index + 2 + N + 1;
}

console.log(answer.join('\n'));

function bfs(i, j) {
  const queue = new Queue();
  const visited = new Set();
  queue.insert([i, j]);
  visited.add(`${i},${j}`);

  while (!queue.isEmpty()) {
    const [x, y] = queue.peekFront();
    queue.remove();

    if (Math.abs(x - dst[0]) + Math.abs(y - dst[1]) <= 1000) return true;

    for (let i = 0; i < N; i++) {
      if (visited.has(`${store[i][0]},${store[i][1]}`)) continue;

      if (Math.abs(x - store[i][0]) + Math.abs(y - store[i][1]) <= 1000) {
        visited.add(`${store[i][0]},${store[i][1]}`);
        queue.insert([store[i][0], store[i][1]]);
      }
    }
  }

  return false;
}
