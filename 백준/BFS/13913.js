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

const [N, K] = input[0].split(' ').map(Number);
const queue = new Queue();
const visited = Array.from({ length: 100001 }, () => -1);
const path = [];

queue.push([N, 0]);
visited[N] = N;

while (!queue.isEmpty()) {
  const [x, time] = queue.front();
  queue.pop();

  if (x === K) {
    console.log(time);

    let idx = x;
    while (idx !== N) {
      path.push(idx);
      idx = visited[idx];
    }
    path.push(N);
    console.log(path.reverse().join(' '));
    return;
  }

  if (x * 2 <= 100000 && visited[x * 2] === -1) {
    queue.push([x * 2, time + 1]);
    visited[x * 2] = x;
  }

  if (x + 1 <= 100000 && visited[x + 1] === -1) {
    queue.push([x + 1, time + 1]);
    visited[x + 1] = x;
  }

  if (x - 1 >= 0 && visited[x - 1] === -1) {
    queue.push([x - 1, time + 1]);
    visited[x - 1] = x;
  }
}
