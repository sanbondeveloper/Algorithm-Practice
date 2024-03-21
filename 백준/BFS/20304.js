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
const N = +input[0];
const M = +input[1];
const arr = input[2].split(' ').map(Number);
const queue = new Queue();
const visited = Array(N + 1).fill(-1);
let answer = 0;

for (let i = 0; i < M; i++) {
  queue.insert(arr[i]);
  visited[arr[i]] = 0;
}

const bfs = () => {
  while (!queue.isEmpty()) {
    const now = queue.peekFront();
    queue.remove();

    for (let i = 0; i < 20; i++) {
      const next = now ^ (1 << i);

      if (N < next || visited[next] !== -1) continue;
      visited[next] = visited[now] + 1;
      queue.insert(next);
      answer = Math.max(answer, visited[next]);
    }
  }
};

bfs();
console.log(answer);
