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
const answer = [];

for (let i = 1; i <= N; i++) queue.push(i);

while (!queue.isEmpty()) {
  for (let i = 0; i < K - 1; i++) {
    const value = queue.front();
    queue.pop();
    queue.push(value);
  }

  answer.push(queue.front());
  queue.pop();
}

console.log('<' + answer.join(', ') + '>');
