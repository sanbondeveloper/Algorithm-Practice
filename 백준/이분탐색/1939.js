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
const arr = input.slice(1, M + 1).map((row) => row.split(' ').map(Number));
const [src, dst] = input[M + 1].split(' ').map(Number);
const graph = {};
let max = 0;

for (let i = 1; i <= N; i++) graph[i] = [];
for (const [a, b, c] of arr) {
  graph[a].push([b, c]);
  graph[b].push([a, c]);

  max = Math.max(max, c);
}

let left = 0;
let right = max;

while (left <= right) {
  let mid = Math.floor((left + right) / 2);

  if (bfs(mid)) left = mid + 1;
  else right = mid - 1;
}

console.log(right);

function bfs(mid) {
  const queue = new Queue();
  const visited = new Array(N + 1).fill(false);
  queue.insert(src);
  visited[src] = true;

  while (!queue.isEmpty()) {
    const node = queue.peekFront();
    queue.remove();

    if (node === dst) return true;

    graph[node].forEach(([next, cost]) => {
      if (visited[next] || cost < mid) return;

      visited[next] = true;
      queue.insert(next);
    });
  }

  return false;
}
