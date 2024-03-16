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
const [F, S, G, U, D] = input[0].split(' ').map(Number);
const dir = [U, D * -1];
const visited = Array.from({ length: F + 1 }, () => false);
const count = Array.from({ length: F + 1 }, () => 0);
const queue = new Queue();

const bfs = (start) => {
  queue.push(start);
  visited[start] = true;

  while (!queue.isEmpty()) {
    const x = queue.front();
    queue.pop();

    for (let k = 0; k < 2; k++) {
      const nx = x + dir[k];

      if (0 < nx && nx <= F) {
        if (!visited[nx]) {
          queue.push(nx);
          visited[nx] = true;
          count[nx] = count[x] + 1;
        }
      }
    }
  }
};

bfs(S);

console.log(visited[G] ? count[G] : 'use the stairs');
